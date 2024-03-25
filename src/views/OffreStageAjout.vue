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
                <h3>Titre:</h3>

                <input v-model.trim="offerData.title" type="text" placeholder="Titre de l'offre" />
                <p class="validForm" v-if="erreurs.title">Veuillez remplir ce champ</p>

                <h3>Entreprise:</h3>
                <label for="type">Veuillez effectuer un choix</label>

                <select v-model="offerData.enterprise">
                    <option disabled value="">Sélectionnez une entreprise</option>
                    <option v-for="entreprise in entreprises" :key="entreprise._id" :value="entreprise">
                        {{ entreprise.name }} 
                    </option>
                </select>
                <p class="validForm" v-if="erreurs.name">Veuillez effectuer un choix</p>
            </div>

            <div class="groupe-tache">
                <h1>Description de la tâche</h1>
                <textarea v-model.trim="offerData.description" placeholder="Description"></textarea>
                <p class="validForm" v-if="erreurs.description">Veuillez remplir ce champ</p>
            </div>

            <div class="groupe-programme">
                <h3>Programme de formation</h3>
                <input type="text" id="ajout-programme" v-model.trim="offerData.enterprise.activitySector">
                <p class="validForm" v-if="erreurs.activitySector">Veuillez remplir ce champ</p>
            </div>

            <div class="groupe-exigence">
                <h3>Exigences</h3>
                <input v-model.trim="offerData.requiredSkills" type="text" placeholder="Compétences requises" />
                <p class="validForm" v-if="erreurs.requiredSkills">Veuillez remplir ce champ</p>
            </div>


            <div class="groupe-info-stage">
                <h3>Informations sur le stage recherché</h3>

                <div>
                    <h3>Type de stage</h3>
                    <label for="ajout-type">Veuillez effectuer un choix</label>
                    <select v-model="offerData.internshipType._id">
                        <option disable value="">select Type temps plein ou partiel</option>
                        <option v-for="internshipType in  internshipTypes" :key="internshipType._id" :value="internshipType._id">{{ internshipType.value }}</option>
                    </select>
                    <p class="validForm" v-if="erreurs.internshipType">Veuillez effectuer un choix</p>

                    <h3>Nombre d'heures par semaine</h3>
                    <label for="weeklyWorkHours">Heures de travail par semaine :</label>
                    <input v-model.number="offerData.weeklyWorkHours" type="number" placeholder="Heures de travail par semaine" />
                    <p class="validForm" v-if="erreurs.weeklyWorkHours">Veuillez effectuer un choix</p>
                
                    <h3>Rénumération</h3>
                    <input type="checkbox" id="ajout-remuneration1" name="ajout-remuneration1" value="discuter">
                    <label for="ajout-remuneration1"> À discuter</label><br>
                    <input type="checkbox" id="ajout-remuneration2" name="ajout-remuneration2" value="remunere">
                    <label for="ajout-remuneration2"> Stage rémunéré</label><br>
                    <input type="checkbox" id="ajout-remuneration3" name="ajout-remuneration3" value="nonRemunere">
                    <label for="ajout-remuneration3"> Stage non rémunéré</label>
                    <label for="Salaire">Salaire / semaine; </label>
                    <p class="validForm" v-if="erreurs.salary">Veuillez effectuer un choix</p>
                    <!--<input v-model.number="offerData.salary" type="number" placeholder="Salaire" />-->
                </div>

                <div>
                    <h3>Date de début</h3>
                    <input v-model="offerData.startDate" type="date" placeholder="Date de début" />
                    <p class="validForm" v-if="erreurs.startDate">Veuillez effectuer un choix</p>

                    <h3>Date de fin</h3>
                    <input v-model="offerData.endDate" type="date" placeholder="Date de fin" />
                    <p class="validForm" v-if="erreurs.endDate">Veuillez effectuer un choix</p>

                    <select v-model="offerData.province._id">
                        <option disabled value="">Sélectionnez une province</option>
                        <option v-for="province in provinces" :key="province._id" :value="province._id">{{ province.value }}</option>
                    </select>
                </div>
                
            </div>

            <section class="info-sup">
                <h3>Informations suplémentaires</h3>
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
        erreurs.value.title = !offerData.value.title || offerData.value.title === '';
        erreurs.value.name = !offerData.value.enterprise || !offerData.value.enterprise._id || offerData.value.enterprise._id === '';
        erreurs.value.description = !offerData.value.description || offerData.value.description === '';
        erreurs.value.activitySector = !offerData.value.enterprise || !offerData.value.enterprise.activitySector || !offerData.value.enterprise.activitySector.value || offerData.value.enterprise.activitySector.value === '';
        erreurs.value.startDate = !offerData.value.startDate || offerData.value.startDate === '';
        erreurs.value.endDate = !offerData.value.endDate || offerData.value.endDate === '';
        erreurs.value.requiredSkills = !offerData.value.requiredSkills || offerData.value.requiredSkills === '';
        erreurs.value.internshipType = !offerData.value.internshipType || !offerData.value.internshipType._id || offerData.value.internshipType._id === '';
        erreurs.value.weeklyWorkHours = !offerData.value.weeklyWorkHours || offerData.value.weeklyWorkHours === 0;
        erreurs.value.salary = !offerData.value.salary || offerData.value.salary === 0;

        console.log("Valeurs du formulaire :", offerData.value);
        console.log("Erreurs détectées :", erreurs.value);

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
                console.log("Tentative d'ajout de l'offre :", offerData.value);
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
