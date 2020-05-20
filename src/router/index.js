import Vue from 'vue'
import VueRouter from 'vue-router'
import DiscoverMusic from '../views/DiscoverMusic.vue'
import RecommendedMusic from '../views/RecommendedMusic.vue'
import LatestMusic from '../views/LatestMusic.vue'
import LatestMV from '../views/LatestMV.vue'
import Search from '../views/Search.vue'
import Playlist from '../views/Playlist.vue'
import MV from '../views/MV.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DiscoverMusic',
    component: DiscoverMusic
  },
  {
    path: '/recommended',
    name: 'RecommendedMusic',
    component: RecommendedMusic
  },
  {
    path: '/latestmusic',
    name: 'LatestMusic',
    component: LatestMusic
  },
  {
    path: '/latestMV',
    name: 'LatestMV',
    component: LatestMV
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist
  },
  {
    path: '/mv',
    name: 'MV',
    component: MV
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: "history",
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router
