<!-- Offre de stage AJOUT - RAPH et Caro -->

<template>
  <section class="entete">
      <h1>Offre de stage</h1>
  </section>

  <div class=" h-2/3 bg-neutral-500 felex flex-col w-96 ">

      <form  id="ajout-intern-sheep-offer" @submit.prevent="submitForm">
          
          <div class="flex">
              <button class="annuler" type="submit" @click="annulerAjout">Annuler</button> <!-- ton annuler nest pas définie raph -->
              <button class="ajout" type="submit"><i class="fas fa-save"></i>Sauvegarder</button>
          </div>

          <br style="margin: 25px 0"> </br> <!-- à enlever, juste pour clarifier les section en attente du css -->
          
          <div class="groupe-titre-entreprise">
              <div>
                  <label for="titre">Titre :</label>
                  <input v-model.trim="offerData.title" type="text" id="titre"/>
                  <p class="validForm" v-if="erreurs.title">Veuillez remplir ce champ</p>
              </div>

              <div>
                  <label for="entreprise">Entreprise :</label>
                  <select name="entreprise" id="entreprise" v-model="offerData.enterprise">
                      <option disable value="">Veuillez effectuer en choix</option>
                      <option v-for="entreprise in entreprises" :key="entreprise._id" :value="entreprise">
                          {{ entreprise.name }} 
                      </option>
                  </select>
                  <p class="validForm" v-if="erreurs.name">Veuillez effectuer un choix</p>
              </div>
          </div>

          <hr style="margin: 25px 0"> <!-- à enlever, juste pour clarifier les section en attente du css -->

          <div class="groupe-tache">
              <h2>Description de la tâche</h2>
              <label for="description"></label>
              <textarea v-model.trim="offerData.description" placeholder="description"></textarea>
              <p class="validForm" v-if="erreurs.description">Veuillez remplir ce champ</p>
          </div>

          <div class="groupe-programme">
              <label for="ajout-programme">Programme de formation</label>
              <input type="text" id="ajout-programme" v-model.trim="offerData.enterprise.activitySector">
              <p class="validForm" v-if="erreurs.activitySector">Veuillez remplir ce champ</p>
          </div>

          <div class="groupe-exigence">
              <label for="exigences">Exigences</label>
              <input v-model.trim="offerData.requiredSkills" type="text" id="exigences" placeholder="Compétences requises" />
              <p class="validForm" v-if="erreurs.requiredSkills">Veuillez remplir ce champ</p>
          </div>

          <hr style="margin: 25px 0"> <!-- à enlever, juste pour clarifier les section en attente du css -->

          <div class="groupe-info-stage">
              <h3>Informations sur le stage recherché</h3>

              <div>
                  <div>
                    <label for="ajout-type">Type de stage</label>
                    <select v-model="offerData.internshipType._id" id="ajout-type">
                        <option disable value="">Veuillez effectuer un choix</option>
                        <option v-for="internshipType in  internshipTypes" :key="internshipType._id" :value="internshipType._id">{{ internshipType.value }}</option>
                    </select>
                    <p class="validForm" v-if="erreurs.internshipType">Veuillez effectuer un choix</p>
                  </div>

                  <div> <!-- Cette section est supposer être un drop down (note de isa) -->
                    <label for="weeklyWorkHours">Nombre d'heures par semaine</label>
                    <input v-model.number="offerData.weeklyWorkHours" type="number" id="weeklyWorkHours" placeholder="Heures de travail par semaine" />
                    <p class="validForm" v-if="erreurs.weeklyWorkHours">Veuillez effectuer un choix</p>
                  </div>

                  <hr style="margin: 25px 0"> <!-- à enlever, juste pour clarifier les section en attente du css -->

                  <div>
                    <p>Rénumération</p>
                    <div>
                      <input type="checkbox" id="ajout-remuneration1" name="ajout-remuneration1" value="discuter">
                      <label for="ajout-remuneration1"> À discuter</label>
                    </div>
                    <div>
                      <input type="checkbox" id="ajout-remuneration2" name="ajout-remuneration2" value="remunere">
                      <label for="ajout-remuneration2"> Stage rémunéré</label>
                    </div>
                    <div>
                      <input type="checkbox" id="ajout-remuneration3" name="ajout-remuneration3" value="nonRemunere">
                      <label for="ajout-remuneration3"> Stage non rémunéré</label>
                    </div>
                    <p class="validForm" v-if="erreurs.salary">Veuillez effectuer un choix</p>
                    <!--<input v-model.number="offerData.salary" type="number" placeholder="Salaire" />-->
                  </div>
              </div>
              
              <hr style="margin: 25px 0"> <!-- à enlever, juste pour clarifier les section en attente du css -->

              <div>
                  <div>
                    <label for="date-debut">Date de début</label>
                    <input v-model="offerData.startDate" type="date" placeholder="Date de début" id="date-debut" />
                    <p class="validForm" v-if="erreurs.startDate">Veuillez effectuer un choix</p>
                  </div>

                  <div>
                    <label for="date-fin">Date de fin</label>
                    <input v-model="offerData.endDate" type="date" placeholder="Date de fin"  id="date-fin"/>
                    <p class="validForm" v-if="erreurs.endDate">Veuillez effectuer un choix</p>
                  </div>

                  <!-- Pourquoi ceci est là? Il n'Est pas dans la maquette.... (de isa) -->
                  <select v-model="offerData.province._id">
                      <option disabled value="">Sélectionnez une province</option>
                      <option v-for="province in provinces" :key="province._id" :value="province._id">{{ province.value }}</option>
                  </select>
              </div>
              
          </div>

          <hr style="margin: 25px 0"> <!-- à enlever, juste pour clarifier les section en attente du css -->

          <section class="info-sup">
              <h3>Informations suplémentaires</h3>
              <label for="ajout-info-sup-form"></label>
              <textarea id="ajout-info-sup-form"></textarea>
          </section>

          <hr style="margin: 25px 0"> <!-- à enlever, juste pour clarifier les section en attente du css -->

          <div>
            Ajouter ici bouton lorsque code annuler save ok
          </div>
    </form>
  </div>
