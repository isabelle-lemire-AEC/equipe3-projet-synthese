<!-- NavBar.vue - Nacer / prog isa pour identification  -->
<template>
  <!-- Boutons d'ajout -->
  <div class="header" v-if="nomPrenom && courriel"> 
    <div class="header__items">
      <div class="header__icone-boutons-ajout">
          <div class="burger-menu"  @click="toggleSidebar">
            <i class="fa-solid fa-bars " id="icone-menu"></i>
          </div>
          
          <div class="boutons-ajout">
            <button class="add-button add-offer" @click="ajouterOffre">
              <i class="fas fa-plus"></i> <span>Ajouter une offre de stage</span>
            </button>
            <button class="add-button add-request" @click="ajouterDemande">
              <i class="fas fa-plus"></i> <span>Ajouter une demande de stage</span>
            </button>
            <button class="add-button add-company" @click="ajouterEntreprise">
              <i class="fas fa-plus"></i> <span>Ajouter une entreprise</span>
            </button>
            <button class="add-button add-candidate" @click="ajouterCandidat">
              <i class="fas fa-plus"></i> <span>Ajouter un candidat</span>
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
  import { ref } from 'vue';
  import { useRouter } from "vue-router";
  import {  defineProps } from 'vue'
  

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
  const props = defineProps(['toggleSidebar']);



</script>


