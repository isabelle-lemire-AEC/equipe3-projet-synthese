<template>
    <section class="entete">
        <h3>Offre de stage</h3>
    </section>

    <form @submit.prevent="soumettreFormulaire">

        <button type="submit" @click="annulerAjout">Annuler</button>
        <button type="submit">Sauvegarder</button>

        <div class="groupe-titre-entreprise">
            <h3>Titre:</h3>
            <input type="text" id="titre" v-model="offre.title">

            <h3>Entreprise:</h3>
            <label for="type">Veuillez effectuer un choix</label>
           
            <select name="entreprise" id="entreprise" v-model="offre.enterprise.name">
                <option value="" disabled selected>Choisir une entreprise</option>
                <option v-for="enterprise in enterprises" :key="enterprise._id" :value="enterprise.name">
                {{ enterprise.name }}
                </option>
            </select>


        </div>

        <div class="groupe-tache">
            <h1>Description de la tâche</h1>
            <textarea id="ajout-description-tache" v-model="offre.description"></textarea>
        </div>

        <div class="groupe-programme">
            <h3>Programme de formation</h3>
            <input type="text" id="ajout-programme" v-model="offre.enterprise.activitySector">
        </div>

        <div class="groupe-exigence">
            <h3>Exigences</h3>
            <textarea id="ajout-exigences" v-model="offre.requiredSkills"></textarea>
        </div>

        <div class="groupe-info-stage">
            <h3>Informations sur le stage recherché</h3>

            <div class="groupe-gauche">
                <h3>Type de stage</h3>
                <!-- test -->
                <select name="ajout-type" id="ajout-type" v-model="offre.internshipType">
                    <option value="" disabled selected>Veuillez effectuer un choix</option>
                    <option v-for="typeStage in offre" :key="typeStage._id" :value="typeStage">
                        {{ typeStage }}
                    </option>
                </select>

                <h3>Nombre d'heures par semaine</h3>
                <label for="ajout-heure">Veuillez effectuer un choix</label>
                <select name="ajout-heure" id="ajout-heure" v-model="offre.weeklyWorkHours">
                    <option value=""></option>
                </select>

                <h3>Rénumération</h3>

                <input type="checkbox" id="ajout-remuneration1" name="ajout-remuneration1" value="discuter">
                <label for="ajout-remuneration1"> À discuter</label><br>
                <input type="checkbox" id="ajout-remuneration2" name="ajout-remuneration2" value="remunere">
                <label for="ajout-remuneration2"> Stage rémunéré</label><br>
                <input type="checkbox" id="ajout-remuneration3" name="ajout-remuneration3" value="nonRemunere">
                <label for="ajout-remuneration3"> Stage non rémunéré</label>
            </div>

            <div class="groupe-droite">
                <h3>Date de début</h3>
                <input type="date" id="ajout-dateDebut" name="ajout-dateDebut">

                <h3>Date de fin</h3>
                <input type="date" id="ajout-dateFin" name="ajout-dateFin">
            </div>
        </div>

        <section class="info-sup">
            <h3>Informations suplémentaires</h3>
            <textarea id="ajout-info-sup-form"></textarea>
        </section>

    </form>


</template>

<script setup>
import { ref ,  } from 'vue';
import { useRouter } from 'vue-router';
import useInternshipOffers from '../composables/offres_stage/offreDeStage';


const router = useRouter();
const { ajouterOffre } = useInternshipOffers();
const enterprises = ref([]); // Référence pour stocker les entreprises



// Initialisation des variables pour les données du formulaire
const offre = ref({
    title: '',
    description: '',
    enterprise: {
    _id: 'test',
    image: 'test',
    name: '',
    address: 'test',
    postalCode: 'test',
    city: 'test',
    province: {
      _id: 'test',
      value: 'test '
    },
    phone: 'test',
    email: 'test',
    description: 'test',
    activitySector: {
      _id: '',
      value: ''
    },
    website: 'test'
  },
  startDate: '2024-03-19T22:14:11.398Z',
  endDate: '2024-03-19T22:14:11.398Z',
  weeklyWorkHours: 0,
  salary: 0,
  province: {
    _id: 'test',
    value: 'test'
  },
  requiredSkills: [
    ''
  ],
  internshipType: {
    _id: '',
    value: ''
  },
  paid: 'DISCRETIONARY',
  isActive: true

});




// Fonction pour ajouter un stage
const ajouterStage = async () => {
    try {
            if (!validerFormulaire()) {
                throw new Error("Veuillez remplir tous les champs obligatoires.");
            }
            console.log("Tentative d'ajout de l'offre :", offre.value);
            await ajouterOffre(offre.value);
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

const soumettreFormulaire = async () => {
        try {
            await ajouterStage();
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
}

const validerFormulaire = () => {
        if (!offre.value.title ||
            !offre.value.enterprise.name ||
            !offre.value.internshipType ||
            !offre.value.weeklyWorkHours ) {
            return false;
        }
        return true;
    }



</script>

<style>

</style>