

<template>
    <div class=" h-2/3 bg-neutral-500 felex flex-col w-96 ">
      <form class="flex flex-col" id="ajout-intern-sheep-offer" @submit.prevent="submitForm">
                <div class="my-4">
          <!-- ton annuler nest pas définie raph -->
                <button class="annuler" type="submit" @click="annulerAjout">Annuler</button>
                <button class="mettre-a-jour" type="submit"><i class="fas fa-save"></i>Sauvegarder</button>
            </div>
             <input class="my-4" v-model="offerData.title" type="text" placeholder="Titre de l'offre" />
  
        <textarea v-model="offerData.description" placeholder="Description"></textarea>
          <select class="my-4" v-model="offerData.province._id">
          <option disabled value="">Sélectionnez une province</option>
          <option v-for="province in provinces" :key="province._id" :value="province._id">{{ province.value }}</option>
        </select>

        <select class="my-4" v-model="offerData.internshipType._id">
          <option disable value="">select Type temps plein ou partiel</option>
          <option v-for="internshipType in  internshipTypes" :key="internshipType._id" :value="internshipType._id">{{ internshipType.value }}</option>
        </select>
  
       <div class="my-4">
        <input class="my-4" v-model="offerData.startDate" type="date" placeholder="Date de début" />
        <input v-model="offerData.endDate" type="date" placeholder="Date de fin" />
      </div>
    <section class="entete">
        <h3>Ajouter une offre de stage</h3>
    </section>

    </form>

    <form @submit.prevent="soumettreFormulaire">

        <button type="submit" @click="annulerAjout">Annuler</button>
        
        <button type="submit">Sauvegarder</button>
        

        <div class="groupe-titre-entreprise">
            <h3>Titre:</h3>
            
              <input type="text" id="titre" v-model.trim="offre.title">
              <p v-if="erreurs.value && erreurs.value.title">Veuillez remplir ce champ</p>
            
            <h3>Entreprise:</h3>
            <label for="type">Veuillez effectuer un choix</label>
           
            <select name="entreprise" id="entreprise" v-model="offre.enterprise.name">
                <option value="" disabled selected>Choisir une entreprise</option>
                <option v-for="enterprise in entreprises" :key="enterprise._id" :value="enterprise.name">
                {{ enterprise.name }}
                </option>
                <p v-if="erreurs.value && erreurs.value.name">Veuillez effectuer un choix</p>
            </select>


        </div>

      <div class="my-4 text-red-400 flex flex-col">
        <label for="weeklyWorkHours">Heures de travail par semaine :</label>
        <input v-model.number="offerData.weeklyWorkHours" type="number" placeholder="Heures de travail par semaine" />
      </div>
       
        <div class="flex flex-col my-4">
          <label class="text-red-500" for="Salaire">Salair / demaine; </label>
        <input v-model.number="offerData.salary" type="number" placeholder="Salaire" />
        </div>
      
        <input  class="my-4" v-model="offerData.requiredSkills" type="text" placeholder="Compétences requises" />
  
        <select  class="my-4" v-model="offerData.enterprise">
           <option disabled value="">Sélectionnez une entreprise</option>
            <option v-for="entreprise in entreprises" :key="entreprise._id" :value="entreprise">
           {{ entreprise.name }} 
          </option>
        </select>
        <button class="p-4 bg-red-400 rounded-lg mx-4" type='submit'>Ajouter offre</button>
      </form>
    </div>
  </template>

<script setup>

import { ref, onMounted } from 'vue';
import { useEntreprise } from '../composables/offres_stage/stageEntreprise';
import { fetchProvinces } from '@/composables/api';
import { fetchStageTypes } from '@/composables/api';

// type RAPH***
import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';

const { ajouterOffre } = useInternshipOffers();
const { getAllEntreprises, response: entreprisesResponse, error: entreprisesError, loading: entrepriseLoading} = useEntreprise();

const entreprises = ref([]);
const provinces = ref([]);
const internshipTypes = ref([]);

// type RAPH***

onMounted(async () => {
  ////////////////////////
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
  ////////////////////////

  ///////////////////////////
  try {
    const typesData = await fetchStageTypes();
    internshipTypes.value = typesData;
    console.log("Provinces chargées:", internshipTypes.value); 
  } catch (error) {
    console.error("Erreur lors du chargement des type", error);
  }
  /////////////////////////////
  
//////////////////////////////////////
  try {
    const provincesData = await fetchProvinces();
    provinces.value = provincesData;
    console.log("Provinces chargées:", provinces.value); 
  } catch (error) {
    console.error("Erreur lors du chargement des provinces", error);
  }
///////////////////////////////////////////////
  
});

const offerData = ref({
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

const submitForm = async () => {
  console.log(offerData.value)
  await ajouterOffre(offerData.value);
   console.log("Offre ajoutée avec succès");

};
</script>

<style></style>
