<!-- NavBar.vue - Nacer  -->
<template>
    <nav class="navbar">
      <!-- Logo -->
      <div class="logo">
        <img src="../assets/eStage-logo.png" alt="Logo" class="logo">
      </div>
  
      <!-- Boutons d'ajout -->
  
      <div class="add-buttons">
        <i class="fa-solid fa-bars"></i>
        <button class="add-button add-offer" @click="ajouterOffre">
          <i class="fas fa-plus"></i> Ajouter une offre de satge
        </button>
        <button class="add-button add-request" @click="ajouterDemande">
          <i class="fas fa-plus"></i> Ajouter une demande de stage
        </button>
        <button class="add-button add-company" @click="ajouterEntreprise">
          <i class="fas fa-plus"></i> Ajouter une entreprise
        </button>
        <button class="add-button add-candidate" @click="ajouterCandidat">
          <i class="fas fa-plus"></i> Ajouter un candidat
        </button>
      </div>
  
      <div class="user">
        user
        <!-- Contenu à ajouter plus tard -->
      </div>
    </nav>
  </template>
  
  <script>

  export default {
    name: 'NavBar',
    methods: {
      ajouterOffre() {
        this.$router.push({ name: 'OffreStageAjout' });
      },
      ajouterDemande() {
        this.$router.push({ name: 'DemandeStageAjout' });
      },
      ajouterEntreprise() {
        this.$router.push({ name: 'EntrepriseAjout' });
      },
      ajouterCandidat() {
        this.$router.push({ name: 'CandidatAjout' });
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    display: grid;
    grid-template-columns: 20% 60% 20%; /* Répartition en trois colonnes */
    align-items: center; /* Alignement vertical au centre */
    /* Fond cyan */
    padding: 20px;
  }
  
  .logo,
  .add-buttons,
  .user {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Centrage du contenu */
  }

  .logo {
    width: 150px;
    height: auto;
  }
  
  .add-buttons {
    gap: 10px; /* Espacement entre les boutons */
  }
  
  .add-button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    background: none;
  }
  
  /* Couleurs différentes pour chaque bouton */
  .add-offer {
    border: 1px solid #bc1f26;
    color: #bc1f26;
  }
  .add-request {
    border: 1px solid #d6a853;
    color: #d6a853;
  }
  .add-company {
    border: 1px solid #89a9e6;
    color:#89a9e6 ;
  }
  .add-candidate {
    border: 1px solid #7e2687;
    color:#7e2687 ; 
  }
  
  .add-button i {
    margin-right: 5px;
  }
  
  .add-button:hover {
    opacity: 0.8;
  }
  </style>
  