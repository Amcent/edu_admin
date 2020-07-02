import Home from '../views/Home.vue';
import Course from '../views/Course/Course.vue';
import CourseCreate from '../views/Course/CourseCreate.vue';
import CourseEdit from '../views/Course/CourseEdit.vue';
import Career from '../views/Career/Career.vue';
import CareerEdit from '../views/Career/CareerEdit.vue';
import CareerCreate from '../views/Career/CareerCreate.vue';
import Company from '../views/Company/Company.vue';
import CompanyCreate from '../views/Company/CompanyCreate.vue';
import CompanyEdit from '../views/Company/CompanyEdit.vue';
import Project from '../views/Project/Project.vue';
import ProjectCreate from '../views/Project/ProjectCreate.vue';
import ProjectEdit from '../views/Project/ProjectEdit.vue';
import ProjectContent from '../views/Project/ProjectContent.vue';
import Ability from '../views/Ability/Ability.vue';
import AbilityCreate from '../views/Ability/AbilityCreate.vue';
import AbilityEdit from '../views/Ability/AbilityEdit.vue';
import Question from '../views/Question/Question.vue';
import QuestionCreate from '../views/Question/QuestionCreate.vue';
import QuestionEdit from '../views/Question/QuestionEdit.vue';
import Manager from '../views/Manager/Manager.vue';
import ManagerCreate from '../views/Manager/ManagerCreate.vue';
import ManagerEdit from '../views/Manager/ManagerEdit.vue';
import Role from '../views/Role/Role.vue';
import RoleCreate from '../views/Role/RoleCreate.vue';
import RoleEdit from '../views/Role/RoleEdit.vue';
import Advertise from '../views/Advertise/Advertise.vue';
import AdvertiseCreate from '../views/Advertise/AdvertiseCreate.vue';
import AdvertiseEdit from '../views/Advertise/AdvertiseEdit.vue';
import Material from '../views/Material/Material.vue';
import MaterialCreate from '../views/Material/MaterialCreate.vue';
import MaterialEdit from '../views/Material/MaterialEdit.vue';
import Login from '../views/Login.vue';
import BasicLayout from '../components/Layout/BasicLayout.vue';
import Forbidden from '../views/Forbidden.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Root',
    component: BasicLayout,
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Home,
        meta: {
          title: '概况',
          breadcrumb: { title: '概况' },
        },
      },
      {
        path: '/course',
        name: 'CourseRoot',
        permission: 'course',
        component: { render: h => h('router-view') },
        redirect: { name: 'Course' },
        meta: {
          title: '课程',
          breadcrumb: { title: '课程', replace: true },
        },
        children: [
          {
            path: '/course',
            name: 'Course',
            component: Course,
            meta: { title: '课程管理', permission: 'course' },
          },
          {
            path: 'create',
            name: 'CourseCreate',
            component: CourseCreate,
            meta: { title: '创建课程', breadcrumb: { title: '创建' }, permission: 'course' },
          },
          {
            path: ':id/edit',
            name: 'CourseEdit',
            component: CourseEdit,
            meta: { title: '编辑课程', breadcrumb: { title: '编辑' }, permission: 'course' },
          },
        ],
      },
      {
        path: '/career',
        name: 'CareerRoot',
        component: { render: h => h('router-view') },
        permission: 'career',
        redirect: { name: 'Career' },
        meta: {
          title: '职业路径',
          breadcrumb: { title: '职业路径', replace: true },
        },
        children: [
          {
            path: '/career',
            name: 'Career',
            component: Career,
            meta: { title: '职业路径管理', permission: 'career' },
          },
          {
            path: ':id/edit',
            name: 'CareerEdit',
            component: CareerEdit,
            meta: { title: '编辑职业路径', breadcrumb: { title: '编辑' }, permission: 'career' },
          },
          {
            path: 'create',
            name: 'CareerCreate',
            component: CareerCreate,
            meta: { title: '创建职业路径', breadcrumb: { title: '创建' }, permission: 'career' },
          },
        ],
      },
      {
        path: '/company',
        name: 'CompanyRoot',
        permission: 'company',
        component: { render: h => h('router-view') },
        redirect: { name: 'Company' },
        meta: {
          title: '企业管理',
          breadcrumb: { title: '企业管理', replace: true },
        },
        children: [
          {
            path: '/company',
            name: 'Company',
            component: Company,
            meta: { title: '企业', permission: 'company' },
          },
          {
            path: ':id/edit',
            name: 'CompanyEdit',
            component: CompanyEdit,
            meta: { title: '编辑企业', breadcrumb: { title: '编辑' }, permission: 'company' },
          },
          {
            path: 'create',
            name: 'CompanyCreate',
            component: CompanyCreate,
            meta: { title: '创建企业', breadcrumb: { title: '创建' }, permission: 'company' },
          },
        ],
      },
      {
        path: '/project',
        name: 'ProjectRoot',
        component: { render: h => h('router-view') },
        permission: 'project',
        redirect: { name: 'Project' },
        meta: {
          title: '项目管理',
          breadcrumb: { title: '项目管理', replace: true },
        },
        children: [
          {
            path: '/project',
            name: 'Project',
            component: Project,
            meta: { title: '项目', permission: 'project' },
          },
          {
            path: ':id/edit',
            name: 'ProjectEdit',
            component: ProjectEdit,
            meta: { title: '编辑项目', breadcrumb: { title: '编辑' }, permission: 'project' },
          },
          {
            path: ':id/content',
            name: 'ProjectContent',
            component: ProjectContent,
            meta: { title: '项目内容', breadcrumb: { title: '内容' }, permission: 'project' },
          },
          {
            path: 'create',
            name: 'ProjectCreate',
            component: ProjectCreate,
            meta: { title: '创建项目', breadcrumb: { title: '创建' }, permission: 'project' },
          },
        ],
      },
      {
        path: '/ability',
        name: 'AbilityRoot',
        component: { render: h => h('router-view') },
        permission: 'ability',
        redirect: { name: 'Ability' },
        meta: {
          title: '技能管理',
          breadcrumb: { title: '技能管理', replace: true },
        },
        children: [
          {
            path: '/ability',
            name: 'Ability',
            component: Ability,
            meta: { title: '技能', permission: 'ability' },
          },
          {
            path: ':id/edit',
            name: 'AbilityEdit',
            component: AbilityEdit,
            meta: { title: '编辑技能', breadcrumb: { title: '编辑' }, permission: 'ability' },
          },
          {
            path: 'create',
            name: 'AbilityCreate',
            component: AbilityCreate,
            meta: { title: '创建技能', breadcrumb: { title: '创建' }, permission: 'ability' },
          },
        ],
      },
      {
        path: '/question',
        name: 'QuestionRoot',
        component: { render: h => h('router-view') },
        permission: 'question',
        redirect: { name: 'Question' },
        meta: {
          title: '题库管理',
          breadcrumb: { title: '题库管理', replace: true },
        },
        children: [
          {
            path: '/question',
            name: 'Question',
            component: Question,
            meta: { title: '技能', permission: 'question' },
          },
          {
            path: ':id/edit',
            name: 'QuestionEdit',
            component: QuestionEdit,
            meta: { title: '编辑题库', breadcrumb: { title: '编辑' }, permission: 'question' },
          },
          {
            path: 'create',
            name: 'QuestionCreate',
            component: QuestionCreate,
            meta: { title: '创建题库', breadcrumb: { title: '创建' }, permission: 'question' },
          },
        ],
      },
      {
        path: '/role',
        name: 'RoleRoot',
        component: { render: h => h('router-view') },
        permission: 'role',
        redirect: { name: 'Role' },
        meta: {
          title: '角色管理',
          breadcrumb: { title: '角色管理', replace: true },
        },
        children: [
          {
            path: '/role',
            name: 'Role',
            component: Role,
            meta: { title: '技能', permission: 'role' },
          },
          {
            path: ':id/edit',
            name: 'RoleEdit',
            component: RoleEdit,
            meta: { title: '编辑角色', breadcrumb: { title: '编辑' }, permission: 'role' },
          },
          {
            path: 'create',
            name: 'RoleCreate',
            component: RoleCreate,
            meta: { title: '创建角色', breadcrumb: { title: '创建' }, permission: 'role' },
          },
        ],
      },
      {
        path: '/manager',
        name: 'ManagerRoot',
        component: { render: h => h('router-view') },
        permission: 'manager',
        redirect: { name: 'Manager' },
        meta: {
          title: '管理员管理',
          breadcrumb: { title: '管理员管理', replace: true },
        },
        children: [
          {
            path: '/manager',
            name: 'Manager',
            component: Manager,
            meta: { title: '管理员', permission: 'manager' },
          },
          {
            path: ':id/edit',
            name: 'ManagerEdit',
            component: ManagerEdit,
            meta: { title: '编辑管理员', breadcrumb: { title: '编辑' }, permission: 'manager' },
          },
          {
            path: 'create',
            name: 'ManagerCreate',
            component: ManagerCreate,
            meta: { title: '创建管理员', breadcrumb: { title: '创建' }, permission: 'manager' },
          },
        ],
      },
      {
        path: '/advertise',
        name: 'AdvertiseRoot',
        component: { render: h => h('router-view') },
        permission: 'advertise',
        redirect: { name: 'Advertise' },
        meta: {
          title: '广告管理',
          breadcrumb: { title: '广告管理', replace: true },
        },
        children: [
          {
            path: '/advertise',
            name: 'Advertise',
            component: Advertise,
            meta: { title: '广告', permission: 'advertise' },
          },
          {
            path: ':id/edit',
            name: 'AdvertiseEdit',
            component: AdvertiseEdit,
            meta: { title: '编辑广告', breadcrumb: { title: '编辑' }, permission: 'advertise' },
          },
          {
            path: 'create',
            name: 'AdvertiseCreate',
            component: AdvertiseCreate,
            meta: { title: '创建广告', breadcrumb: { title: '创建' }, permission: 'advertise' },
          },
        ],
      },
      {
        path: '/material',
        name: 'MaterialRoot',
        component: { render: h => h('router-view') },
        redirect: { name: 'Material' },
        permission: 'material',
        meta: {
          title: '物料管理',
          breadcrumb: { title: '物料管理', replace: true },
        },
        children: [
          {
            path: '/material',
            name: 'Material',
            component: Material,
            meta: { title: '物料', permission: 'material' },
          },
          {
            path: ':id/edit',
            name: 'MaterialEdit',
            component: MaterialEdit,
            meta: { title: '创建物料', breadcrumb: { title: '创建' }, permission: 'material' },
          },
          {
            path: 'create',
            name: 'MaterialCreate',
            component: MaterialCreate,
            meta: { title: '创建物料', breadcrumb: { title: '编辑' }, permission: 'material' },
          },
        ],
      },
      {
        path: '/403',
        name: 'Forbidden',
        component: Forbidden,
      },
    ],
  },
];

export default routes;
