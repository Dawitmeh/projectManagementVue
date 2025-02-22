import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import RegisterView from "@/views/Auth/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue"
import ProjectIndex from "@/views/Projects/ProjectIndex.vue"
import ProjectView from "@/views/Projects/ProjectView.vue"
import TaskIndex from "@/views/Tasks/TaskIndex.vue"
import TaskView from "@/views/Tasks/TaskView.vue"
import MasterSchedule from "@/views/MasterSchedule/ScheduleIndex.vue"
import MasterScheduleView from "@/views/MasterSchedule/ScheduleView.vue"
import SiteIndex from "@/views/Sites/SiteIndex.vue"
import SiteView from "@/views/Sites/SiteView.vue"
import StatusesIndex from "@/views/Statuses/StatusIndex.vue"
import StatusesView from "@/views/Statuses/StatusView.vue"
import Pirority from "@/views/Pirorities/PirorityIndex.vue"
import PirorityView from "@/views/Pirorities/PirorityView.vue"
import UserIndex from "@/views/Users/UserIndex.vue"
import UserView from "@/views/Users/UserView.vue"
import ClientIndex from "@/views/Clients/ClientIndex.vue"
import ClientView from "@/views/Clients/ClientView.vue"
import ContractIndex from "@/views/Contracts/ContractIndex.vue"
import ContractView from "@/views/Contracts/ContractView.vue"
import ContractType from "@/views/Contracts/ContractType.vue"
import SettingIndex from "@/views/Settings/SettingIndex.vue"
import RoleIndex from "@/views/RolesPermission/RoleIndex.vue"
import PermissionIndex from "@/views/RolesPermission/PermissionIndex.vue"
import ProjectType from "@/views/ProjectType/ProjectType.vue"
import ActivityIndex from "@/views/Activities/ActivityIndex.vue"
import ActivityView from "@/views/Activities/ActivityView.vue"
import UnitIndex from "@/views/Units/UnitIndex.vue"
import ResourceIndex from "@/views/Resources/ResourceIndex.vue"
import EquipmentIndex from "@/views/Resources/EquipmentIndex.vue"
import EquipmentType from "@/views/Resources/EquipmentType.vue"
import HumanResource from "@/views/Resources/HumanResource.vue"
import MaterialIndex from "@/views/Resources/MaterialIndex.vue"
import WarehouseIndex from "@/views/Warehouse/WarehouseIndex.vue"
import WarehouseView from "@/views/Warehouse/WarehouseView.vue"
import WorkProgress from "@/views/WorkProgress/WorkProgress.vue"
import WorkProgressView from "@/views/WorkProgress/WorkProgressView.vue"
import TimeSheet from "@/views/TimeSheet/TimeSheet.vue"
import TimeSheetView from "@/views/TimeSheet/TimeSheetView.vue"

import { useUserStore } from '@/stores/users';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const store = useUserStore()

      // Rehydrate the store if sessionStorage exists
      if (!store.user.token && sessionStorage.getItem('TOKEN')) {
        store.user.token = sessionStorage.getItem('TOKEN');
        store.user.data = JSON.parse(sessionStorage.getItem('USER_DATA') || '{}');
      }
      if (to.meta.requiresAuth && !store.user.token) {
        next({name: 'Login'})
      } else if (store.user.token && (to.meta.isGuest)) {
        next({name: 'Dashboard'})
      } else {
        next()
      }
    },
    children: [
      {path: '/dashboard', name: 'Dashboard', component: DashboardView},
      // Projects
      {path: '/projects', name: 'Projects', component: ProjectIndex},
      {path: '/project/view/:id', name: 'ProjectView', component: ProjectView},
      // Tasks
      {path: '/tasks', name: 'Tasks', component: TaskIndex},
      {path: '/task/view/:id', name: 'TaskView', component: TaskView},
      // Master Schedule
      {path: '/master-schedules', name: 'MasterSchedule', component: MasterSchedule},
      {path: '/master-schedule/view/:id', name: 'ScheduleView', component: MasterScheduleView},
      // Sites
      {path: '/sites', name: 'Sites', component: SiteIndex},
      {path: '/site/view', name: 'SiteView', component: SiteView},
      // Statuses
      {path: '/statuses', name: 'Statuses', component: StatusesIndex},
      {path: '/status/view/:id', name: 'StatusView', component: StatusesView},
      // Pirority
      {path: '/pirorities', name: 'Pirority', component: Pirority},
      {path: '/pirority/view/:id', name: 'PiroriyView', component: PirorityView},
      // Users
      {path: '/users', name: 'Users', component: UserIndex},
      {path: '/user/view/:id', name: 'UserView', component: UserView},
      // Clients
      {path: '/clients', name: 'Clients', component: ClientIndex},
      {path: '/client/view/:id', name: 'ClientView', component: ClientView},
      // Contracts
      {path: '/contracts', name: 'Contracts', component: ContractIndex},
      {path: '/contract/view/:id', name: 'ContractView', component: ContractView},
      {path: '/contractType', name: 'ContractType', component: ContractType},
      // Settings
      {path: '/settings', name: 'Settings', component: SettingIndex},
      // Roles & Permissions
      {path: '/role', name: 'Roles', component: RoleIndex},
      {path: '/permission', name: 'Permissions', component: PermissionIndex},
      // project-type
      {path: '/projectTypes', name: 'ProjectType', component: ProjectType},
      // Activities
      {path: '/activities', name: 'Activity', component: ActivityIndex},
      {path: '/activity/view/:id', name: 'ActivityView', component: ActivityView},
      // Units
      {path: '/units', name: 'Units', component: UnitIndex},

      // Resources
      {path: '/resources', name: 'Resource', component: ResourceIndex},
      {path: '/equipments', name: 'Equipments', component: EquipmentIndex},
      {path: '/equipmentType', name: 'EquipmentType', component: EquipmentType},
      {path: '/humanresource', name: 'HumanResource', component: HumanResource},
      {path: '/materials', name: 'Materials', component: MaterialIndex},

      // Warehouse
      {path: '/warehouses', name: 'Warehouse', component: WarehouseIndex},
      {path: '/warehouse/view/:id', name: 'WarehouseView', component: WarehouseView},

      // Work Progress
      {path: '/workprogress', name: 'WorkProgress', component: WorkProgress},
      {path: '/workprogres/view/:id', name: 'WorkProgressView', component: WorkProgressView},

      // Time sheet
      {path: '/timesheet', name: 'TimeSheet', component: TimeSheet},
      {path: '/timesheet/view/:id', name: 'TimeSheetView', component: TimeSheetView}
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/login',
    meta: { isGuest: true },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: LoginView
      }, 
      {
        path: '/register',
        name: 'Register',
        component: RegisterView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
