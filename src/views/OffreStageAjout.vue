<!-- Offre de stage AJOUT -->
<template>
      <div class="form-fiche formulaire-ajout-offrestages">
        <div class="form-fiche__wrapper-titre">
          <h1>Offre de stage</h1>
        </div>
      </div>

      <form id="ajout-offrestages" @submit.prevent="submitForm">
            
        		<!-- Boutons annuler et mettre à jour -->
            <BtnAnnulerModifierSauvegarder 
              buttonText="Sauvegarder" 
              buttonClass="bouton bouton--rougeOffre">
            </BtnAnnulerModifierSauvegarder>

            <!-- Section titre -->
            <div class="form-fiche__input-hors-encadre">
              <div class="form-fiche__label-input-horizontal">
                <label for="titreOffre">Titre :</label>
                <input v-model.trim="offerData.title" id="titreOffre" type="text"/>
                <p v-if="erreurs.titre" class="validForm error-message">Veuillez remplir ce champs.</p>
              </div>
            </div>  
            <!-- Section Entreprise -->
            <div class="form-fiche__input-hors-encadre">
              <div class="form-fiche__label-input-horizontal">
                <label for="titreOffre">Entreprise :</label>
                <select v-model="offerData.enterprise" id="nomEntrepriseOffre" >
                    <option value="">Sélectionnez une entreprise</option>
                    <option v-for="entreprise in entreprises" :key="entreprise._id" :value="entreprise">
                        {{ entreprise.name }} 
                    </option>
                </select>
                <p v-if="erreurs.entreprise" class="validForm error-message">Veuillez effectuer un choix.</p>
              </div>
            </div>
            
            <!-- Section encadré encadré blanc -->
            <div class="form-fiche__encadre">
              <div class="form-fiche__wrapper-titre-groupe-inputs">
                <h2>Description de la tâche</h2>
                <div>
                  <label for="descriptionOffre"></label>
                  <textarea v-model.trim="offerData.description" id="descriptionOffre" rows="5"></textarea>
                  <p v-if="erreurs.description" class="validForm error-message">Veuillez remplir ce champs.</p>
                </div>
              </div>              

            <!-- Section Programme et exigences -->
            <div class="form-fiche__label-input-vertical">
              <label for="">Programme de formation</label>
              <input type="text" id="ajout-programme" v-model="progForm">
              <p v-if="erreurs.progForm" class="validForm error-message">Veuillez remplir ce champs.</p>
            </div>
            <div class="form-fiche__label-input-vertical">
              <h4>Exigences</h4>
              <textarea v-model.trim="offerData.requiredSkills" id="exigence" type="text" rows="5"></textarea>
              <p v-if="erreurs.exigences" class="validForm error-message">Veuillez remplir ce champs.</p>
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
                    <p v-if="erreurs.typeDeStage" class="validForm error-message">Veuillez effectuer un choix</p>
                  </div>
                  <div class="form-fiche__label-input-vertical">
                    <label for="">Nombre d'heure par semaine</label>
                    <input v-model.number="offerData.weeklyWorkHours" type="number"/>
                    <p v-if="erreurs.heuresSemaine" class="validForm error-message">Veuillez remplir ce champs.</p>
                  </div> 
                  <div class="form-fiche__label-input-vertical">
                    <label for="ajout-offre-remuneration">Rémunération</label>
                    <div>
                      <input type="radio" id="ajout-offre-discretion" name="ajout-offre-remuneration" value="DISCRETIONARY" v-model="offerData.paid" checked />
                      <label for="ajout-offre-discretion" class="form-fiche__label-radio-input">À la discrétion de l'entreprise</label>
                    </div>
                    <div>
                      <input type="radio" id="ajout-offre-remunere" name="ajout-offre-remuneration" value="PAID" v-model="offerData.paid" />
                      <label for="ajout-offre-remunere" class="form-fiche__label-radio-input">Rémunéré</label>
                    </div>
                    <div>
                      <input type="radio" id="ajout-offre-non-renumere" name="ajout-offre-remuneration" value="UNPAID" v-model="offerData.paid" />
                      <label for="ajout-offre-non-renumere" class="form-fiche__label-radio-input" >Non-rémunéré</label>
                    </div>
                  </div>                   
                </div> 
                 
                <!-- Colonne de droite -->
                <div class="form-fiche__colonne-inputs">
                  <div class="form-fiche__label-input-vertical">
                    <label for="ajout-demande-date-debut">Date de début</label>
                    <input v-model="offerData.startDate" id="ajout-demande-date-debut" type="date"/>
                    <p v-if="erreurs.dateDebut" class="validForm error-message">Veuillez effectuer un choix</p>
                  </div>
                  <div class="form-fiche__label-input-vertical">
                    <label for="ajout-demande-date-fin">Date de fin</label>
                    <input v-model="offerData.endDate" id="ajout-demande-date-fin" type="date"/>
                    <p v-if="erreurs.dateFin" class="validForm error-message">Veuillez effectuer un choix</p>
                  </div>
                </div>    
                <div class="form-fiche__label-input-vertical">
         
                <label for="offreProvince">Province</label>
                <select v-model="offerData.province">
                    <option disabled value="">Sélectionnez une province</option>
                    <option v-for="province in provinces" :key="province._id" :value="province">{{ province.value }}</option>
                </select>     
                <p v-if="erreurs.province" class="validForm error-message">Veuillez effectuer un choix</p>
                </div>           
              </div>

              <!-- Section infos supplémentaires -->
              <div class="form-fiche__wrapper-titre-groupe-inputs">
                <h3>Informations supplémentaires</h3>
                <div>
                  <label for="edit-demande-infos-supp"></label>
                  <textarea id="edit-demande-infos-supp" name="edit-demande-infos-supp" rows="5" v-model="infoSupp"></textarea>
                  <p v-if="erreurs.infoSupp" class="validForm error-message">Veuillez remplir ce champs.</p>
                </div>
              </div>
            </div> 
          </div>  
          
          <!-- Boutons annuler et mettre à jour -->
          <BtnAnnulerModifierSauvegarder 
            buttonText="Sauvegarder" 
            buttonClass="bouton bouton--rougeOffre">
          </BtnAnnulerModifierSauvegarder>
        </form>

