import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'
import Stats from 'src/components/Dashboard/Views/Dashboard/Stats.vue'

// Pages
import User from 'src/components/Dashboard/Views/Pages/UserProfile.vue'
import TimeLine from 'src/components/Dashboard/Views/Pages/TimeLinePage.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import Lock from 'src/components/Dashboard/Views/Pages/Lock.vue'

// Components pages
import Buttons from 'src/components/Dashboard/Views/Components/Buttons.vue'
import GridSystem from 'src/components/Dashboard/Views/Components/GridSystem.vue'
import Panels from 'src/components/Dashboard/Views/Components/Panels.vue'
import SweetAlert from 'src/components/Dashboard/Views/Components/SweetAlert.vue'
import Notifications from 'src/components/Dashboard/Views/Components/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Components/Icons.vue'
import Typography from 'src/components/Dashboard/Views/Components/Typography.vue'

// Forms pages
// 精细化调价
import JingXiManage from 'src/components/Dashboard/Views/Forms/JingXiManage.vue'
// TF数据
import TFDate from 'src/components/Dashboard/Views/Forms/TFDate.vue'
// 点击TF数据跳转的页面
import ValidationForms from 'src/components/Dashboard/Views/Forms/ValidationForms.vue'
// 航班数据
import HangbanDate from 'src/components/Dashboard/Views/Forms/HangBanShuJu.vue'
// 数据更新规则
import FlightRefreshRule from 'src/components/Dashboard/Views/Forms/FlightRefreshRule.vue'
// OTA接口验证
import OTAJieKou from 'src/components/Dashboard/Views/Forms/OTAJieKou.vue'
// form表单跳转路由
import tankuangHangbandate from 'src/components/Dashboard/Views/Forms/tankuang/hangbandata_new.vue'


// TableList pages
import RegularTables from 'src/components/Dashboard/Views/Tables/RegularTables.vue'
import ExtendedTables from 'src/components/Dashboard/Views/Tables/ExtendedTables.vue'
import PaginatedTables from 'src/components/Dashboard/Views/Tables/PaginatedTables.vue'
import AddData from 'src/components/Dashboard/Views/Tables/AddData.vue'
// Maps pages
import GoogleMaps from 'src/components/Dashboard/Views/Maps/GoogleMaps.vue'
import FullScreenMap from 'src/components/Dashboard/Views/Maps/FullScreenMap.vue'
import VectorMaps from 'src/components/Dashboard/Views/Maps/VectorMapsPage.vue'

// Calendar
import Calendar from 'src/components/Dashboard/Views/Calendar/CalendarRoute.vue'
// Charts
import Charts from 'src/components/Dashboard/Views/Charts.vue'

let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
      meta:{
        requireAuth:true
      },
      component: Buttons
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      meta:{
        requireAuth:true
      },
      component: GridSystem
    },
    {
      path: 'panels',
      name: 'Panels',
      meta:{
        requireAuth:true
      },
      component: Panels
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      meta:{
        requireAuth:true
      },
      component: SweetAlert
    },
    {
      path: 'notifications',
      name: 'Notifications',
      meta:{
        requireAuth:true
      },
      component: Notifications
    },
    {
      path: 'icons',
      name: 'Icons',
      meta:{
        requireAuth:true
      },
      component: Icons
    },
    {
      path: 'typography',
      name: 'Typography',
      meta:{
        requireAuth:true
      },
      component: Typography
    }

  ]
}
let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  children: [
    {
      path: 'jingximanage',
      name: 'JingXiManage',
      meta:{
        requireAuth:true
      },
      component: JingXiManage
    },
    {
      path: 'tfdate',
      name: 'TFDate',
      meta:{
        requireAuth:true
      },
      component: TFDate
    },
    {
      path: 'validation',
      name: 'Validation Forms',
      meta:{
        requireAuth:true
      },
      component: ValidationForms
    },
    {
      path: 'hangbandate',
      name: 'hangbandate',
      meta:{
        requireAuth:true
      },
      component: HangbanDate
    },
    {
      path:'flightrefreshrule',
      name:'Flightrefreshrule',
      meta:{
        requireAuth:true
      },
      component:FlightRefreshRule
    },
    {
      path:'otajiekou',
      name:'OTAjiekou',
      meta:{
        requireAuth:true
      },
      component:OTAJieKou
    },
    {
      path:'tankuang/hangbandata_new',
      name:'tankuang/hangbandata_new',
      meta:{
        requireAuth:true
      },
      component:tankuangHangbandate
    }
  ]
}

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
      meta:{
        requireAuth:true
      },
      component: RegularTables
    },
    {
      path: 'extended',
      name: 'Extended Tables',
      meta:{
        requireAuth:true
      },
      component: ExtendedTables
    },
    {
      path: 'paginated',
      name: 'Paginated Tables',
      meta:{
        requireAuth:true
      },
      component: PaginatedTables
    },
    {
      path:'adddata',
      name:'AddData',
      meta:{
        requireAuth:true
      },
      component:AddData
    }]
}

let mapsMenu = {
  path: '/maps',
  component: DashboardLayout,
  redirect: '/maps/google',
  children: [
    {
      path: 'google',
      name: 'Google Maps',
      meta:{
        requireAuth:true
      },
      component: GoogleMaps
    },
    {
      path: 'full-screen',
      name: 'Full Screen Map',
      meta:{
        requireAuth:true
      },
      component: FullScreenMap
    },
    {
      path: 'vector-map',
      name: 'Vector Map',
      meta:{
        requireAuth:true
      },
      component: VectorMaps
    }
  ]
}

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  redirect: '/pages/user',
  children: [
    {
      path: 'user',
      name: 'User Page',
      meta:{
        requireAuth:true
      },
      component: User
    },
    {
      path: 'timeline',
      name: 'Timeline Page',
      meta:{
        requireAuth:true
      },
      component: TimeLine
    }
  ]
}

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login,
  // redirect:'/login',
}

let registerPage = {
  path: '/register',
  name: 'Register',
  meta:{
    requireAuth:true
  },
  component: Register,
}

let lockPage = {
  path: '/lock',
  name: 'Lock',
  meta:{
    requireAuth:true
  },
  component: Lock
}

export const routes = [
  {
    path:'/',
    // name:'login',
    components:DashboardLayout,
    redirect:'/login'
  },
  loginPage,
  {
    path: '/admin/overview',
    component: DashboardLayout,
    children: [
      {
        path: 'calendar',
        name: 'Calendar',
        meta:{
          requireAuth:true
        },
        component: Calendar
      },
      {
        path: 'charts',
        name: 'Charts',
        meta:{
          requireAuth:true
        },
        component: Charts
      }
    ]
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  registerPage,
  lockPage,
  {
    path: '/admin',
    component: DashboardLayout,
    // redirect: '/admin/overview',
    redirect:'/',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        meta:{
          requireAuth:true
        },
        component: Overview
      },
      {
        path: 'stats',
        name: 'Stats',
        meta:{
          requireAuth:true
        },
        component: Stats
      }
    ]
  },
  {path: '*', component: NotFound}
]

// export const basicRouterMap = [{
//   path: '/login',
//   name: 'login',
//   component: (resolve) => require(['src/components/Dashboard/Views/Pages/Login.vue'], resolve)
// },
// {
//   path: '/',
//   name: 'nopath',
//   component: (resolve) => require(['@/views/user/Login'], resolve)
// }
// ];