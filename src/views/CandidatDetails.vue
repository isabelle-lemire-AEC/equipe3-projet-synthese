<!-- CandidatDetails.vue - Donaria  -->
<template>
  <div class="candidat candidat-card-details" v-if="candidat">
    <div class="border">
      <p>Candidat</p>
      <h2 class="candidat-name">{{ candidat.firstName }} {{ candidat.lastName }}</h2>
      <p class="candidat-role">UX Designer</p>
    </div>
    <div class="button-group">
      <button class="btn approve"> 
        <img src="../assets/icons8-tick-box-48.png" alt="Icon">
      </button>
      <button class="btn edit" @click="redirigerVersMiseAJour(candidat._id)">
        <img src="../assets/icons8-write-24.png" alt="Icon">
      </button>      
      <button class="btn delete" @click="afficherConfirmationModal"> 
        <img src="../assets/icons8-delete-24.png" alt="Icon">
      </button>
    </div>

    <!-- Section de description du candidat -->
    <div class="description">
      <section class="presentation">
        <h2>Courte présentation</h2>
        <p>{{ candidat.description }}</p>
      </section>
      <!-- Section d'informations personnelles du candidat -->
      <section class="personal-info">
        <h3>Informations personnelles</h3>
        <div class="info-row">
          <div class="info-column">
            <div class="info-item">
              <h4>Adresse</h4>
              <p>{{ candidat.address }}</p>
            </div>

            <div class="info-item">
              <h4>Ville</h4>
              <p>{{ candidat.city }}</p>
            </div>

            <div class="info-item">
              <h4>Province</h4>
              <p>{{ candidat.province.value }}</p>
            </div>

            <div class="info-item">
              <h4>Code postal</h4>
              <p>{{ candidat.postalCode }}</p>
            </div>
          </div>
          <div class="info-column">
            <div class="info-item">
              <h4>Téléphone</h4>
              <p>{{ candidat.phone }}</p>
            </div>

            <div class="info-item">
              <h4>Courriel</h4>
              <p>{{ candidat.email }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div class="modal" v-if="showConfirmationModal">
      <div class="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer ce candidat ?</p>
        <div class="modal-buttons">
          <button class="btn cancel" @click="annulerSuppression">Annuler</button>
          <button class="btn confirm" @click="confirmerSuppression">Confirmer</button>
        </div>
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

// Importation de la fonction deleteCandidat depuis le fichier candidat.js
const { deleteCandidat } = useCandidat();

// Fonction pour rediriger vers la page de mise à jour du candidat
const redirigerVersMiseAJour = (id) => {
  router.push({ name: 'CandidatMiseAjour', params: { id } });
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
    router.push({ name: 'Candidats' }); 
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
</script>


<style scoped>
  .candidat {
    background-color: #ececee;
    padding: 80px 200px 80px 200px;
  }

  .candidat-card-details {
    width: 900px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    color: #333;
  }

  .candidat-name {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }

  .candidat-role {
    font-size: 20px;
    color: #666;
    margin-bottom: 0;
    background-color: #fff;
    padding: 5px;
    display: inline-block;
  }

  .presentation h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
  }

  .info-column {
    width: 45%;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .btn {
    cursor: pointer;
    border: none;
  }

  .description {
    background-color: #fff;
    padding: 30px 50px 40px 60px;
  }

  .personal-info {
    padding-top: 20px;
  }

  h2,
  h3 {
    color: purple;
  }

  .border{
    border-left: 5px solid purple;
    padding-left: 1em;
  }

    /* Styles pour le modal */
  .modal {
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
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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
}

</style>
