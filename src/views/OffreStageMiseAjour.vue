<template>
    <div class="">

        <select v-model="offerSelection" @change="loadSelectedOffer">

            <option disabled value="">Sélectionnez une offre</option>
            <option v-for="offer in offers" :key="offer._id" :value="offer._id">{{ offer.title }}</option>
        </select>
      <form class="" @submit.prevent="submitForm">

        <div class="">
          <!-- ton annuler nest pas définie raph -->
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
  </template>


<script setup>
import { ref, onMounted } from 'vue';
import { useInternshipOffers } from '@/composables/offres_stage/offreDeStage'
import { useEntreprise } from '../composables/entreprises/entreprise';
import { fetchProvinces, fetchStageTypes, fetchInternshipOffers } from '@/composables/api';
const { getAllEntreprises, response: entreprisesResponse, error: entreprisesError, loading: entrepriseLoading} = useEntreprise();

// getAllEntreprises, 
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

</script>

<style>

</style>