</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useEntreprise } from '../composables/offres_stage/stageEntreprise';
  import { fetchProvinces } from '@/composables/api';
  import { fetchStageTypes } from '@/composables/api';
  import { useRouter } from 'vue-router';
  import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';
	import BtnAnnulerModifierSauvegarder from '../components/BtnAnnulerModifierSauvegarder.vue'

  const router = useRouter();
  const { ajouterOffre } = useInternshipOffers();
  const { getAllEntreprises, response: entreprisesResponse, error: entreprisesError} = useEntreprise();
  // const remunerationType = ref('DISCRETIONARY');
  const entreprises = ref([]);
  const provinces = ref([]);
  const internshipTypes = ref([]);
  const exigences = ref('');
  const progForm = ref('');
  const infoSupp = ref('');
	const formulaireValide = ref(false);
  

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
    enterprise: { _id: "" }, 
    startDate: "",
    endDate: "",
    weeklyWorkHours: 0,
    salary: 0,
    province: { _id: "" },
    requiredSkills: [],
    internshipType: { _id: "" },
    paid: "DISCRETIONARY",
    isActive: false
  });

  const erreurs = ref({
    titre: false,
    entreprise: false,
    description: false,
    progForm: false,
    exigences: false,
    typeDeStage: false,
    heuresSemaine: false,
    dateDebut: false,
    dateFin: false,
    province: false,
    infoSupp: false
  });

  const validerFormulaire = () => {
    erreurs.value.titre = offerData.value.title === '',
    erreurs.value.entreprise = (offerData.value.enterprise._id === '' || offerData.value.enterprise._id === undefined),
    erreurs.value.description = offerData.value.description === '',
    erreurs.value.progForm = progForm.value === '',
    erreurs.value.exigences = (offerData.value.requiredSkills === '' || offerData.value.requiredSkills === undefined || offerData.value.requiredSkills[0] === ''),
    erreurs.value.typeDeStage = (offerData.value.internshipType._id === '' || offerData.value.internshipType._id === undefined),
    erreurs.value.heuresSemaine = (offerData.value.weeklyWorkHours === 0 || offerData.value.weeklyWorkHours === undefined || offerData.value.weeklyWorkHours === ''),
    erreurs.value.dateDebut = offerData.value.startDate === '',
    erreurs.value.dateFin = offerData.value.endDate === '',
    erreurs.value.province = offerData.value.province._id === '',
    erreurs.value.infoSupp = infoSupp.value === ''

    return Object.values(erreurs.value).some(err => err);
  };

  const submitForm = async () => {
    // console.log("remunerationType: ", remunerationType);
    listerExigences();

    try {
      formulaireValide.value = validerFormulaire();
      if (!formulaireValide.value) {
        await ajouterOffre(offerData.value);
        console.log("Offre ajoutée avec succès");
        router.push({name: "OffresStages"});
      } else {
				throw new Error("Veuillez remplir tous les champs obligatoires.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }

  };

  const listerExigences = () => {
    exigences.value = offerData.value.requiredSkills.toString();
    exigences.value = exigences.value.replace(/ /g,'');
    offerData.value.requiredSkills = exigences.value.split(',');
  }

</script>

<style></style>