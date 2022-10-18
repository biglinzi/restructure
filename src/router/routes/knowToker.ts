import Header from '@/components/nav/header.vue'

export default [
  {
    path: '/knowtoker',
    name: 'knowtoker',
    redirect: 'knowtoker/enterprise',
    components: {
      header: Header,
      default: () => import('@/views/home.vue'),
    },
    meta: {
      title: '知因拓客',
      context: ['navView'],
    },
    children: [
      {
        path: 'overview',
        name: 'toker-overview',
        meta: {
          title: '工作台',
        },
        component: () => import('@/views/overview/index.vue'),
      },
      {
        path: 'enterprise',
        name: 'toker-enterprise',
        meta: {
          title: '企业拓客',
        },
        component: () =>
          import('@/views/enterprise-toker/index.vue'),
      },
      {
        path: 'enterprise/search',
        name: 'toker-searchDetail',
        meta: {
          title: '企业拓客',
        },
        component: () =>
          import('@/views/know-toker/enterprise-toker/details.vue'),
      },
      {
        path: 'expand/detail',
        name: 'toker-detail',
        meta: {
          title: '企业拓客详情',
        },
        component: () =>
          import('@/views/marketing/expand/expandDefault/index.vue'),
        // component: () => import("@/views/marketing/expand/expandDetail.vue")
      },
      {
        path: 'expand/customer',
        name: 'toker-customerDetail',
        meta: {
          title: '企业拓客客群详情',
        },
        component: () =>
          import('@/views/know-toker/enterprise-toker/CustomerDetail.vue'),
      },
      {
        path: 'business',
        name: 'toker-business',
        meta: {
          title: '商机拓客',
        },
        component: () => import('@/views/know-toker/business-toker/index.vue'),
      },
      {
        path: 'advanced',
        name: 'advanced-search',
        meta: {
          title: '高级筛选',
        },
        component: () => import('@/views/know-toker/advanced-search/index.vue'),
      },
      {
        path: 'industry',
        name: 'toker-industry',
        meta: {
          title: '产业获客',
        },
        component: () => import('@/views/know-toker/industry-toker/index.vue'),
      },
      {
        path: 'industry/detail/:key',
        name: 'industry-detail',
        meta: {
          title: '产业详情',
        },
        component: () => import('@/views/know-toker/industry-detail/index.vue'),
      },
      {
        path: 'map',
        name: 'marketing-map',
        meta: {
          title: '地图获客',
        },
        component: () => import('@/views/marketing/map/index.vue'),
      },
      {
        path: 'park',
        name: 'marketing-park',
        meta: {
          title: '园区获客',
        },
        component: () => import('@/views/marketing/park/index.vue'),
      },
      {
        path: 'park/parkList',
        name: 'marketing-park-list',
        meta: {
          title: '园区列表',
        },
        component: () => import('@/views/marketing/park/parkList.vue'),
      },
      {
        path: 'park/searchList',
        name: 'marketing-search-list',
        meta: {
          titile: '园区搜索列表',
        },
        component: () => import('@/views/marketing/park/parkSearchList.vue'),
      },
      {
        path: 'park/companyList',
        name: 'marketing-company-list',
        meta: {
          titile: '园区企业列表',
        },
        component: () => import('@/views/marketing/park/parkCompanyList.vue'),
      },
      {
        path: 'customer',
        name: 'customers-new',
        meta: {
          title: '关联拓客',
        },
        component: () => import('@/views/know-toker/customers-new/index.vue'),
      },
      {
        path: 'marketing/admin',
        name: 'marketing-admin',
        meta: {
          title: '营销方案',
        },
        component: () => import('@/views/know-toker/marketing-admin/index.vue'),
      },
      {
        path: 'plan/:planid',
        name: 'plan-detail',
        meta: {
          title: '方案详情',
        },
        component: () => import('@/views/know-toker/plan-detail/index.vue'),
      },
      {
        path: 'business/follow',
        name: 'business-follow',
        meta: {
          title: '商机跟进',
        },
        component: () => import('@/views/know-toker/business-follow/index.vue'),
      },
      {
        path: 'follow',
        name: 'follow-enterprise',
        component: () =>
          import('@/views/know-toker/follow-enterprise/index.vue'),
        meta: {
          title: '关注企业',
        },
      },
      {
        path: 'recycle',
        name: 'recycle-bin',
        component: () => import('@/views/know-toker/RecycleBin.vue'),
        meta: {
          title: '回收站',
        },
      },
      {
        path: 'newsContent',
        name: 'news-content',
        components: {
          header: Header,
          default: () => import('@/views/marketing/track/NewsContent.vue'),
        },
        meta: {
          title: '新闻正文',
        },
      },
      {
        path: '/knowtoker/grouportrait',
        name: 'group-portrait',
        components: {
          header: Header,
          default: () => import('@/views/know-toker/group-portrait/index.vue'),
        },
        meta: {
          title: '集团画像',
        },
      },
      // {
      //   path: "filter",
      //   name: "test-filter",
      //   component: () => import("@/components/compact-filter/TestFilter.vue"),
      //   meta: {
      //     title: "测试筛选栏"
      //   }
      // },
    ],
  },
];
