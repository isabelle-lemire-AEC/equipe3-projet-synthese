<template>
  <div class="pageContainer">
        <h1>Offres de stage</h1>
        <RouterLink to="/offre-de-stage-ajout">
            <button class="bouton bouton--rouge">Ajouter une offre de stage</button>
        </RouterLink>
        <div class="listeOffres">
            <div class="liste-header">
                <span>Poste</span>
                <span>Secteur d'activité</span>
                <span>Région</span>
                <span>Date d'inscription</span>
            </div>
            <ElementListeStage v-for="offre in toutesOffres"
              :key="offre._id"
              :posteTitre="offre.title"
              :posteNom="offre.enterprise.name" 
              :info2="offre.enterprise.city"
              :region="offre.province.value" 
              :date="offre.startDate" 
              :id="offre._id" 
              :isDemande="false"
              :isTableauDeBord="false"
              :isActive="offre.isActive"></ElementListeStage>
        </div>
    </div>
</template>

<script setup>
  import ElementListeStage from '../components/elementListeStage.vue'
  import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';
  import { useProvinces } from '../composables/provinces/provinces.js'
  import { useInternshipTypes } from '@/composables/types_stage/types_stage.js'
  import { ref, onMounted } from 'vue';
  
  const { getAllOffers } = useInternshipOffers();
  const { getAllProvinces } = useProvinces();
  const { getAllInternshipTypes } = useInternshipTypes();

  const toutesOffres = ref([]);

  onMounted(async () => {
    try {
      toutesOffres.value = await getAllOffers();
        console.log("toutesDemandes: ", toutesOffres);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
  });  

  const offreStageListe = {
    title: "string",
    description: "string",
    enterprise: {
      _id: "string",
      image: "string",
      name: "string",
      address: "string",
      postalCode: "string",
      city: "string",
      province: {
        _id: "string",
        value: "string"
      },
      phone: "string",
      email: "string",
      description: "string",
      activitySector: {
        _id: "string",
        value: "string"
      },
      website: "string"
    },
    startDate: "2024-03-26T01:47:05.088Z",
    endDate: "2024-03-26T01:47:05.088Z",
    weeklyWorkHours: 0,
    salary: 0,
    province: {
      _id: "string",
      value: "string"
    },
    requiredSkills: [
      "string"
    ],
    internshipType: {
      _id: "string",
      value: "string"
    },
    paid: "DISCRETIONARY",
    isActive: true
  }

  const testAPI = async () => {

    const provinces = await getAllProvinces();
    offreStageListe.province = provinces.data[0];

    const internshipTypes = await getAllInternshipTypes();
    offreStageListe.internshipType = internshipTypes.data[0];

    const allOffers = await getAllOffers();

    await getAllOffers();
  }

  testAPI();

</script>




<!--<template>
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
            </tr>
            
            <tr v-for="offer in offers" :key="offer._id">
                <td>
                    <router-link :to="`/offre-de-stage-details/${offer._id}`">{{ offer.title }}</router-link>
                </td>
    
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>-->
  <!-- raph caro -->
  <!--<script setup>
  import { ref, onMounted } from 'vue';
  import { useInternshipOffers } from '../composables/offres_stage/offreDeStage'; 
   import { useRouter } from 'vue-router';
  
  const { getAllOffers, response, error, loading } = useInternshipOffers();
  const offers = ref([]);
  
  onMounted(async () => {
    await getAllOffers();
    offers.value = response.value; 
  });
  
  
  </script>-->
  
  
<style scoped>

/*html, body {
    background-color: rgb(222, 222, 222);
    font-family: Arial, Helvetica, sans-serif;
}

h1 {
    margin: 0 0 3rem 0;
    padding: 0;
}

.pageContainer {
    padding: 2rem;
    margin: 2rem;
}

.listeStagesHeader {
    display: none;
}

.listeStages {
    background-color: white;
    padding: 4rem 2rem 2rem 2rem;
    border-radius: 1rem;
}

.ajouterDemande {
    margin: 0 0 1rem 0;
    padding: 0.8rem;
    border-radius: 0.3rem;
    border: 0px solid white;
    background-color: orange;
    color: white;
}

.iconTemp {
    background-color: orange;
    width: 40px;
    height: 40px;
    border-radius: 0.5rem;
}

.elementStage {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 0 0;
    padding: 0 0 1rem 0;
    border-bottom: 0.1rem solid rgb(193, 193, 193);
}

.barreVerticale {
    width: 0.3rem;
    background-color: orange;
}

.poste {
    display: flex;
    flex-direction: column;
}*/

</style>