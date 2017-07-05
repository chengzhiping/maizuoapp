// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Navbar, TabItem ,Cell,TabContainer, TabContainerItem,InfiniteScroll ,Loadmore  } from 'mint-ui';
import axios from "axios";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
Vue.use(IScrollView, IScroll)
Vue.component(Loadmore.name, Loadmore);

Vue.use(InfiniteScroll);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Cell.name, Cell);
Vue.config.productionTip = false
Vue.prototype.$http=axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
