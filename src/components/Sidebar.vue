<!-- Sidebar -->
<template>
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
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      currentPage: 'dashboard' 
    }
  }
}
</script>

<style scoped>
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
</style>
