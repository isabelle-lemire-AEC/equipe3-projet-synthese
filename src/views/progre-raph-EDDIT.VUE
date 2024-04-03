<template>
    <div v-if="offerData">
        <div class="form-fiche formulaire-edition-offrestages">
        <div class="form-fiche__wrapper-titre">
          <p class="form-fiche__nom-section">Offre de stage</p>
          <h1>{{ offerData.title }}</h1>
          <p class="form-fiche__sous-titre">{{ offerData.enterprise.name }}</p>
        </div>
      </div>
  
      <!-- <div class="boutons">
        <BtnAnnuler></BtnAnnuler>
        <button class="bouton bouton--rougeOffre" @click="submitForm()">
          <div class="icone-libelle">
            <i class="fas fa-save"></i>
            <span>Mettre à jour</span>
          </div>
        </button>
      </div> -->
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
            </div>
            <div class="form-fiche__label-input-vertical">
              <h4>Exigences</h4>
              <textarea name="" id="" rows="5" v-model="offerData.requiredSkills"></textarea>
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
                    </div>
                    <div class="form-fiche__label-input-vertical">
                      <label for="">Nombre d'heure par semaine</label>
                      <input id="edit-offre-heures" name="edit-offre-heures" type="number" v-model.trim="offerData.weeklyWorkHours"/>
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
                    </div>
                    <div class="form-fiche__label-input-vertical">
                      <label for="edit-demande-date-fin">Date de fin</label>
                      <input type="date" id="edit-demande-date-fin" name="edit-demande-date-fin" v-model.trim="dateFin" />
                    </div>
                  </div>                          
              </div>
              <div class="form-fiche__wrapper-titre-groupe-inputs">
                <h3>Informations supplémentaires</h3>
                <div>
                  <label for="edit-demande-infos-supp"></label>
                  <textarea id="edit-demande-infos-supp" name="edit-demande-infos-supp" rows="5" v-model="offerData.additionalInformation"></textarea>
                </div>
              </div>
            </div>
        </div>
        
        <BtnAnnulerModifierSauvegarder 
                  buttonText="Mettre à jour" 
                  buttonClass="bouton bouton--turquoise">
              </BtnAnnulerModifierSauvegarder>
      </form>
      <!-- <div class="boutons">
        <button class="bouton bouton--transparent" @click="annulerAjout">Annuler</button>
        <button class="bouton bouton--rougeOffre" @click="submitForm()">
          <div class="icone-libelle">
            <i class="fas fa-save"></i>
            <span>Mettre à jour</span>
          </div>
        </button>
      </div>  -->
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
  
    onMounted(async () => {
      await getInternshipOfferById(route.params.id);
      console.log("response: ", response);
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
      await edditerOffre(route.params.id, offerData.value);
      router.push({name: "OffresStages"});
    };
  
  
    const listerExigences = () => {
      exigences.value = offerData.value.requiredSkills.toString();
      exigences.value = exigences.value.replace(/ /g,'');
      offerData.value.requiredSkills = exigences.value.split(',');
    }
  
  </script> 