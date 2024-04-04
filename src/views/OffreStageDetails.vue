<!-- OffreStageDetails.vue -->
<template>
  <div>

    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur lors du chargement des détails de l'offre de stage: {{ error }}</div>

    <div v-else-if="offerData && offerData.title" class="form-fiche fiche-offrestages-details">
      <div class="boutons-action">
        <button :class="{ 'boutons-action__crochet': offerData.isActive }" @click="activate()">
          <i class="fas fa-check"></i>
        </button>
        <button class="boutons-action__modifier" @click="redirigerVersMiseAJour(offerData._id)">
          <i class="fas fa-pen-to-square"></i>
        </button>
        <!-- Bouton de suppression -->
        <button class="boutons-action__supprimer" @click="afficherConfirmationModal">
          <i class="fas fa-square-xmark"></i>
        </button>
      </div>

      <div class="form-fiche__wrapper-titre">
        <p class="form-fiche__nom-section">Offre de stage</p>
        <h1>{{ offerData.title }}</h1>
        <p class="form-fiche__sous-titre">{{ offerData.enterprise?.name }}</p>
      </div>

      <div class="form-fiche__wrapper-boutons-encadre">
        <!-- Section Encadré blanc  -->
        <div class="form-fiche__encadre">
          <!-- Section Description tâche -->
          <div class="form-fiche__wrapper-titre-groupe-inputs">
            <h2>Description de la tâche</h2>
            <p>{{ offerData.description }}</p>
          </div>
          <!-- Section Formation et exigences -->
          <div class="form-fiche__label-input-vertical">
            <h4>Formation demandées</h4>
            <p>lorem</p>
          </div>
          <div class="form-fiche__label-input-vertical">
            <h4>Exigences</h4>
            <p>{{ exigences }}</p>
          </div>
          <!-- Section Information sur le stage -->
          <div class="form-fiche__wrapper-titre-groupe-inputs">
            <h3>Informations sur le stage</h3>
            <div class="form-fiche__colonnes-inputs">
              <!-- Colonne de gauche -->
              <div class="form-fiche__colonne-inputs">
                <div class="form-fiche__label-input-vertical">
                  <h4>Type de stage</h4>
                  <p>{{ offerData.internshipType.value }}</p>
                </div>
                <div class="form-fiche__label-input-vertical">
                  <h4>Nombre d'heures par semaine</h4>
                  <p>Hard codé - info manquante</p>
                </div>
                <div class="form-fiche__label-input-vertical">
                  <h4>Rénumération</h4>
                  <p>{{ offerData.paid }}</p>
                </div>
              </div>
              <!-- Colonne de droite -->
              <div class="form-fiche__colonne-inputs">
                <div class="form-fiche__label-input-vertical">
                  <h4>Date de début</h4>
                  <p>{{ offerData.startDate }}</p>
                </div>
                <div class="form-fiche__label-input-vertical">
                  <h4>Date de fin</h4>
                  <p>{{ offerData.endDate }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="form-fiche__wrapper-titre-groupe-inputs">
            <h3>Informations suplémentaires</h3>
            <textarea id="edit-demande-infos-supp" name="edit-demande-infos-supp" rows="5"
              v-model="offerData.additionalInformation"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Utilisation du composant ModalSuppression -->
    <ModalSuppression :showConfirmationModal="showConfirmationModal"
      :message="'Êtes-vous sûr de vouloir supprimer cette offre de stage?'" @annulerSuppression="annulerSuppression"
      @confirmerSuppression="supprimer" />


    <!-- Message d'erreur
    <div v-else>Aucune information disponible</div>   -->
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';
  import axios from 'axios';
  import ModalSuppression from '@/components/ModalSuppression.vue'; 

  const { supprimerOffre } = useInternshipOffers();
  const route = useRoute();
  const router = useRouter(); 
  const { getInternshipOfferById, response, loading, error, edditerOffre } = useInternshipOffers();
  const showConfirmationModal = ref(false); // Variable pour contrôler l'affichage du modal
  const exigences = ref(null);

  onMounted(async () => {

    await getInternshipOfferById(route.params.id);
    if (response.value) {
      const offer = response.value;

      offerData.value._id=offer._id;
      offerData.value.title = offer.title;
      offerData.value.description = offer.description;
      offerData.value.enterprise = offer.enterprise;
      offerData.value.startDate = offer.startDate;
      offerData.value.endDate = offer.endDate;
      offerData.value.weeklyWorkHours = offer.weeklyWorkHours;

      offerData.value.salary = offer.salary;
      offerData.value.province = offer.province;
      offerData.value.requiredSkills = offer.requiredSkills;
      offerData.value.internshipType = offer.internshipType;
      offerData.value.paid = offer.paid;
      offerData.value.isActive = offer.isActive;

      // Peuplez les autres champs de formulaire avec les données récupérées
    } else {
      console.error("Aucune réponse ou réponse vide reçue lors de la récupération des détails de l'offre de stage.");
    }
    exigences.value = offerData.value.requiredSkills.join(', ');

  });

  const offerData = ref({
    _id: "",
    title: "",
    description: "",
    enterprise: { _id: "" },
    startDate: "",
    endDate: "",
    weeklyWorkHours: 0,
    salary: 0,
    province: { _id: "" },
    requiredSkills: [],
    internshipType: { _id: "" },
    paid: "DISCRETIONARY",
    isActive: ""
  });

  const updateOfferStatus = async () => {
    await edditerOffre(route.params.id, offerData.value);
  };

  // Fonction pour supprimer l'offre et fermer le modal
  const supprimer = async () => {
    await supprimerOffre(route.params.id);
    showConfirmationModal.value = false; 
    router.push('/offres-de-stages');
  };

  // Fonction pour afficher la modal de confirmation
  const afficherConfirmationModal = () => {
    showConfirmationModal.value = true; 
  };

  // Fonction pour annuler la suppression et fermer le modal
  const annulerSuppression = () => {
    showConfirmationModal.value = false; 
  };

  const activate = async () => {
      offerData.value.isActive = !offerData.value.isActive;
      await edditerOffre(offerData.value._id, offerData.value);
  }

  const redirigerVersMiseAJour = (id) => {
      router.push({ name: 'OffreStageMiseAjour', params: { id } });
  };

</script>


<style>
/* Styles pour le modal 
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

*/
</style>