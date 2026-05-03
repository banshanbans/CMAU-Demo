import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssessmentView from '../views/AssessmentView.vue'
import ResultsView    from '../views/ResultsView.vue'
import DashboardView  from '../views/DashboardView.vue'
import DashboardOverviewView from '../views/DashboardOverviewView.vue'
import DashboardProgressView from '../views/DashboardProgressView.vue'
import DashboardResourcesView from '../views/DashboardResourcesView.vue'
import DashboardMessagesView from '../views/DashboardMessagesView.vue'
import ServicesView   from '../views/ServicesView.vue'
import StartupPackView from '../views/StartupPackView.vue'
import ContentView from '../views/ContentView.vue'
import ContentArticleView from '../views/ContentArticleView.vue'
import CommunityView from '../views/CommunityView.vue'
import SchoolSelectionView from '../views/SchoolSelectionView.vue'
import CasesView from '../views/CasesView.vue'
import ConsultView from '../views/ConsultView.vue'

const routes = [
  { path: '/',           redirect: '/home' },
  { path: '/home',       component: HomeView },
  { path: '/assessment', component: AssessmentView },
  { path: '/results',    component: ResultsView },
  {
    path: '/dashboard',
    component: DashboardView,
    children: [
      { path: '', component: DashboardOverviewView },
      { path: 'progress', component: DashboardProgressView },
      { path: 'resources', component: DashboardResourcesView },
      { path: 'messages', component: DashboardMessagesView },
    ],
  },
  { path: '/services',   component: ServicesView },
  { path: '/services/startup-pack', component: StartupPackView },
  { path: '/content', component: ContentView },
  { path: '/content/:slug', component: ContentArticleView },
  { path: '/community', component: CommunityView },
  { path: '/school-selection', component: SchoolSelectionView },
  { path: '/cases', component: CasesView },
  { path: '/consult', component: ConsultView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
