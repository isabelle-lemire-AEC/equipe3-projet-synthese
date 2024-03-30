<!-- NavBar.vue - Nacer / prog isa pour identification  -->
<template>
  <!-- Boutons d'ajout -->
  <div class="header" v-if="nomPrenom && courriel"> 
    <div class="header__items">
      <div class="header__icone-boutons-ajout">
          <i class="fa-solid fa-bars" id="icone-menu" @click="toggleMenu"></i>
          <div class="boutons-ajout">
            <button class="add-button add-offer" @click="ajouterOffre">
              <i class="fas fa-plus"></i> Ajouter une offre de stage
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
        </div>  
        
          <div class="utilisateur">
            <div class="utilisateur__details">
              <!-- Utilisation des données de l'utilisateur provenant du localStorage -->
              <p class="utilisateur__nom">{{ nomPrenom }}</p>
              <p class="utilisateur__courriel">{{ courriel }}</p>
            </div>
          

            <div class="utilisateur__img">
              <img src="../assets/user.png" alt="Utilisateur" />
            </div>
          </div>
        
      
    </div>

  </div>
</template>

<script setup>
  import { ref, defineEmits } from 'vue';
  import { useRouter } from "vue-router";


  // Récupérer les informations à partir du localStorage
  const nomPrenom = ref(localStorage.getItem('nomPrenom'));
  const courriel = ref(localStorage.getItem('courriel'));

  const router = useRouter();

  const ajouterOffre = () => {
    router.push({
      name: "OffreStageAjout",
    });
  };

  const ajouterDemande = () => {
    router.push({
      name: "DemandeStageAjout",
    });
  };

  const ajouterEntreprise = () => {
    router.push({
      name: "EntrepriseAjout",
    });
  };

  const ajouterCandidat = () => {
    router.push({
      name: "CandidatAjout",
    });
  };


  /* Menu toggable */
const emit = defineEmits(['menu-toggled']);
    const isMenuOpen = ref(false);

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    emit('menu-toggled', isMenuOpen.value);
  };
</script>


<!--<style scoped>
  .navbar {
    display: grid;
    grid-template-columns: 20% 60% 20%;
    /* Répartition en trois colonnes */
    align-items: center;
    /* Alignement vertical au centre */
    /* Fond cyan */
    padding: 20px;
  }

  .logo,
  .add-buttons,
  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* Centrage du contenu */
  }

  .add-buttons {
    gap: 10px;
    /* Espacement entre les boutons */
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
    color: #89a9e6;
  }

  .add-candidate {
    border: 1px solid #7e2687;
    color: #7e2687;
  }

  .add-button i {
    margin-right: 5px;
  }

  .add-button:hover {
    opacity: 0.8;
  }

  .utilisateur {
    margin-left: 20px;
  }

  .utilisateur-detail p {
    text-align: right;
    margin: 0;
    padding-right: 5px;
  }

  .utilisateur-nom {
    font-size: 15px;
    font-weight: bold;
  }

  .utilisateur-courriel {
    font-size: 12px;
  }

  img.utilisateur-img {
    width: 20%;
  }

  .flex {
    align-items: center;
  }
</style>-->