</template>

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
  title: '',
  description: '',
  //est ce que l'entreprise à été transformeé en id ?
  enterprise: { _id: '' }, 
  startDate: '',
  endDate: '',
  weeklyWorkHours: 0,
  salary: 0,
  province: {  _id: '', value: '' },
  //attention ici verifier si je peux mettre plus d'un string dans le tableau de skills
  requiredSkills: [],
  internshipType: { _id: '', value: '' },
  paid: "DISCRETIONARY",
  isActive: true
  });

  // validation formulaire

  const erreurs = ref({
          title: false,
          name: false,
          description: false,
          activitySector: false,
          startDate: false,
          endDate: false,
          requiredSkills: false,
          internshipType: false,
          weeklyWorkHours: false,
          salary: false,
      });

  
  const validerFormulaire = () => {
  
      erreurs.value.title= offerData.value.title === '',
      erreurs.value.name= offerData.value.enterprise === '',
      erreurs.value.description= offerData.value.description === '',
      erreurs.value.activitySector= offerData.value.enterprise.activitySector.value === '',
      erreurs.value.startDate= offerData.value.startDate === '',
      erreurs.value.endDate= offerData.value.endDate ==='',
      erreurs.value.requiredSkills= offerData.value.requiredSkills === '',
      erreurs.value.internshipType= offerData.value.internshipType.value === '',
      erreurs.value.weeklyWorkHours= offerData.value.weeklyWorkHours === 0
      erreurs.value.salary= offerData.value.salary === 0
  
      console.log("Erreurs :", erreurs.value);
  // Vérifie s'il y a des erreurs dans le formulaire
  return Object.values(erreurs.value).some(err => err);
  };


  const formulaireValide = ref(false);

  const submitForm = async () => {
      try{
          formulaireValide.value = validerFormulaire();
          if (!formulaireValide.value) {
              await ajouterStage();
              //console.log(offerData.value)
              console.log("Offre ajoutée avec succès");
          } else {
              throw new Error("Veuillez remplir tous les champs obligatoires."); 
          }
      } catch (error) {
              console.error("Erreur lors de la soumission du formulaire :", error);
              }
  };


  const ajouterStage = async () => {
      try {
              if (validerFormulaire()) {
                  throw new Error("Veuillez remplir tous les champs obligatoires.");
              }
              console.log("Tentative d'ajout de l'offre :", offre.value);
              await ajouterOffre(offerData.value);
              console.log("Nouvelle offre ajoutée");
              router.push({ name: 'OffresStages' });
          } catch (error) {
              console.error("Erreur lors de l'ajout de l'offre de stage :", error);
          }

  
  };

  const annulerAjout = () => {
          console.log("Annuler l'ajout de l'offre");
          router.push({ name: 'OffresStages' });
  }
</script>

<style></style>