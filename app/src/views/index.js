/**
 * 用于:引入单个页面组件 - 实现懒加载
 */
export const OpsLayout = () => import('@/components/ops-layout');
export const StaticLayout = () => import('@/components/static-layout');
export const homeIndex = () => import('@/pages/home/index');
export const homeProducts = () => import('@/pages/home/products');
// export const proCar = () => import('@/pages/home/cars');
export const homeCarsTruck = () => import('@/pages/home/cars/truck');
export const homeCarsEnergy = () => import('@/pages/home/cars/energy');
export const homeService = () => import('@/pages/home/service/service');
export const homeServiceDetail = () => import('@/pages/home/serviceDetail/serviceDetail');
export const homeSolution = () => import('@/pages/home/solution/solution');
export const homeDynamic = () => import('@/pages/home/dynamic/dynamic');
export const homeDynamicIndustry = resolve => require(['components/dynamicIndustry/industry'], resolve);
export const homeDynamicProducts = resolve => require(['components/dynamicProducts/products'], resolve);

// 控制台
export const ConLayout = () => import('@/components/con-layout');
export const conIndex = () => import('@/pages/console/index');
export const conData = () => import('@/pages/console/data/data');
export const conDetail = () => import('@/pages/console/data/detail');
export const conApplyList = () => import('@/pages/console/data/apply-list');
export const conPersonalInfo = () => import('@/pages/console/personal/info');
export const conPersonalRealAuth = () => import('@/pages/console/personal/real-auth');
export const conPersonalBalance = () => import('@/pages/console/personal/balance');
export const conPay = () => import('@/pages/console/personal/pay');
export const conNews = () => import('@/pages/console/personal/news');

export const passportLayout = () => import('@/components/passport-layout');
export const passportLogin = () => import('@/pages/passport/login');
export const passportRegist = () => import('@/pages/passport/regist');
export const passportRetrieve = () => import('@/pages/passport/retrieve');
export const passportProtocol = () => import('@/pages/passport/protocol');
export const page404 = () => import('@/pages/p404');
// 实例：生产环境请去掉
export const Example = () => import('@/components/example/Example');
