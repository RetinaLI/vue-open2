<template>
  <div class="con-user-info-title"
       @mouseover="showInfo"
       @mouseout="hideInfo"
  >
    <div class="con-user-title" :class="{'is-index': isIndex}">
      <i class="con-user-icon" :style="{backgroundImage: `url(${getCurrentUser.headImageUrl || userIcon})`}">
        <b class="con-user-badge" v-if="getNewsLength > 0">{{getNewsLength}}</b>
      </i>
      <span class="con-user-name text-overflow-single">{{getCurrentUser.name}}</span>
      <i class="user-caret" :class="{'el-icon-caret-bottom': !showed, 'el-icon-caret-top': showed}"></i>
    </div>
    <transition name="flipInY">
      <ul class="con-user-info-list" v-show="showed">
        <li>
          <div class="con-user-list-title">
            <i class="con-user-icon" :style="{backgroundImage: `url(${getCurrentUser.headImageUrl || userIcon})`}"></i>
            <div class="con-user-list-info">
              <span class="con-user-name text-overflow-single"
                    :title="getCurrentUser.name">{{getCurrentUser.name}}</span>
              <span class="con-user-email text-overflow-single" :title="getCurrentUser.email">{{getCurrentUser.email || '去绑定'}}</span>
              <el-button type="primary" size="mini" v-show="false">修改密码</el-button>
            </div>
          </div>
        </li>
        <li class="con-user-item"
            v-for="(item, i) in title"
            :key="i"
            @click="hideInfo"
        >
          <router-link :to="item.path" tag="div">
            {{item.name}}
            <i v-if="item.path==='/console/news/index.html' && getNewsLength > 0" class="con-news-read">未读{{getNewsLength}}条</i>
          </router-link>
        </li>
        <li class="con-user-item" @click="logout">退出</li>
      </ul>
    </transition>
  </div>
</template>

<script>
import iconPng from '@/assets/images/icon-user.png';
import { mapGetters } from 'vuex';
import ToastTip from '@/lib/message.js';
import { PassportService } from '@/services/passport';
let passportService = new PassportService();

export default {
  name: 'LoginUserTitle',
  data () {
    return {
      userIcon: iconPng,
      showed: false,
      timers: null,
      title: [
        {
          name: '账户信息',
          path: '/console/info/index.html'
        },
        {
          name: '我的消息',
          path: '/console/news/index.html'
        },
        {
          name: '我的余额',
          path: '/console/balance/index.html'
        }

      ]
      // getNewsLength: 0
    };
  },
  props: {
    isIndex: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentUser',
      'getNewsLength'
    ])
  },
  methods: {
    showInfo () {
      if (this.timers) {
        clearTimeout(this.timers);
      }
      this.showed = true;
    },
    hideInfo () {
      let _self = this;
      _self.timers = setTimeout(() => {
        _self.showed = false;
      }, 150);
    },
    async logout () {
      let res = await passportService.logout();
      if (res.code === 1) {
        ToastTip.success(res.message, 2000);
        this.hideInfo();
        setTimeout(() => {
          window.location.href = '/index.html';
        }, 1000);
      } else {
        window.location.href = '/index.html';
      }
    },
    getList () {
      this.$store.dispatch('getNewsList', {
        pageNum: 1,
        pageSize: 10
      });
    }
  },
  mounted: function () {
    this.getList();
  }
};
</script>

<style scoped lang="scss">
  $userIcon: './images/icon-user.png';
  $color666: #666;
  .con-user-info-title {
    position: relative;
    height: 100%;
    .con-user-title {
      display: flex;
      align-items: center;
      height: 100%;
      margin: 0 20px;
      cursor: pointer;
      &.is-index {
        .con-user-name {
          color: #fff;
        }
        .user-caret {
          color: #fff;
        }
      }
      .con-user-icon {
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;
        .con-user-badge {
          position: absolute;
          top: 3px;
          right: 13px;
          transform: translateY(-50%) translateX(100%);
          background-color: #f56c6c;
          border-radius: 10px;
          color: #fff;
          font-size: 12px;
          height: 18px;
          line-height: 18px;
          padding: 0 6px;
          text-align: center;
          white-space: nowrap;
          border: 1px solid #fff;
          font-weight: normal;
          font-style: normal;
        }
      }
      .con-user-name {
        max-width: 90px;
        font-size: 14px;
        color: $color666;
        margin-right: 14px;
      }
      .user-caret {
        color: #909399;
        font-size: 12px;
      }
    }
    .con-user-info-list {
      position: absolute;
      right: 4px;
      top: 65px;
      width: 300px;
      overflow: hidden;
      border-radius: 0 0 3px 3px;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 1px 3px #eee;
      color: #333;
      & > li {
        padding: 0 15px;
      }
      .con-user-item {
        text-align: left;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        &:hover {
          background-color: #b3d8ff;
          color: #fff;
        }
        .con-news-read {
          color: #F56C6C;
          font-size: 12px !important;
          margin-left: 10px;
        }
      }
      .con-user-list-title {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        .con-user-icon {
          width: 80px;
          height: 80px;
          border-radius: 5px;
          background-size: 100% 100%;
        }
        .con-user-list-info {
          padding-left: 10px;
          flex: 1;
          & > span {
            display: block;
            font-size: 14px;
            line-height: 24px;
            max-width: 180px;
            word-wrap: break-word;
          }
          .con-user-name {
            font-size: 18px;
            text-align: left;
          }
          .con-user-email {
            text-align: left;
            color: #999;
            line-height: 18px;
            padding: 3px 0;
          }
          .el-button > /deep/ span {
            font-size: 12px !important;
          }
        }
      }
      & > li {
        font-size: 14px;
      }
    }
  }

  .flipInY-enter-active {
    @extend .animated;
    @extend .flipInY;
  }

  .flipInY-leave-active {
    display: none;
  }
  /*
  .flipInY-leave-active {
    @extend .animated;
    @extend .flipOutY;
  }
  */
  @-webkit-keyframes flipInY {
    from {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    60% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      opacity: 1;
    }

    80% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }

    to {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }
  }

  @keyframes flipInY {
    from {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    60% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      opacity: 1;
    }

    80% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }

    to {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }
  }

  .flipInY {
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    -webkit-animation-name: flipInY;
    animation-name: flipInY;
  }

  @-webkit-keyframes flipOutY {
    from {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }

    30% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      opacity: 1;
    }

    to {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      opacity: 0;
    }
  }

  @keyframes flipOutY {
    from {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }

    30% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      opacity: 1;
    }

    to {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      opacity: 0;
    }
  }

  .flipOutY {
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    -webkit-animation-name: flipOutY;
    animation-name: flipOutY;
  }

  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .animated.infinite {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  .animated.delay-1s {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }

  .animated.delay-2s {
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
  }

  .animated.delay-3s {
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
  }

  .animated.delay-4s {
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
  }

  .animated.delay-5s {
    -webkit-animation-delay: 5s;
    animation-delay: 5s;
  }

  .animated.fast {
    -webkit-animation-duration: 800ms;
    animation-duration: 800ms;
  }

  .animated.faster {
    -webkit-animation-duration: 500ms;
    animation-duration: 500ms;
  }

  .animated.slow {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }

  .animated.slower {
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
  }

  @media (prefers-reduced-motion) {
    .animated {
      -webkit-animation: unset !important;
      animation: unset !important;
      -webkit-transition: none !important;
      transition: none !important;
    }
  }
</style>
