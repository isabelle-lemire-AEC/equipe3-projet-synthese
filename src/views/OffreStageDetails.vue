
<template>
<!-- Raph ca marche mais j'ai une erreur dans la console mais ca delete pourtent  -->
<button @click="supprimer">Supprimer l'offre</button>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur lors du chargement des détails de l'offre de stage: {{ error }}</div>
    <div v-else-if="offerDetails && offerDetails.title">
      <h1>{{ offerDetails.title }}</h1>
      <h2>Entreprise: {{ offerDetails.enterprise?.name }}</h2>
      <p>Description: {{ offerDetails.description }}</p>

    </div>
    <div v-else>Aucune information disponible</div>
  </template>
  

  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';
  import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';

  const { supprimerOffre } = useInternshipOffers();

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



<!-- <template>
    <section class="entete">
        <h3>Offre de stage</h3>
        <h1>Intégrateur Web junior api titre</h1>
        <h2>api entreprise.name</h2>
    </section>

    <section class="icone">

    </section>

    <div class="page">
        <h1>Description de la tâche</h1>
        <p>api description</p>

        <h3>Formation demandées</h3>
        <p>lorem</p>

        <h3>Exigences</h3>
        <p>api requiredSkills</p>

        <section class="info-stage">
            <h3>Informations sur le stage</h3>

            <div class="groupe-gauche">
                <h3>Type de stage</h3>
                <p>api internshipType</p>

                <h3>Nombre d'heures par semaine</h3>
                <p>api weeklyWorkHours</p>

                <h3>Rénumération</h3>
                <p>api salary</p>
            </div>

            <div class="groupe-droite">
                <h3>Date de début</h3>
                <p>api startDate</p>

                <h3>Date de fin</h3>
                <p>api endDate</p>
            </div>
        </section>

        <section class="info-sup">
            <h3>Informations suplémentaires</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, nulla totam nemo, ea asperiores eveniet minus magni ex hic architecto dolores, commodi repudiandae animi inventore quam molestiae quisquam possimus sunt.</p>
        </section>
    </div>

</template>

<script setup>

</script>

<style>

</style> -->

  
  