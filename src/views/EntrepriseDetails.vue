<!-- EntrepriseDetails.vue -->
<template>
  <div v-if="entreprise" class="form-fiche fiche-entreprise-details">
    <!-- Affichage du logo de l'entreprise -->
    <div class="form-fiche__wrapper-titre-logo">
      <img
        class="entreprise-logo"
        :src="logoEntreprise"
        :alt="entreprise.name"
      />
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
        <div v-if="modalShow" class="modal">
    <div class="modal-content">
      <p>{{ modalMessage }}</p>
      <div class="modal-footer">
        <button class="btn non" @click="toggleModal">Non</button>
        <button class="btn oui" @click="confirmSuppression">Oui</button>
      </div>
    </div>
  </div>
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

.modal-content {
  width: 400px;
  height: 200px;
  background-color: #eee;
  border: 1px solid cyan;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.modal-footer {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.btn {
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;
  width: 30%;

  &.non {
    background-color: red;
  }

  &.oui {
    background-color: green;
  }
}

</style>