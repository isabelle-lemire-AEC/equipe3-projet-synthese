<!-- Sidebar.vue -->
<template>
  <div class="menu__container">
    
    <!-- Logo -->
    <div class="menu__logo-sidebar">
      <img src="../assets/eStage-logo.png" alt="Logo">
    </div>

    <ul class="navbar__menu" >
      <li class="navbar__menu-item tableau-de-bord" :class="{ 'active': currentPage === 'TableauDeBord' }">
        <router-link to="/tableau-de-bord" @click.native="updateCurrentPage('TableauDeBord')">
          <i class="fa-solid fa-gauge"></i>
          <span class="nav-mobile">Tableau de bord</span>
        </router-link>
      </li>
      <li class="navbar__menu-item demandes-stage" :class="{ 'active': currentPage === 'DemandesStages'|| currentPage === 'DemandeStageDetails' || currentPage === 'DemandeStageMiseAjour' || currentPage === 'DemandeStageAjout'}">
        <router-link to="/demandes-de-stages" @click="updateCurrentPage('DemandesStages')">
          <i class="fa-solid fa-file-lines"></i>
          <span class="nav-mobile">Demandes de stage</span>
        </router-link>
      </li>
      <li class="navbar__menu-item offres-stage" :class="{ 'active': currentPage === 'OffresStages' || currentPage === 'OffreStageDetails' || currentPage === 'OffreStageMiseAjour' || currentPage === 'OffreStageAjout' }">
        <router-link to="/offres-de-stages" @click="updateCurrentPage('OffresStages')">
          <i class="fa-solid fa-paper-plane"></i>
          <span class="nav-mobile">Offres de stage</span>
        </router-link>
      </li>
      <li class="navbar__menu-item candidats" :class="{ 'active': currentPage === 'Candidats' || currentPage === 'CandidatDetails' || currentPage === 'CandidatMiseAjour' || currentPage === 'CandidatAjout' }">
        <router-link to="/candidats" @click="updateCurrentPage('Candidats')">
          <i class="fa-solid fa-user"></i>
          <span class="nav-mobile">Candidats</span>
        </router-link>
      </li>
      <li class="navbar__menu-item entreprises" :class="{ 'active': currentPage === 'Entreprises' || currentPage === 'EntrepriseDetails' || currentPage === 'EntrepriseMiseAjour' || currentPage === 'EntrepriseAjout' }">
        <router-link to="/entreprises" @click="updateCurrentPage('Entreprises')">
          <i class="fa-solid fa-computer-mouse"></i>
          <span class="nav-mobile">Entreprises</span>
        </router-link>
      </li>
    </ul>
  </div>
 
</template>

<script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { watch } from 'vue';

  // Initialise currentPage avec la page actuelle
  const currentPage = ref(null);

  // Récupère la route actuelle
  const route = useRoute();

  // Met à jour la page active lorsqu'un lien est cliqué
  const updateCurrentPage = (pageName) => {
    if (currentPage.value !== pageName) {
      currentPage.value = pageName;
    }
  };

  // Surveille le changement de route pour mettre à jour la page active
  watch(route, (to) => {
    // Vérifie si la route a un nom et met à jour la page active
    if (to.name && currentPage.value !== to.name) {
      currentPage.value = to.name;
    }
  });

</script>

<style scoped>
  
</style>