<template>
    <section class="entete">
        <h3>Offre de stage</h3>
    </section>

    <form @submit.prevent="ajouterStage">

        <button>Annuler</button>
        <button>Sauvegarder</button>

        <div class="groupe-titre-entreprise">
            <h3>Titre:</h3>
            <input type="text" id="titre">

            <h3>Entreprise:</h3>
            <label for="type">Veuillez effectuer un choix</label>
            <select name="entreprise" id="entreprise">
                <option value=""></option>
            </select>
        </div>

        <div class="groupe-tache">
            <h1>Description de la tâche</h1>
            <textarea id="ajout-description-tache"></textarea>
        </div>

        <div class="groupe-programme">
            <h3>Programme de formation</h3>
            <input type="text" id="ajout-programme">
        </div>

        <div class="groupe-exigence">
            <h3>Exigences</h3>
            <textarea id="ajout-exigences"></textarea>
        </div>

        <div class="groupe-info-stage">
            <h3>Informations sur le stage recherché</h3>

            <div class="groupe-gauche">
                <h3>Type de stage</h3>
                <label for="ajout-type">Veuillez effectuer un choix</label>
                <select name="ajout-type" id="ajout-type">
                    <option value=""></option>
                </select>

                <h3>Nombre d'heures par semaine</h3>
                <label for="ajout-heure">Veuillez effectuer un choix</label>
                <select name="ajout-heure" id="ajout-heure">
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
import { ref } from 'vue';
import useInternshipOffers from '../composables/offres_stage/offreDeStage';

// Initialisation des variables pour les données du formulaire
const titre = ref('');
const entreprise = ref('');
const descriptionTache = ref('');
const programmeFormation = ref('');
const exigences = ref('');
const typeStage = ref('');
const heuresSemaine = ref('');
const remuneration = ref('');
const dateDebut = ref('');
const dateFin = ref('');
const infoSupplementaires = ref('');

// Import du composable
const { ajouterOffre } = useInternshipOffers();

// Fonction pour ajouter un stage
const ajouterStage = async () => {
  const offerData = {
    titre: titre.value,
    entreprise: entreprise.value,
    descriptionTache: descriptionTache.value,
    programmeFormation: programmeFormation.value,
    exigences: exigences.value,
    typeStage: typeStage.value,
    heuresSemaine: heuresSemaine.value,
    remuneration: remuneration.value,
    dateDebut: dateDebut.value,
    dateFin: dateFin.value,
    infoSupplementaires: infoSupplementaires.value,
  };

  // Appel de la fonction ajouterOffre du composable avec les données du formulaire
  await ajouterOffre(offerData);

  // Réinitialisation des champs du formulaire après l'ajout
  resetFormData();
};

// Fonction pour réinitialiser les données du formulaire
const resetFormData = () => {
  titre.value = '';
  entreprise.value = '';
  descriptionTache.value = '';
  programmeFormation.value = '';
  exigences.value = '';
  typeStage.value = '';
  heuresSemaine.value = '';
  remuneration.value = '';
  dateDebut.value = '';
  dateFin.value = '';
  infoSupplementaires.value = '';
};

</script>

<style>

</style>