<!-- Offre de stage AJOUT - RAPH et Caro -->
<template>
      <div class="form-fiche formulaire-ajout-offrestages">
        <div class="form-fiche__wrapper-titre">
          <h1>Offre de stage</h1>
        </div>
      </div>

      <!-- Boutons annuler et mettre à jour -->
      <div class="boutons">
        <BtnAnnuler></BtnAnnuler>
          <button class="bouton bouton--rougeOffre" @click="submitForm()">
              <div class="icone-libelle">
                  <i class="fas fa-save"></i>
                  <span>Sauvegarder</span>
              </div>
          </button>
      </div>  
      <form id="ajout-offrestages" @submit.prevent="soumettreFormulaire">
            
            <!-- Section titre -->
            <div class="form-fiche__input-hors-encadre">
              <div class="form-fiche__label-input-horizontal">
                <label for="titreOffre">Titre :</label>
                <input v-model.trim="offerData.title" id="titreOffre" type="text"/>
              </div>
            </div>  
            <!-- Section Entreprise -->
            <div class="form-fiche__input-hors-encadre">
              <div class="form-fiche__label-input-horizontal">
                <label for="titreOffre">Entreprise :</label>
                <select v-model="offerData.enterprise" id="nomEntrepriseOffre" >
                    <option disabled value="">Sélectionnez une entreprise</option>
                    <option v-for="entreprise in entreprises" :key="entreprise._id" :value="entreprise">
                        {{ entreprise.name }} 
                    </option>
                </select>
              </div>
            </div>
            
            <!-- Section encadré encadré blanc -->
            <div class="form-fiche__encadre">
              <div class="form-fiche__wrapper-titre-groupe-inputs">
                <h2>Description de la tâche</h2>
                <div>
                  <label for="descriptionOffre"></label>
                  <textarea v-model.trim="offerData.description" id="descriptionOffre" rows="5"></textarea>
                </div>
              </div>              

            <!-- Section Programme et exigences -->
            <div class="form-fiche__label-input-vertical">
              <label for="">Programme de formation</label>
              <input type="text" id="ajout-programme">
            </div>
            <div class="form-fiche__label-input-vertical">
              <h4>Exigences</h4>
              <textarea v-model.trim="offerData.requiredSkills" id="exigence" type="text" rows="5"></textarea>
            </div>  
            
            <!-- Section Information sur le stage -->
            <div class="form-fiche__wrapper-titre-groupe-inputs">
              <h3>Informations sur le stage recherché</h3>
              <div class="form-fiche__colonnes-inputs">
                <!-- Colonne de gauche -->
                <div class="form-fiche__colonne-inputs">
                  <div class="form-fiche__label-input-vertical">
                    <label for="">Type de stage</label>
                    <select v-model="offerData.internshipType._id">
                        <option disable value="">Veuillez effectuer un choix</option>
                        <option v-for="internshipType in  internshipTypes" :key="internshipType._id" :value="internshipType._id">{{ internshipType.value }}</option>
                    </select>
                  </div>
                  <div class="form-fiche__label-input-vertical">
                    <label for="">Nombre d'heure par semaine</label>
                    <input v-model.number="offerData.weeklyWorkHours" type="number"/>
                  </div> 
                  <div class="form-fiche__label-input-vertical">
                    <label for="ajout-offre-remuneration">Rémunération</label>
                    <div>
                      <input type="radio" id="ajout-offre-discretion" name="ajout-offre-remuneration" value="discretion" v-model="remunerationType" checked="checked" />
                      <label for="ajout-offre-discretion" class="form-fiche__label-radio-input">À la discrétion de l'entreprise</label>
                    </div>
                    <div>
                      <input type="radio" id="ajout-offre-remunere" name="ajout-offre-remuneration" value="remunere" v-model="remunerationType" />
                      <label for="ajout-offre-remunere" class="form-fiche__label-radio-input">Rémunéré</label>
                    </div>
                    <div>
                      <input type="radio" id="ajout-offre-non-renumere" name="ajout-offre-remuneration" value="non-remunere" v-model="remunerationType" />
                      <label for="ajout-offre-non-renumere" class="form-fiche__label-radio-input" >Non-rémunéré</label>
                    </div>
                  </div>                   
                </div> 
                 
                <!-- Colonne de droite -->
                <div class="form-fiche__colonne-inputs">
                  <div class="form-fiche__label-input-vertical">
                    <label for="ajout-demande-date-debut">Date de début</label>
                    <input v-model="offerData.startDate" id="ajout-demande-date-debut" type="date"/>
                  </div>
                  <div class="form-fiche__label-input-vertical">
                    <label for="ajout-demande-date-fin">Date de fin</label>
                    <input v-model="offerData.endDate" id="ajout-demande-date-fin" type="date"/>
                  </div>
                </div>    
                <div class="form-fiche__label-input-vertical">
         
                <label for="offreProvince">Province</label>
                <select v-model="offerData.province">
                    <option disabled value="">Sélectionnez une province</option>
                    <option v-for="province in provinces" :key="province._id" :value="province">{{ province.value }}</option>
                </select>     
                </div>           
              </div>

              <!-- Section infos supplémentaires -->
              <div class="form-fiche__wrapper-titre-groupe-inputs">
                <h3>Informations supplémentaires</h3>
                <div>
                  <label for="edit-demande-infos-supp"></label>
                  <textarea id="edit-demande-infos-supp" name="edit-demande-infos-supp" rows="5"></textarea>
                </div>
              </div>

            </div> 
          </div>  

          
        </form>
        <!-- Boutons annuler et mettre à jour -->
        <div class="boutons">
            <button class="bouton bouton--transparent">Annuler</button>
            <button class="bouton bouton--rougeOffre" @click="submitForm()">
                <div class="icone-libelle">
                    <i class="fas fa-save"></i>
                    <span>Sauvegarder</span>
                </div>
            </button>
        </div>            




</template>

<!-- //raph/Joe & caro  -->
<script setup>

    import { ref, onMounted } from 'vue';

    // Probleme ligne 114 et ligne 
    import { useEntreprise } from '../composables/offres_stage/stageEntreprise';
    import { fetchProvinces } from '@/composables/api';
    import { fetchStageTypes } from '@/composables/api';
    import { useRouter } from 'vue-router';
    import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';

    import BtnAnnuler from '../components/BtnAnnuler.vue';

    const router = useRouter();
    const { ajouterOffre } = useInternshipOffers();
    const { getAllEntreprises, response: entreprisesResponse, error: entreprisesError} = useEntreprise();
    const remunerationType = ref(null);

    const entreprises = ref([]);
    const provinces = ref([]);
    const internshipTypes = ref([]);

    // type RAPH***

onMounted(async () => {
  const entreprisesData = await getAllEntreprises();
  entreprises.value = entreprisesData.data;

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
    const provincesData = await fetchProvinces();
    provinces.value = provincesData;
    console.log("Provinces chargées:", provinces.value); 
  } catch (error) {
    console.error("Erreur lors du chargement des provinces", error);
  }
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
  router.push({name: "OffresStages"});

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
