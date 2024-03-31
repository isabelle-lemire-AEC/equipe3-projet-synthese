<!-- CandidatDetails.vue - Donaria  -->
<template>
  <div class="form-fiche fiche-candidat-details" v-if="candidat">
    <div class="form-fiche__wrapper-titre">
      <p class="form-fiche__nom-section">Candidat</p>
      <h1>{{ candidat.firstName }} {{ candidat.lastName }}</h1>
      <p class="form-fiche__sous-titre">UX Designer</p>
    </div>

    <div class="form-fiche__wrapper-boutons-encadre">

      <div class="boutons-action">
        <button class="boutons-action__crochet" @click="activate()">
          <i class="fas fa-check"></i>
        </button>
        <button class="boutons-action__modifier" @click="redirigerVersMiseAJour(candidat._id)">
          <i class="fas fa-pen-to-square"></i>
        </button>
        <button class="boutons-action__supprimer" @click="afficherConfirmationModal">
          <i class="fas fa-square-xmark"></i>
        </button>
      </div>

      <div class="form-fiche__encadre">
        <!-- Section de description du candidat -->
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h2>Courte présentation</h2>
          <p>{{ candidat.description }}</p>
        </div>
        <!-- Section d'informations personnelles du candidat -->
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3>Informations personnelles</h3>
          <div class="form-fiche__colonnes-inputs">
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <h4>Adresse</h4>
                <p>{{ candidat.address }}</p>
              </div>

              <div class="form-fiche__label-input-vertical">
                <h4>Ville</h4>
                <p>{{ candidat.city }}</p>
              </div>

              <div class="form-fiche__label-input-vertical">
                <h4>Province</h4>
                <p>{{ candidat.province.value }}</p>
              </div>

              <div class="form-fiche__label-input-vertical">
                <h4>Code postal</h4>
                <p>{{ candidat.postalCode }}</p>
              </div>
            </div>
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <h4>Téléphone</h4>
                <p>{{ candidat.phone }}</p>
              </div>

              <div class="form-fiche__label-input-vertical">
                <h4>Courriel</h4>
                <p>{{ candidat.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de confirmation de suppression -->
  <div class="modal" v-if="showConfirmationModal">
    <div class="modal__contenu">
      <p>Êtes-vous sûr de vouloir supprimer ce candidat ?</p>
      <div class="modal__boutons">
        <button class="bouton bouton--rouge" @click="annulerSuppression">Annuler</button>
        <button class="bouton bouton--vert" @click="confirmerSuppression">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useCandidat } from '@/composables/candidats/candidat';
  import axios from 'axios';

  const candidat = ref(null);
  const showConfirmationModal = ref(false);
  const router = useRouter();
  const route = useRoute();

  // Définir les propriétés du composant
  const props = defineProps({
    id: String
  });

  // Utiliser la propriété 'id' pour obtenir l'identifiant du candidat
  const candidatId = props.id;

  // Importation de la fonction deleteCandidat depuis le fichier candidat.js
  const {
    deleteCandidat
  } = useCandidat();

  // Fonction pour rediriger vers la page de mise à jour du candidat
  const redirigerVersMiseAJour = (id) => {
    router.push({
      name: 'CandidatMiseAjour',
      params: {
        id
      }
    });
  };

  // Fonction pour supprimer un candidat
  const supprimerCandidat = async (id) => {
    try {
      await deleteCandidat(id);
      console.log("Candidat supprimé avec succès");
      router.go();
    } catch (error) {
      console.error("Erreur lors de la suppression du candidat :", error);
    }
  };

  // Fonction pour afficher la modal de confirmation
  const afficherConfirmationModal = () => {
    showConfirmationModal.value = true;
  };

  // Fonction pour annuler la suppression
  const annulerSuppression = () => {
    showConfirmationModal.value = false;
  };

  // Fonction pour confirmer la suppression
  const confirmerSuppression = async () => {
    const candidatId = candidat.value._id;
    try {
      await deleteCandidat(candidatId);
      console.log("Candidat supprimé avec succès");
      router.push({
        name: 'Candidats'
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du candidat :", error);
    } finally {
      showConfirmationModal.value = false;
    }
  };

  // Fonction exécutée au montage du composant pour récupérer les détails du candidat
  onMounted(async () => {
    const candidatId = route.params.id;
    try {
      const response = await axios.get(`https://api-3.fly.dev/candidates/${candidatId}`);
      candidat.value = response.data;
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  });

  const activate = () => {

  }
  
</script>


<style scoped>
 
  /* Styles pour le modal */
  /* .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
  }

  .btn.confirm {
    background-color: #4CAF50;
    color: white;
  }

  .btn.cancel {
    background-color: #f44336;
    color: white;
  }

  .btn:hover {
    opacity: 0.8;
  } */
</style>