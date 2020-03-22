import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ChartView from '@/views/chart-view.vue';
import StateChartView from '@/views/state-chart-view.vue';
import TestingDataView from '@/views/testing-data-view.vue';
import { navNextGuard } from './nav-next-guard'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'COVID-19 spread map in the United States',
    }
  },
  {
    path: '/chart',
    name: 'trend-chart',
    component: ChartView,
    meta: {
      title: 'COVID-19 daily chart in the United States'
    }
  },
  {
    path: '/state-chart/:region?',
    name: 'state-trend-chart',
    component: StateChartView
  },
  {
    path: '/testing',
    name: 'state-testing-data',
    component: TestingDataView
  }
];

const router = new VueRouter({
  routes
});

router.afterEach(navNextGuard);

export default router;

