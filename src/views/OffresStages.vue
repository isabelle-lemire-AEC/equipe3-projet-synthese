<template>
  <div>
    <h3>Offres de stage disponibles</h3>
    <div v-if="loading">Chargement...</div>
    <div v-if="error">Erreur lors du chargement des offres</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Entreprise</th>
      
          </tr>
        </thead>
        <tbody>
          <tr v-for="offer in offers" :key="offer._id">
            <td>{{ offer.title }}</td>
            <td>{{ offer.enterprise.name }}</td>


      
    
          </tr>
          <tr v-for="offer in offers" :key="offer._id">
    <td>
      <router-link :to="`/offre-de-stage-details/${offer._id}`">{{ offer.title }}</router-link>
    </td>
    <td>{{ offer.title }}</td>
  </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useInternshipOffers } from '../composables/offres_stage/offreDeStage'; 
 import { useRouter } from 'vue-router';

const { getAllOffers, response, error, loading } = useInternshipOffers();
const offers = ref([]);

onMounted(async () => {
  await getAllOffers();
  offers.value = response.value; 
});


</script>
