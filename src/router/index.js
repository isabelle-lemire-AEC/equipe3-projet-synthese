import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Erreur from '../views/Erreur.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'erreur',
      component: Erreur,
    },
  ],
});

export default router;
