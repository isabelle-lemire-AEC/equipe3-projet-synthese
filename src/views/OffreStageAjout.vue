<!-- Offre de stage AJOUT - RAPH et Caro -->
<template>
      <div class="form-fiche formulaire-ajout-offrestages" v-if="offre">
        <div class="form-fiche__wrapper-titre">
          <h1>Offre de stage</h1>
        </div>
      </div>

      <form id="ajout-demandestages" @submit.prevent="soumettreFormulaire">
            <!-- Boutons annuler et mettre à jour -->
            <div class="boutons">
                <button class="bouton bouton--transparent" type="submit">Annuler</button>
                <button class="bouton bouton--turquoise" type="submit">
                    <div class="icone-libelle">
                        <i class="fas fa-save"></i>
                        <span>Sauvegarder</span>
                    </div>
                </button>
            </div>      
      </form>




</template>

<!-- //raph/Joe & caro  -->
<script setup>

    import { ref, onMounted } from 'vue';

    // Probleme ligne 114 et ligne 
    import { useEntreprise } from '../composables/offres_stage/stageEntreprise';
    import { fetchProvinces } from '@/composables/api';
    import { fetchStageTypes } from '@/composables/api';
    import { useRouter } from 'vue-router';

    // type RAPH***
    import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';

    const router = useRouter();
    const { ajouterOffre } = useInternshipOffers();
    const { getAllEntreprises, response: entreprisesResponse, error: entreprisesError} = useEntreprise();

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
  isActive: false
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
