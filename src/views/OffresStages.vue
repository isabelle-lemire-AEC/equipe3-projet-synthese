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
  </template>
  <!-- raph caro -->
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
  
  
  <!-- <template>
    
    <h1>Offres de stage</h1>

    <button>Ajouter une offre de stage</button>
    <div v-if="loading">Chargement...</div>
    <div v-if="error">Erreur lors du chargement des offres</div>
    <div v-else>
    <table>
        <thead>
            <tr>
                <th scope="col">Poste</th>
                
                <th scope="col">Secteur d'activité</th>
                
                <th scope="col">Région</th>
                
                <th scope="col">Date de publication</th>
                
                <th scope="col">t</th>
            </tr>
        </thead>
   
        <tbody>
            <tr  v-for="offer in offers"  :key="offer">
                
                <div >
                    <th scope="row">
                        <div class="poste">
                            
                            icone
                            <h4>{{ offer.title }}</h4>
                            <p>{{ offer.enterprise.name}}</p>
                        </div>
                        
                    </th>
                            
                    <td>{{ offer.enterprise.activitySector }}</td>
                    <td>{{ offer.enterprise.city }}</td>
                    <td>2023-03-03</td>
                    <td></td>
                </div>
            </tr>
        </tbody>
        
    </table>
    </div>
    <hr>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import  useInternshipOffers  from '../composables/offres_stage/offreDeStage'; 

const { getAllOffers, response, error, loading } = useInternshipOffers();
const offers = ref([]);

onMounted(async () => {
  await getAllOffers();
  offers.value = response.value; 
});
/*const pageOffreStageDetail = () =>{
        router.push({name: 'offre-de-stage-details'})
    }*/



</script>

<style scoped>

h1{
    color: #707070;
    padding: 40px;
}

button{
    margin: 0 0 40px 40px;
    padding: 10px;
    border-radius: 10px;
    color: rgb(249, 246, 247);
    background-color: #bb2026;
    
}
table{
    width: 100%;
    table-layout: fixed;
    margin-left: 40px;
}
tbody td {
  text-align: left;
}
tbody th{
    text-align: left;
}
thead th{
    text-align: left;
    color: #707070;
   
}
hr.separation{
    margin: 0 40px;
}
.vl{
    border-left: 6px solid #bb2026;
    height: 60px;
    display: inline;
}
.poste{
    display: flex;
    align-items: center;
  
}
.poste-detail{
    margin-left: 10px;
}


</style> -->