<!-- Sidebar.vue - Nacer -->
<template>
  <nav class="navbar">
    <ul>
      <li class="link tableau-de-bord">
        <router-link to="/tableau-de-bord">
          <i class="fa-solid fa-gauge"></i>
          <span>Tableau de bord</span>
        </router-link>
      </li>
      <li class="link demandes-stage">
        <router-link to="/demandes-de-stages">
          <i class="fa-solid fa-file-lines"></i>
          <span>Demandes de stage</span>
        </router-link>
      </li>
      <li class="link offres-stage">
        <router-link to="/offres-de-stages">
          <i class="fa-solid fa-paper-plane"></i>
          <span>Offres de stage</span>
        </router-link>
      </li>
      <li class="link candidats">
        <router-link to="/candidats">
          <i class="fa-solid fa-user"></i>
          <span>Candidats</span>
        </router-link>
      </li>
      <li class="link entreprises">
        <router-link to="/entreprises">
          <i class="fa-solid fa-computer-mouse"></i>
          <span>Entreprises</span>
        </router-link>
      </li>
    </ul>
  </nav>  
<!-- CODE DONA
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
  </div>
 -->
</template>

<script>
// Code DONA
//export default {
 // name: 'Sidebar',
  //data() {return {currentPage: 'dashboard' }
  //}
//}
</script>

<style scoped>
  .navbar {
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
  }

  .navbar a {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    gap: 2rem;
  }

  .tableau-de-bord i,
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


  .tableau-de-bord:hover::after,
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
  }

  /* Styles pour la version mobile */
  @media screen and (max-width: 768px) {
    .navbar {
      grid-column: 1 / -1;
      grid-row: 1;
    }
  }
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
</style>
