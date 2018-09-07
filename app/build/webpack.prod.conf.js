'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const ROUTES = require('../src/router/config');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
let staticRoutes, dynamicRoutes = [];

let getStaticRoutes = (routes = [], root_path = '') => {
  let rs = [];

  routes.forEach(elem => {
    let path = root_path + elem.path;
    if(elem.children) {
      let rss = getStaticRoutes(elem.children, path.endsWith('/') ? path : (path + '/'));
      rs = rs.concat(rss);
    } else {
      if(elem.isStatic) rs.push(path);
      else if (path.endsWith('/index.html')) dynamicRoutes.push(path);
    }
  });

  return rs;
};

staticRoutes = getStaticRoutes(ROUTES);

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true, autoprefixer: { remove: false } }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      // inject: 'head',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunks: ['manifest', 'vendor', 'styles', 'app'],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'manual'
    }),
    ...dynamicRoutes.map(elem => {
      return new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../dist' + elem),
        template: 'index.html',
        // inject: 'head',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        chunks: ['manifest', 'vendor', 'styles', 'app'],
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'manual'
      });
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, '../dist'),
      // Required - Routes to render.
      routes: staticRoutes,
      postProcess (renderedRoute) {
        if (renderedRoute.route.endsWith('.html')) {
          renderedRoute.outputPath = path.join(__dirname, '../dist', renderedRoute.route)
        }
        renderedRoute.html = renderedRoute.html.replace(/(\<head\>.*?)(\<script.*?\<\/script\>){1,}(.*\<\/head\>)/g, '$1$3');
        if (staticRoutes.indexOf(renderedRoute.route) === -1) {
          renderedRoute.html = renderedRoute.html.replace(/(\<section.*\<\/section\>)(.*)/gsi, '<div id=app></div>$2');
        } else {
          renderedRoute.html = renderedRoute.html.replace(/(\<section)(.*)/g, '$1 style="display:none !important" $2');
          renderedRoute.html = renderedRoute.html.replace(/(\<section.*\<\/section\>)(.*)/gsi, '<div id=app>$1</div>$2');
        }
        return renderedRoute
      },
      renderer: new Renderer({
        // Optional - The name of the property to add to the window object with the contents of `inject`.
        injectProperty: 'PROJECT',
        // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
        inject: {
          BUILDING: true
        },

        // Optional - defaults to 0, no limit.
        // Routes are rendered asynchronously.
        // Use this to limit the number of routes rendered in parallel.
        maxConcurrentRoutes: 4,

        // Optional - Wait to render until the specified event is dispatched on the document.
        // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
        // renderAfterDocumentEvent: 'custom-render-trigger',

        // Optional - Wait to render until the specified element is detected using `document.querySelector`
        // renderAfterElementExists: 'my-app-element',

        // Optional - Wait to render until a certain amount of time has passed.
        // NOT RECOMMENDED
        renderAfterTime: 5000, // Wait 5 seconds.

        // Other puppeteer options.
        // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
        headless: false // Display the browser window when rendering. Useful for debugging.
      })
    }),
    new webpack.DefinePlugin({
      'PROJECT.BUILDING': false
    }),
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
