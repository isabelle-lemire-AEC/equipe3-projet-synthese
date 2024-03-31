<template>
  	<div class="form-fiche formulaire-edition-offrestages">
      <div class="form-fiche__wrapper-titre">
        <p class="form-fiche__nom-section">Offre de stage</p>
        <h1>Intégratuer Web Junior - Hard codé </h1> <!-- <input class="" v-model="offerData.title" type="text" placeholder="Titre de l'offre" /> -->
        <p class="form-fiche__sous-titre">Nom de l'entreprise - Hard codé</p> <!-- <input class=""  v-model="offerData.enterprise.name" type="text" placeholder="entrprise" /> -->
      </div>
    </div>

    <form id="edition-offrestages" @submit.prevent="submitForm">
      <!-- Boutons annuler et mettre à jour -->
			<div class="boutons">
				<button class="bouton bouton--transparent" type="submit" @click="annulerAjout">Annuler</button>
				<button class="bouton bouton--rougeOffre" type="submit">
					<div class="icone-libelle">
						<i class="fas fa-save"></i>
						<span>Mettre à jour</span>
					</div>
				</button>
			</div>

      <!-- Section encadré encadré blanc -->
			<div class="form-fiche__encadre">
          <div class="form-fiche__wrapper-titre-groupe-inputs">
            <h2>Description de la tâche</h2>
            <div>
              <label for="description"></label>
              <textarea v-model="offerData.description" placeholder="Description" rows="5"></textarea>
            </div>
          </div>

          <!-- Section Programme et exigences -->
          <div class="form-fiche__label-input-vertical">
            <label for="">Programme de formation</label>
            <input class="" v-model="offerData.title" type="text"/>
          </div>
          <div class="form-fiche__label-input-vertical">
            <h4>Exigences</h4>
            <textarea name="" id="" rows="5"></textarea>
          </div>  
          
          <!-- Section Information sur le stage -->
          <div class="form-fiche__wrapper-titre-groupe-inputs">
            <h3>Informations sur le stage recherché</h3>
            <div class="form-fiche__colonnes-inputs">
                <!-- Colonne de gauche -->
                <div class="form-fiche__colonne-inputs">
                  <div class="form-fiche__label-input-vertical">
                    <label for="">Type de stage</label>
                    <p style="color:red">*********Doit être sélectionner selon ce qu'il y a dans la bd????</p>
                    <select v-model="offerData.internshipType._id">
                        <option disable value="">Veuillez effectuer un choix</option>
                        <option v-for="internshipType in  internshipTypes" :key="internshipType._id" :value="internshipType._id">{{ internshipType.value }}</option>
                    </select>                  
                  </div>
                  <div class="form-fiche__label-input-vertical">
                    <label for="">Nombre d'heure par semaine</label>
                    <p style="color:red">*********Doit être prérempli selon ce qu'il y a dans la bd????</p>
                    <input type="text">
                  </div> 
                  <div class="form-fiche__label-input-vertical">
                    <label for="edit-offre-remuneration">Rémunération</label>
                    <p style="color: red;">**** Il faudrait que ce soit ce qui est enregistrer dans la BD qui soit séclectionner par défaut</p>
                    <div>
                      <input type="radio" id="edit-offre-discretion1" name="edit-offre-remuneration1" value="discretion" v-model="remunerationType" checked="checked" />
                      <label for="edit-offre-discretion" class="form-fiche__label-radio-input">À la discrétion de l'entreprise</label>
                    </div>
                    <div>
                      <input type="radio" id="edit-offre-remunere2" name="edit-offre-remuneration2" value="remunere" v-model="remunerationType" />
                      <label for="edit-offre-remunere" class="form-fiche__label-radio-input">Rémunéré</label>
                    </div>
                    <div>
                      <input type="radio" id="edit-offre-non-renumere3" name="edit-offre-remuneration3" value="non-remunere" v-model="remunerationType" />
                      <label for="edit-offre-non-renumere" class="form-fiche__label-radio-input" >Non-rémunéré</label>
                    </div>
                  </div>                                   
                </div>     
                <!-- Colonne de droite -->
                <div class="form-fiche__colonne-inputs">
                  <div class="form-fiche__label-input-vertical">
                    <label for="edit-demande-date-debut">Date de début</label>
                    <p style="color:red">*********Doit être prérempli selon ce qu'il y a dans la bd????</p>
                    <input class="" v-model="offerData.startDate" type="date" placeholder="Date de début" />
                  </div>
                  <div class="form-fiche__label-input-vertical">
                    <label for="edit-demande-date-fin">Date de fin</label>
                    <p style="color:red">*********Doit être prérempli selon ce qu'il y a dans la bd????</p>
                    <input type="date" id="edit-demande-date-fin" name="edit-demande-date-fin" v-model.trim="dateFin" />
                  </div>
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
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useInternshipOffers } from '../composables/offres_stage/offreDeStage';
  import { useRoute } from 'vue-router';

  // import { useEntreprise } from '../composables/offres_stage/stageEntreprise';
  // import { fetchProvinces, fetchStageTypes, fetchInternshipOffers } from '../composables/api';
  // const { supprimerOffre } = useInternshipOffers();

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