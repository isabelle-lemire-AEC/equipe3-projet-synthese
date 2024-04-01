<!-- EntrepriseDetails.vue -->
<template>
  <div v-if="entreprise" class="form-fiche fiche-entreprise-details">
    <!-- Affichage du logo de l'entreprise -->
    <div class="form-fiche__wrapper-titre-logo">
      <img class="entreprise-logo" :src="logoEntreprise" :alt="entreprise.name" />
      <div class="form-fiche__wrapper-titre">
        <p class="form-fiche__nom-section">Entreprise</p>
        <h1 class="entreprise-nom">{{ entreprise.name }}</h1>
      </div>
    </div>

    <!-- Boutons d'action pour modifier, valider ou supprimer l'entreprise -->
    <div class="form-fiche__wrapper-boutons-encadre">
      <div class="boutons-action">
        <button class="boutons-action__crochet">
          <i class="fa-solid fa-check"></i>
        </button>
        <button class="boutons-action__modifier" @click="mettreAjour">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="boutons-action__supprimer" @click="afficherConfirmationModal">
          <i class="fas fa-square-xmark"></i>
        </button>
      </div>

      <!-- Informations sur l'entreprise -->
      <div class="form-fiche__encadre">
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h2>Courte présentation</h2>
          <p>{{ entreprise.description }}</p>
        </div>

        <!-- Contact de l'entreprise -->
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3>Personne contact</h3>
          <p class="nom-contact">Louise St-Cyr</p>
        </div>

        <!-- Informations de contact -->
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3 class="section-title">Information de contact</h3>
          <div class="form-fiche__colonnes-inputs">
            <div class="form-fiche__colonne-inputs">
              <div class="adresse">
                <div class="form-fiche__label-input-vertical">
                  <h4>Adresse</h4>
                  <p>{{ entreprise.address }}</p>
                </div>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Ville</h4>
                <p>{{ entreprise.city }}</p>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Province</h4>
                <p>{{ entreprise.province.value }}</p>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Code postal</h4>
                <p>{{ entreprise.postalCode }}</p>
              </div>
            </div>
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <h4>Téléphone</h4>
                <p>{{ entreprise.phone }}</p>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Courriel</h4>
                <p>{{ entreprise.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div class="modal" v-if="showConfirmationModal">
      <div class="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer cette entreprise ?</p>
        <div class="modal-buttons">
          <button class="btn cancel" @click="annulerSuppression">Annuler</button>
          <button class="btn confirm" @click="supprimerEntreprise">Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import logoEntreprise from '@/assets/mediavox-logo.jpg'; // Importez le logo de l'entreprise

const entreprise = ref(null);

// État du modal de confirmation de suppression
const showConfirmationModal = ref(false);

// Router et route pour la navigation dans l'application
const router = useRouter();
const route = useRoute();

// Fonction pour charger les détails de l'entreprise depuis l'API
const chargerEntreprise = async () => {
  try {
    const response = await axios.get(`https://api-3.fly.dev/enterprises/${route.params.id}`);
    entreprise.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'entreprise:", error);
  }
};

// Fonction pour rediriger vers la page de mise à jour de l'entreprise
const mettreAjour = () => {
  router.push({ name: 'EntrepriseMiseAjour', params: { id: entreprise.value._id } });
};

// Fonction pour afficher le modal de confirmation de suppression
const afficherConfirmationModal = () => {
  showConfirmationModal.value = true;
};

// Fonction pour annuler la suppression de l'entreprise
const annulerSuppression = () => {
  showConfirmationModal.value = false;
};

// Fonction pour supprimer l'entreprise
const supprimerEntreprise = async () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
    try {
      await axios.delete(`https://api-3.fly.dev/enterprises/${route.params.id}`);
      router.push({ name: 'Entreprises' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'entreprise:', error);
    }
  }
};

// Chargement des détails de l'entreprise au montage du composant
chargerEntreprise();
</script>


<style scoped>
/*   .entreprise-detail-container {
    width: 90%;
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }

  .entreprise-header-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 1rem;
  }

  .entreprise-detail-wrapper {
    position: relative;
    width: 100%;
    padding: 1rem;
  }

  .crud-icons {
    font-size: 20px;
    position: absolute;
    top: -10px;
    right: 90px;
    display: flex;
    gap: 25px;
  }

  .entreprise-content {
    width: 100%;
    background-color: white;
    margin: 0 auto;
    padding: 20px;
  }

  .info-item {
    border-left: 8px solid grey;
    padding-left: 10px;
    margin-bottom: 10px;
  }

  .section-title {
    color: #89a9e6;
    font-size: 1rem;
  }

  h2 span {
    font-weight: bold;
    font-size: 30px;
  }

  p span {
    font-weight: bold;
    font-size: 20px;
    color: gray;
  }

  p {
    color: gray;
  }

  .logo-container {
    flex: 0 1 20%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .entreprise-logo {
    max-width: 60%;
    height: auto;
  }

  .nom-container {
    flex: 0 1 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 5px solid #89a9e6;
    padding-left: 1rem;
  }

  h3 {
    margin-top: 0;
    color: gray;
  }

  .nom-container h2 {
    color: gray;
    font-weight: bold;
    font-size: 30px;
  }

  .entreprise-nom {
    margin: 0;
    margin-bottom: 2rem;
  }

  .section-title {
    font-weight: bold;
    margin: 1rem 0 0.5rem;
    color: #89a9e6;
    line-height: 2.5rem;
  }

  .contact-section .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  } */
</style>