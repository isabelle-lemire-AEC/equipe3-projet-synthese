<!-- Sidebar.vue - Nacer -->
<template>
  <!-- Logo -->

  
    <div class="container-menu">
      <div class="logo">
        <img src="../assets/eStage-logo.png" alt="Logo" class="logo">
      </div>

      <ul class="navbar__menu">
        <li class="navbar__menu-item tableau-de-bord" :class="{ 'active': currentPage === 'TableauDeBord' }">
          <router-link to="/tableau-de-bord" @click.native="updateCurrentPage('TableauDeBord')">
            <i class="fa-solid fa-gauge"></i>
            <span>Tableau de bord</span>
          </router-link>
        </li>
        <li class="navbar__menu-item demandes-stage" :class="{ 'active': currentPage === 'DemandesStages'|| currentPage === 'DemandeStageDetails' || currentPage === 'DemandeStageMiseAjour' || currentPage === 'DemandeStageAjout'}">
          <router-link to="/demandes-de-stages" @click="updateCurrentPage('DemandesStages')">
            <i class="fa-solid fa-file-lines"></i>
            <span>Demandes de stage</span>
          </router-link>
        </li>
        <li class="navbar__menu-item offres-stage" :class="{ 'active': currentPage === 'OffresStages' || currentPage === 'OffreStageDetails' || currentPage === 'OffreStageMiseAjour' || currentPage === 'OffreStageAjout' }">
          <router-link to="/offres-de-stages" @click="updateCurrentPage('OffresStages')">
            <i class="fa-solid fa-paper-plane"></i>
            <span>Offres de stage</span>
          </router-link>
        </li>
        <li class="navbar__menu-item candidats" :class="{ 'active': currentPage === 'Candidats' || currentPage === 'CandidatDetails' || currentPage === 'CandidatMiseAjour' || currentPage === 'CandidatAjout' }">
          <router-link to="/candidats" @click="updateCurrentPage('Candidats')">
            <i class="fa-solid fa-user"></i>
            <span>Candidats</span>
          </router-link>
        </li>
        <li class="navbar__menu-item entreprises" :class="{ 'active': currentPage === 'Entreprises' || currentPage === 'EntrepriseDetails' || currentPage === 'EntrepriseMiseAjour' || currentPage === 'EntrepriseAjout' }">
          <router-link to="/entreprises" @click="updateCurrentPage('Entreprises')">
            <i class="fa-solid fa-computer-mouse"></i>
            <span>Entreprises</span>
          </router-link>
        </li>
      </ul>
    </div>



   <!--CODE DONA
  <div class="sidebar">
    <div class="menu-item" :class="{ active: currentPage === 'dashboard' }">
      <span>Tableau de bord</span>
    </div>
    <div class="menu-item" :class="{ active: currentPage === 'requests' }">
      <span>Demandes de stages</span>
    </div>
    <div class="menu-item" :class="{ active: currentPage === 'offers' }">
      <span>Offres de stage</span>
    </div>
    <div class="menu-item" :class="{ active: currentPage === 'candidates' }">
      <span>Candidats</span>
    </div>
    <div class="menu-item" :class="{ active: currentPage === 'companies' }">
      <span>Entreprises</span>
    </div>
  </div>-->
 
</template>

<script>
  // Code DONA
  //export default {
  // name: 'Sidebar',
  //data() {return {currentPage: 'dashboard' }
  //}
  //}

  export default {
  data() {
    return {
      currentPage: null, // Initialiser avec la page actuelle
    };
  },
  methods: {
    updateCurrentPage(pageName) {
      if (this.currentPage !== pageName) {
        this.currentPage = pageName; // Mettre à jour la page active lorsqu'un lien est cliqué
      }
    },
  },
  watch: {
    // Surveiller le changement de route pour mettre à jour la page active
    $route(to) {
      // Vérifier si la route a un nom et mettre à jour la page active
      if (to.name && this.currentPage !== to.name) {
        this.currentPage = to.name;
      }
    },
  },
};

</script>

<style scoped>
  /*  .navbar {
    grid-column: 1;
    grid-row: 1 / -1;
    padding: 20px;
    height: 100vh;
  }

  .navbar ul {
    list-style-type: none;
    padding: 10px;
  }

  .navbar li {
    margin-bottom: 30px;
    position: relative;
  } */

  /*   .navbar a {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    gap: 2rem;
  } */

  /* .tableau-de-bord i,
  .tableau-de-bord span {
    color: #069da4;
  }
  .demandes-stage i,
  .demandes-stage span {
    color: #d6a853;
  }
  .offres-stage i,
  .offres-stage span {
    color: #bc1f26;
  }
  .candidats i,
  .candidats span {
    color: #c94ed2;
  }
  .entreprises i,
  .entreprises span {
    color: #89a9e6;
  }
 */

  /* .tableau-de-bord:hover::after,
  .demandes-stage:hover::after,
  .offres-stage:hover::after,
  .candidats:hover::after,
  .entreprises:hover::after {
    content: '';
    position: absolute;
    top: -10px;
    right: 3rem;
    height: 2rem;
    width: 0.1em;
  }

  .tableau-de-bord:hover::after {
    background-color: #069da4;
  }
  .demandes-stage:hover::after {
    background-color: #d6a853;
  }
  .offres-stage:hover::after {
    background-color: #bc1f26;
  }
  .candidats:hover::after {
    background-color: #c94ed2;
  }
  .entreprises:hover::after {
    background-color: #89a9e6;
  } */

  /* Styles pour la version mobile */
  /*  @media screen and (max-width: 768px) {
    .navbar {
      grid-column: 1 / -1;
      grid-row: 1;
    }
  } */
  /* STYLE DONA
.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.menu-item {
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.menu-item.active {
  color: white;
  background-color: purple;
}
*/

/*colors: {
        'tableau-de-bord': '#0C9DA4', // Couleur pour le lien Tableau de bord
        'demandes-stage': '#CB912B', // Couleur pour le lien Demandes de stage
        'offres-stage': '#BB2026', // Couleur pour le lien Offres de stage
        'candidats' : '#7F2987',// Ajoutez les autres couleurs pour chaque lien
        'entreprises' : '#86A9E6',
      }*/
</style>