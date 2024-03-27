<!-- Offre de stage AJOUT - RAPH et Caro -->

<template>
    <section class="entete">
        <h3>Offre de stage</h3>
    </section>

    <div>
      <form  id="ajout-intern-sheep-offer" @submit.prevent="submitForm">
                
          <!-- ton annuler nest pas définie raph -->
            <button class="annuler" type="submit" @click="annulerAjout">Annuler</button>
            <button class="ajout" type="submit"><i class="fas fa-save"></i>Sauvegarder</button>
            
            <div class="groupe-titre-entreprise">

                <label for="titreOffre">Titre:</label>
                <input v-model.trim="offerData.title" id="titreOffre" type="text" placeholder="Titre de l'offre" />
                

                
                <label for="nomEntrepriseOffre">Entreprise:</label>

                <select v-model="offerData.enterprise" id="nomEntrepriseOffre" >
                    <option disabled value="">Sélectionnez une entreprise</option>
                    <option v-for="entreprise in entreprises" :key="entreprise._id" :value="entreprise">
                        {{ entreprise.name }} 
                    </option>
                </select>
                
            </div>

            <div class="groupe-tache">
                <label for="descriptionOffre">Description de la tâche</label>
                <textarea v-model.trim="offerData.description" id="descriptionOffre" placeholder="Description"></textarea>
               
            </div>

            <div class="groupe-programme">
                <label for="ajout-programme">Programme de formation</label>
                <input type="text" id="ajout-programme" v-model.trim="offerData.enterprise.activitySector">
                
            </div>

            <div class="groupe-exigence">
                <label for="exigence">Exigences</label>
                <input v-model.trim="offerData.requiredSkills" id="exigence" type="text" placeholder="Compétences requises" />
                
            </div>


            <div class="groupe-info-stage">
                <h3>Informations sur le stage recherché</h3>

                <div>
                    <label for="ajout-type">Type de stage</label>
                    <select v-model="offerData.internshipType._id">
                        <option disable value="">Veuillez effectuer un choix</option>
                        <option v-for="internshipType in  internshipTypes" :key="internshipType._id" :value="internshipType._id">{{ internshipType.value }}</option>
                    </select>
                    

                   
                    <label for="weeklyWorkHours">Nombre d'heures par semaine</label>
                    <input v-model.number="offerData.weeklyWorkHours" type="number" placeholder="Heures de travail par semaine" />
                    
                
                    <label for="ajout-remuneration">Rénumération</label>
                    <input type="checkbox" id="ajout-remuneration1" name="ajout-remuneration1" value="discuter">
                    <label for="ajout-remuneration1"> À discuter</label><br>
                    <input type="checkbox" id="ajout-remuneration2" name="ajout-remuneration2" value="remunere">
                    <label for="ajout-remuneration2"> Stage rémunéré</label><br>
                    <input type="checkbox" id="ajout-remuneration3" name="ajout-remuneration3" value="nonRemunere">
                    <label for="ajout-remuneration3"> Stage non rémunéré</label>
                    
                    
                    <!--<input v-model.number="offerData.salary" type="number" placeholder="Salaire" />-->
                </div>

                <div>
                    <label for="offreDateDebut">Date de début</label>
                    <input v-model="offerData.startDate" id="offreDateDebut" type="date" placeholder="Date de début" />
                    

                    <label for="offreDateFin">Date de fin</label>
                    <input v-model="offerData.endDate" id="offreDateFin" type="date" placeholder="Date de fin" />
                    
                    <label for="offreProvince">Province</label>
                    <select v-model="offerData.province._id">
                        <option disabled value="">Sélectionnez une province</option>
                        <option v-for="province in provinces" :key="province._id" :value="province._id">{{ province.value }}</option>
                    </select>
                </div>
                
            </div>

            <section class="info-sup">
                <label for="ajout-info-sup-form">Informations suplémentaires</label>
                <textarea id="ajout-info-sup-form"></textarea>
            </section>


        <!--<button class="p-4 bg-red-400 rounded-lg mx-4" type='submit'>Ajouter offre</button>-->
      </form>
    </div>
</template>

<!-- //raph/Joe & caro  -->
<script setup>

    import { ref, onMounted } from 'vue';
    import { useEntreprise } from '../composables/offres_stage/stageEntreprise';
    import { fetchProvinces } from '@/composables/api';
    import { fetchStageTypes } from '@/composables/api';
    import { useRouter } from 'vue-router';

    // type RAPH***
    import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';

    const router = useRouter();
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


<!-- // onMounted(async () => {
//     ////////////////////////
//     const entreprisesData = await getAllEntreprises();
//     entreprises.value = entreprisesData.data;
//     if (entreprisesResponse.value && Array.isArray(entreprisesResponse.value)){
//         entreprises.value = entreprisesResponse.value;
//         console.log("Entreprises chargées:", entreprises.value); 
//     } else {
//         console.error("La réponse n'est pas un tableau:", entreprisesResponse.value);
//     } -->
