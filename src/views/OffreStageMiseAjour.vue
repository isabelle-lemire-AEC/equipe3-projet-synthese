<template>

  <div>


    <ElementListeStage v-for="offre in toutesOffres"
              :key="offre._id"
              :posteTitre="offre.title"
              :posteNom="offre.enterprise.name" 
              :region="offre.province.value" 
              :date="offre.startDate" 
              :id="offre._id" 
              :isDemande="false"
              :isTableauDeBord="false"
              :isActive="offre.isActive"></ElementListeStage>
  </div>

 <div class="">
    <form class="" @submit.prevent="submitForm">

      <div class="">

              <button class="annuler" type="submit" @click="annulerAjout">Annuler</button>
              <button class="mettre-a-jour" type="submit"><i class="fas fa-save"></i>Sauvegarder</button>
          </div>
   
      <input class="" v-model="offerData.title" type="text" placeholder="Titre de l'offre" />

      <textarea v-model="offerData.description" placeholder="Description"></textarea>

     <div class="">
      <input class="" v-model="offerData.startDate" type="date" placeholder="Date de début" />
      <input v-model="offerData.endDate" type="date" placeholder="Date de fin" />
    </div>

      <input class=""  v-model="offerData._id" type="text" placeholder="_id" />
      <input class=""  v-model="offerData.enterprise.name" type="text" placeholder="entrprise" />
      <input class=""  v-model="offerData.description" type="text" placeholder="entrprise" />
      <input class=""  v-model="offerData.title" type="text" placeholder="programmes de formation" />
      <input class=""  v-model="offerData.startDate" type="text" placeholder="startDate" />
      <input class=""  v-model="offerData.endDate" type="text" placeholder="endDate" />

      <div class="isActive">
          <label for="actif">ACTIF ?</label>
                 <input class="cool" v-model="offerData.isActive" type="text" placeholder="true or false">
        <input class="cool" v-model="offerData.isActive" type="checkbox" placeholder="actif">

      </div>
    
      <select  class="" v-model="offerData.enterprise">
         <option disabled value="">Sélectionnez une entreprise</option>
          <option v-for="entreprise in entreprises" :key="entreprise._id" :value="entreprise">
         {{ entreprise.name }} 
        </option>
      </select>

      <button class="" type="submit">Éditer l'offre</button>
    <button class="" type="button" @click="annulerAjout">Annuler</button>

    </form>
  </div>

</template>

<!-- //raph & caro -->
<script setup>
import { ref, onMounted } from 'vue';
import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';
import { useRoute } from 'vue-router';

const route = useRoute();
const { getInternshipOfferById, response, loading, error, edditerOffre } = useInternshipOffers();
// const { getInternshipOfferById, response, loading, error, edditerOffre } = useInternshipOffers();
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
// Récupération des détails de l'offre de stage et peuplement des champs du formulaire
onMounted(async () => {
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

  offerData.value. salary = offer. salary;
  offerData.value.province = offer.province;
  offerData.value. requiredSkills = offer. requiredSkills;
  offerData.value.internshipType = offer.internshipType;
  offerData.value.paid = offer.paid;
  offerData.value.isActive = offer.isActive;

  // Peuplez les autres champs de formulaire avec les données récupérées
} else {
  console.error("Aucune réponse ou réponse vide reçue lors de la récupération des détails de l'offre de stage.");
}
});

// Fonction de soumission du formulaire
const submitForm = async () => {
await edditerOffre(route.params.id, offerData.value);
};
</script>

<style scoped>
.isActive{
  height: 300px;
  background-color: red;
}
</style>



      <!-- <select v-model="offerSelection" @change="loadSelectedOffer">

          <option disabled value="">Sélectionnez une offre</option>
          <option v-for="offer in offers" :key="offer._id" :value="offer._id">{{ offer.title }}</option>
      </select> -->

    <!-- <div class="">
      <label for="weeklyWorkHours">Heures de travail par semaine :</label>
      <input v-model.number="offerData.weeklyWorkHours" type="number" placeholder="Heures de travail par semaine" />
    </div>
     
      <div class="">
        <label class="" for="Salaire">Salair / demaine; </label>
      <input v-model.number="offerData.salary" type="number" placeholder="Salaire" />
      </div>
    
      <input  class="" v-model="offerData.requiredSkills" type="text" placeholder="Compétences requises" /> -->

