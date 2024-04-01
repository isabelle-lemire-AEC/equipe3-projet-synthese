<template>
  <div v-if="loading">Chargement...</div>
  <div v-else-if="error">Erreur lors du chargement des détails de l'offre de stage: {{ error }}</div>

  <div v-else-if="offerDetails && offerDetails.title" class="form-fiche fiche-offrestages-details">
    <div class="form-fiche__wrapper-titre">
      <p class="form-fiche__nom-section">Offre de stage</p>
      <h1>{{ offerDetails.title }}</h1>
      <p class="form-fiche__sous-titre">{{ offerDetails.enterprise?.name }}</p>
    </div>

    <div class="form-fiche__wrapper-boutons-encadre">
      <!-- Section Encadré blanc  -->
      <div class="form-fiche__encadre">
        <!-- Section Description tâche -->
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h2>Description de la tâche</h2>
          <p>{{ offerDetails.description }}</p>
        </div>
        <!-- Section Formation et exigences -->
        <div class="form-fiche__label-input-vertical">
          <h4>Formation demandées</h4>
          <p>lorem</p>
        </div>
        <div class="form-fiche__label-input-vertical">
          <h4>Exigences</h4>
          <p>{{ offerDetails.requiredSkills }}</p>
        </div>
        <!-- Section Information sur le stage -->
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3>Informations sur le stage</h3>
          <div class="form-fiche__colonnes-inputs">
            <!-- Colonne de gauche -->
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <h4>Type de stage</h4>
                <p>{{ offerDetails.internshipType.value }}</p>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Nombre d'heures par semaine</h4>
                <p>Hard codé - info manquante</p>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Rénumération</h4>
                <p>{{ offerDetails.paid }}</p>
              </div>
            </div>
            <!-- Colonne de droite -->
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <h4>Date de début</h4>
                <p>{{ offerDetails.startDate }}</p>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Date de fin</h4>
                <p>{{ offerDetails.endDate }}</p>
              </div>
            </div>
          </div>
        </div>

        <form class="" @submit.prevent="submitForm">
          <div class="isActive">
            <label for="actif">ACTIF ?</label>
            <input class="cool" v-model="offerData.isActive" type="checkbox" @change="updateOfferStatus" placeholder="actif">
          </div>
          <router-link class="bouton_go-to-eddit" :to="`/offre-de-stage-mise-a-jour/${offerDetails._id}`">Editer' {{ offerDetails.title }}</router-link>
        </form>
        <button @click="supprimer">Supprimer l'offre</button>

        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3>Informations suplémentaires</h3>
          <!-- <p>Hard codé - info manquante</p> -->
        </div>
      </div>
    </div>
  </div>

  <!-- Message d'erreur -->
  <div v-else>Aucune information disponible</div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';
  import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';

  const { supprimerOffre } = useInternshipOffers();
  const route = useRoute();
  const router = useRouter(); 
  const { getInternshipOfferById, response, loading, error, edditerOffre } = useInternshipOffers();
  const offerDetails = ref({});

  onMounted(async () => {
    await getInternshipOfferById(route.params.id);

    if (response.value && response.value.length > 0) {
      offerDetails.value = response.value[0]; 
    }

    await getInternshipOfferById(route.params.id);
    if (response.value && response.value.length > 0) {
      const offer = response.value[0];

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

  const supprimer = async () => {
    await supprimerOffre(route.params.id);
    route.push('/offres-de-stages');
  };

</script>
