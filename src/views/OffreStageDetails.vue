<!-- OffreStageDetails.vue -->
<template>
    <!-- LOADING -->
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur lors du chargement des détails de l'offre de stage: {{ error }}</div>

    <div v-else-if="offerDetails && offerDetails.title" class="form-fiche fiche-offrestages-details">
      <div class="form-fiche__wrapper-titre">
        <p class="form-fiche__nom-section">Offre de stage</p>
        <h1>{{ offerDetails.title }}</h1>
        <p class="form-fiche__sous-titre">{{ offerDetails.enterprise?.name }}</p>
      </div>
        
      <div class="form-fiche__wrapper-boutons-encadre">

          <!-- Bouton action -->
          <div class="boutons-action">
            <button class="boutons-action__crochet">
              <i class="fas fa-check"></i>
            </button>
            <button class="boutons-action__modifier" @click="redirigerVersMiseAJour(demande._id)">
              <i class="fas fa-pen-to-square"></i>
            </button>
            <button class="boutons-action__supprimer" @click="supprimer">
              <i class="fas fa-square-xmark"></i>
            </button>
          </div>

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

            <div class="form-fiche__wrapper-titre-groupe-inputs">
                    <h3>Informations suplémentaires</h3>
                    <p>Hard codé - info manquante</p>
            </div>

          </div>

      </div>

      <!-- A deleter quand ce sera ok -->
      <div>
        <p>OK - TITTLE: *{{ offerDetails.title }}</p>
        <p>OK - Entreprise: "non necessaire" ***{{ offerDetails.enterprise?.name }}</p>
        <p>OK - Description: ***{{ offerDetails.description }}</p>
        <p>Exigences name: ***{{ offerDetails.enterprise.name }}</p>
        <p>OK - Exigences: ***{{ offerDetails.requiredSkills }}</p>
        <p>enterprise.image: ***{{ offerDetails.enterprise.image }}</p>
        <p>enterprise id: ***{{ offerDetails.enterprise._id }}</p>
        <p>enterprise adresse: ***{{ offerDetails.enterprise.address }}</p>
        <p>Exigences postalCode: ***{{ offerDetails.enterprise.postalCode }}</p>
        <p>Exigences province: ***{{ offerDetails.enterprise.province }}</p>
        <p>Exigences phone: ***{{ offerDetails.enterprise.phone }}</p>
        <p>Exigences email: ***{{ offerDetails.enterprise.email }}</p>
      
        <p>description : ***{{ offerDetails.description }}</p>
        <p>OK - startDate: ***{{ offerDetails.startDate }}</p>
        <p>OK -endDate: ***{{ offerDetails.endDate }}</p>
        <p>Exigences salary: ***{{ offerDetails.salary }}</p>
        <p>Exigences province: ***{{ offerDetails.province }}</p>
        <p>OK - Exigences value: ***{{ offerDetails.internshipType.value }}</p>
        <p>OK - Exigences paid: ***{{ offerDetails.paid }}</p>
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
    
    const redirigerVersMiseAJour = (id) => {
        router.push({ name: 'offreStageMiseAjour', params: { id } });
    };

    const supprimer = async () => {
      await supprimerOffre(route.params.id);
      route.push('/chemin-vers-la-liste-des-offres');
    };

    const route = useRoute();
    const router = useRouter(); 
    const { getInternshipOfferById, response, loading, error } = useInternshipOffers();
    const offerDetails = ref({});

    onMounted(async () => {
      await getInternshipOfferById(route.params.id);

      if (response.value && response.value.length > 0) {
        offerDetails.value = response.value[0]; 
      }
    });
</script>

  
  