<!-- <template>
  <section class="entete">
      <h3>Offre de stage</h3>
      <h1>{{ offerData.title }}</h1>
      <h2>{{ offerData.enterprise.name }}</h2>
  </section>

  <select v-model="offerSelection" @change="loadSelectedOffer">
    <option disabled value="">Sélectionnez une offre</option>
    <option v-for="offer in offers" :key="offer._id" :value="offer._id">{{ offer.title }}</option>
  </select>

  <form class="" @submit.prevent="submitForm">

      <div class="">
  
        <button class="annuler" type="submit" @click="annulerAjout">Annuler</button>
        <button class="mettre-a-jour" type="submit"><i class="fas fa-save"></i>Sauvegarder</button>
      </div>


      <div class="groupe-tache">
          <label for="offreMiseAjour-description">Description de la tâche</label>
          <textarea v-model.trim="offerData.description" id="offerData.description"></textarea>
      </div>

      <div class="groupe-programme">
          <label for="offreMiseAjour-programme">Programme de formation</label>
          <input type="text" id="offreMiseAjour-programme">
      </div>

      <div class="groupe-exigence">
          <label for="offreMiseAjour-exigences">Exigences</label>
          <textarea v-model="offerData.requiredSkills" id="offreMiseAjour-exigences"></textarea>
      </div>

      <div class="groupe-info-stage">
          <h3>Informations sur le stage recherché</h3>

          <div class="groupe-gauche">
              <label for="offreMiseAjour-type">Type de stage</label>
              <select v-model="offerData.internshipType._id" placeholder="Veuillez effectuer un choix" name="type" id="offreMiseAjour-type">
                  <option v-for="internshipType in  internshipTypes" :key="internshipType._id" :value="internshipType._id">{{ internshipType.value }}></option>
              </select>

              <label for="offreMiseAjour-heure">Nombre d'heures par semaine</label>
              <input v-model.number="offerData.weeklyWorkHours" type="number" placeholder="Veuillez effectuer un choix" />

              <label for="remuneration">Rénumération</label>

              <input type="checkbox" id="miseAjourRemuneration1" name="miseAjourRemuneration1" value="discuter">
              <label for="miseAjourRemuneration1"> À discuter</label><br>
              <input type="checkbox" id="miseAjourRemuneration2" name="miseAjourRemuneration2" value="remunere">
              <label for="miseAjourRemuneration2"> Stage rémunéré</label><br>
              <input type="checkbox" id="miseAjourRemuneration3" name="miseAjourRemuneration3" value="nonRemunere">
              <label for="miseAjourRemuneration3"> Stage non rémunéré</label>
          </div>

          <div class="groupe-droite">
              <label for="offreMiseAjour-dateDebut">Date de début</label>
              <input v-model="offerData.startDate" type="date" id="offreMiseAjour-dateDebut" name="dateDebut">

              <label for="offreMiseAjour-dateFin">Date de fin</label>
              <input v-model="offerData.endDate" type="date" id="offreMiseAjour-dateFin" name="dateFin">
          </div>
      </div>

      <section class="info-sup">
          <label for="">Informations suplémentaires</label>
          <textarea id="offreMiseAjour-info-sup-form"></textarea>
      </section>

  </form> 

</template>




<script setup>
import { ref, onMounted } from 'vue';
import { useInternshipOffers } from '@/composables/offres_stage/offreDeStage'
import { useEntreprise } from '../composables/offres_stage/stageEntreprise';

import { fetchProvinces, fetchStageTypes, fetchInternshipOffers } from '@/composables/api';
const { getAllEntreprises, response: entreprisesResponse, error: entreprisesError, loading: entrepriseLoading} = useEntreprise();


const { edditerOffre } = useInternshipOffers();

const selectedOfferId = ref('');
const offers = ref([]);
const offerSelection = ref('');

const entreprises = ref([]);
const provinces = ref([]);
const internshipTypes = ref([]);

const offerData = ref({
    _id: "", // Ajoutez l'ID si nécessaire pour l'édition
  title: "",
  description: "",
  //est ce que l'entreprise à été transformeé en id ?
  enterprise: { _id: "" }, 
  startDate: "",
  endDate: "",
  weeklyWorkHours: 0,
  salary: 0,
  province: { _id: "" },
  //attention ici verifier si je peux mettre plus d'un string dans le tableau de skills
  requiredSkills: [],
  internshipType: { _id: "" },
  paid: "DISCRETIONARY",
  isActive: true
});

