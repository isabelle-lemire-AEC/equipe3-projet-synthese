<template>
  <div v-if="offerData">
  	<div class="form-fiche formulaire-edition-offrestages">
      <div class="form-fiche__wrapper-titre">
        <p class="form-fiche__nom-section">Offre de stage</p>
        <h1>{{ offerData.title }}</h1>
        <p class="form-fiche__sous-titre">{{ offerData.enterprise.name }}</p>
      </div>
    </div>

    <form @submit.prevent="submitForm">
      <BtnAnnulerModifierSauvegarder 
				buttonText="Mettre à jour" 
				buttonClass="bouton bouton--turquoise">
			</BtnAnnulerModifierSauvegarder>		

			<div class="form-fiche__encadre">
          <div class="form-fiche__wrapper-titre-groupe-inputs">
            <h2>Description de la tâche</h2>
            <div>
              <label for="description"></label>
              <textarea v-model="offerData.description" placeholder="Description" rows="5"></textarea>
            </div>
          </div>

          <div class="form-fiche__label-input-vertical">
            <label for="">Programme de formation</label>
            <input class="" v-model="offerData.title" type="text"/>
            <p v-if="erreurs.progForm" class="validForm">Veuillez fournir un programme de formation.</p>
          </div>
          <div class="form-fiche__label-input-vertical">
            <h4>Exigences</h4>
            <textarea name="" id="" rows="5" v-model="offerData.requiredSkills"></textarea>
            <p v-if="erreurs.exigences" class="validForm">Veuillez fournir les exigences du stage.</p>
          </div>  
          
          <div class="form-fiche__wrapper-titre-groupe-inputs">
            <h3>Informations sur le stage recherché</h3>
            <div class="form-fiche__colonnes-inputs">
                <div class="form-fiche__colonne-inputs">
                  <div class="form-fiche__label-input-vertical">
                    <label for="">Type de stage</label>
                    <select v-model="offerData.internshipType">
                        <option disable value="">Veuillez effectuer un choix</option>
                        <option v-for="internshipType in  internshipTypes" :key="internshipType._id" :value="internshipType">{{ internshipType.value }}</option>
                    </select>   
                    <p v-if="erreurs.typeDeStage" class="validForm">Veuillez fournir le type de stage.</p>               
                  </div>
                  <div class="form-fiche__label-input-vertical">
                    <label for="">Nombre d'heure par semaine</label>
                    <input id="edit-offre-heures" name="edit-offre-heures" type="number" v-model.trim="offerData.weeklyWorkHours"/>
                    <p v-if="erreurs.heuresSemaine" class="validForm">Veuillez fournir le nombre d'heures par semaine pour le stage.</p>
                  </div> 
                  <div class="form-fiche__label-input-vertical">
                    <label for="edit-offre-remuneration">Rémunération</label>
                    <div>
                      <input type="radio" id="edit-offre-discretion" name="edit-offre-remuneration" value="discretion" v-model="remunerationType" checked="checked" />
                      <label for="edit-offre-discretion" class="form-fiche__label-radio-input">À la discrétion de l'entreprise</label>
                    </div>
                    <div>
                      <input type="radio" id="edit-offre-remunere" name="edit-offre-remuneration" value="remunere" v-model="remunerationType" />
                      <label for="edit-offre-remunere" class="form-fiche__label-radio-input">Rémunéré</label>
                    </div>
                    <div>
                      <input type="radio" id="edit-offre-non-renumere" name="edit-offre-remuneration" value="non-remunere" v-model="remunerationType" />
                      <label for="edit-offre-non-renumere" class="form-fiche__label-radio-input" >Non-rémunéré</label>
                    </div>
                  </div>                                   
                </div>     
                <div class="form-fiche__colonne-inputs">
                  <div class="form-fiche__label-input-vertical">
                    <label for="edit-demande-date-debut">Date de début</label>
                    <input class="" v-model.trim="dateDebut" type="date" placeholder="Date de début" />
                    <p v-if="erreurs.dateDebut" class="validForm">Veuillez fournir une date pour le début du stage.</p>
                  </div>
                  <div class="form-fiche__label-input-vertical">
                    <label for="edit-demande-date-fin">Date de fin</label>
                    <input type="date" id="edit-demande-date-fin" name="edit-demande-date-fin" v-model.trim="dateFin" />
                    <p v-if="erreurs.dateFin" class="validForm">Veuillez fournir une date pour la fin du stage.</p>
                  </div>
                </div>                          
            </div>
            <div class="form-fiche__wrapper-titre-groupe-inputs">
              <h3>Informations supplémentaires</h3>
              <div>
                <label for="edit-demande-infos-supp"></label>
                <textarea id="edit-demande-infos-supp" name="edit-demande-infos-supp" rows="5" v-model="infoSupp"></textarea>
                <p v-if="erreurs.infoSupp" class="validForm">Veuillez fournir des l'informations supplémentaires.</p>
              </div>
            </div>
          </div>
      </div>
      
      <BtnAnnulerModifierSauvegarder 
				buttonText="Mettre à jour" 
				buttonClass="bouton bouton--turquoise">
			</BtnAnnulerModifierSauvegarder>
    </form>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';
  import { useRoute } from 'vue-router';
  import BtnAnnuler from '../components/BtnAnnuler.vue';
  import { fetchStageTypes } from '@/composables/api';
  import { useRouter } from 'vue-router';
	import BtnAnnulerModifierSauvegarder from '../components/BtnAnnulerModifierSauvegarder.vue'

  const route = useRoute();
  const { getInternshipOfferById, response, loading, error, edditerOffre } = useInternshipOffers();
  const internshipTypes = ref([]);
  const remunerationType = ref(null);
  const dateDebut = ref(null);
  const dateFin = ref(null);
  const exigences = ref(null);
  const router = useRouter();
	const formulaireValide = ref(false);
  const infoSupp = ref('');

  const offerData = ref({
    _id: "",
    title: "",
    description: "",
    enterprise: {
      _id: "",
      name: "",
      image: "",
      description: "",
      address: "",
      phone: "",
      city: "",
      email: "",
      province: { _id: "", value: "" },
      postalCode: "",
      activitySector: {
        _id: "",
        value: "",
      },
      website: ""
    },
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

  const erreurs = ref({
    description: false,
    progForm: false,
    exigences: false,
    typeDeStage: false,
    heuresSemaine: false,
    dateDebut: false,
    dateFin: false,
    infoSupp: false
  });

  const validerFormulaire = () => {
    erreurs.value.description = offerData.value.description === '',
    erreurs.value.progForm = offerData.value.title === '',
    erreurs.value.exigences = (offerData.value.requiredSkills === '' || offerData.value.requiredSkills === undefined || offerData.value.requiredSkills[0] === ''),
    erreurs.value.typeDeStage = (offerData.value.internshipType._id === '' || offerData.value.internshipType._id === undefined),
    erreurs.value.heuresSemaine = (offerData.value.weeklyWorkHours === 0 || offerData.value.weeklyWorkHours === undefined || offerData.value.weeklyWorkHours === ''),
    erreurs.value.dateDebut = offerData.value.startDate === '',
    erreurs.value.dateFin = offerData.value.endDate === '',
    erreurs.value.infoSupp = infoSupp.value === ''

    return Object.values(erreurs.value).some(err => err);
  };


  onMounted(async () => {
    await getInternshipOfferById(route.params.id);

    if (response.value.enterprise === null || response.value.enterprise === undefined) {
      response.value.enterprise = {
        _id: "",
        name: "",
        image: "",
        description: "",
        address: "",
        phone: "",
        city: "",
        email: "",
        province: { _id: "", value: "" },
        postalCode: "",
        activitySector: {
          _id: "",
          value: "",
        },
        website: ""
      }
    }
    internshipTypes.value = await fetchStageTypes();

    if (response.value) {
      const offer = response.value;

      offerData.value._id = offer._id;
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
    } else {
      console.error("Aucune réponse ou réponse vide reçue lors de la récupération des détails de l'offre de stage.");
    }
    dateDebut.value = offerData.value.startDate.substring(0, offerData.value.startDate.indexOf('T'));
		dateFin.value = offerData.value.endDate.substring(0, offerData.value.startDate.indexOf('T'));
    });

  const submitForm = async () => {
    listerExigences();
    offerData.value.startDate = dateDebut.value;
    offerData.value.endDate = dateFin.value;

    try {
      formulaireValide.value = validerFormulaire();
      if (!formulaireValide.value) {
        await edditerOffre(route.params.id, offerData.value);
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