const annulerAjout = () => {
  
};

 onMounted(async () => {
    offers.value = await fetchInternshipOffers();
    entreprises.value = await getAllEntreprises();
  provinces.value = await fetchProvinces();
  internshipTypes.value = await fetchStageTypes();

  try {
    offers.value = await fetchInternshipOffers();
  } catch (error) {
    console.error("Erreur lors du chargement des offres de stage :", error);
  }

  const entreprisesData = await getAllEntreprises();
   entreprises.value = entreprisesData.data;
  if (entreprisesResponse.value && Array.isArray(entreprisesResponse.value)){
    entreprises.value = entreprisesResponse.value;
    console.log("Entreprises chargées:", entreprises.value); 
  } else {
    console.error("La réponse n'est pas un tableau:", entreprisesResponse.value);
  }

  if (entreprisesError.value) {
    console.error("Erreur lors du chargement des entreprises:", entreprisesError.value);
  }

 try {
    const typesData = await fetchStageTypes();
    internshipTypes.value = typesData;
    console.log("Provinces chargées:", internshipTypes.value); 
  } catch (error) {
    console.error("Erreur lors du chargement des type", error);
  }


  try {
    const offerData = await fetchStageTypes();
    internshipTypes.value =offerData;
    console.log("offerData chargées:", offerData.value); 
  } catch (error) {
    console.error("Erreur lors du chargement offerData", error);
  }

  try {
    const provincesData = await fetchProvinces();
    provinces.value = provincesData;
    console.log("Provinces chargées:", provinces.value); 
  } catch (error) {
    console.error("Erreur lors du chargement des provinces", error);
  }


});

const loadSelectedOffer = () => {
    const selectedOffer = offers.value.find(offer => offer._id === offerSelection.value);
    if (selectedOffer) {
        offerData.value = { ...selectedOffer };
    }
};

const submitForm = async () => {
    await edditerOffre(offerData.value._id, offerData.value);
};

</script> -->



<!--<template>
    <div class="">
      
      

        <select v-model="offerSelection" @change="loadSelectedOffer">

            <option disabled value="">Sélectionnez une offre</option>
            <option v-for="offer in offers" :key="offer._id" :value="offer._id">{{ offer.title }}</option>
        </select>
      <form class="" @submit.prevent="submitForm">
        

        <div class="">
           ton annuler nest pas définie raph 
                <button class="annuler" type="submit" @click="annulerAjout">Annuler</button>
                <button class="mettre-a-jour" type="submit"><i class="fas fa-save"></i>Sauvegarder</button>
        </div>
     
        <input class="" v-model="offerData.title" type="text" placeholder="Titre de l'offre" />
  
        <textarea v-model="offerData.description" placeholder="Description"></textarea>
  
        <select class="" v-model="offerData.province._id">
          <option disabled value="">Sélectionnez une province</option>
          <option v-for="province in provinces" :key="province._id" :value="province._id">{{ province.value }}</option>
        </select>

        <select class="" v-model="offerData.internshipType._id">
          <option disable value="">select Type temps plein ou partiel</option>
          <option v-for="internshipType in  internshipTypes" :key="internshipType._id" :value="internshipType._id">{{ internshipType.value }}</option>
        </select>
  
       <div class="">
        <input class="" v-model="offerData.startDate" type="date" placeholder="Date de début" />
        <input v-model="offerData.endDate" type="date" placeholder="Date de fin" />
      </div>

      <div class="">
        <label for="weeklyWorkHours">Heures de travail par semaine :</label>
        <input v-model.number="offerData.weeklyWorkHours" type="number" placeholder="Heures de travail par semaine" />
      </div>
       
        <div class="">
          <label class="" for="Salaire">Salair / demaine; </label>
        <input v-model.number="offerData.salary" type="number" placeholder="Salaire" />
        </div>
      
        <input  class="" v-model="offerData.requiredSkills" type="text" placeholder="Compétences requises" />
  
        <select  class="" v-model="offerData.enterprise">
           <option disabled value="">Sélectionnez une entreprise</option>
            <option v-for="entreprise in entreprises" :key="entreprise._id" :value="entreprise">
           {{ entreprise.name }} 
          </option>
        </select>

        <button class="" type="submit">Éditer l'offre</button>
      <button class="" type="button" @click="annulerAjout">Annuler</button>

      </form>
    </div>
  </template>-->



