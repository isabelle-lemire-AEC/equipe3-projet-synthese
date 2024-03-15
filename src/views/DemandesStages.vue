<template>
    <div class="pageContainer">
        <h1>Demandes de stage</h1>
        <button class="ajouterDemande">Ajouter une demande</button>
        <div class="listeStages">
            <div class="listeStagesHeader">
                <span>Poste</span>
                <span>Secteur d'activité</span>
                <span>Région</span>
                <span>Date d'inscription</span>
            </div>
            <ElementListeStage :stage="stagiere1"></ElementListeStage>
            <ElementListeStage :stage="stagiere2"></ElementListeStage>
            <ElementListeStage :stage="stagiere3"></ElementListeStage>
        </div>
    </div>
</template>

<script setup>
import ElementListeStage from '../components/elementListeStage.vue'

// Les stagières ont été créé à des fins de tests
const stagiere1 = {
    actif: "1",
    poste: "Programmeur",
    nom: "Robert Thibeault",
    secteurActivite: "Informatique",
    region: "Montréal",
    dateInscription: "2021-03-04"
}

const stagiere2 = {
    actif: "0",
    poste: "Designer",
    nom: "Valérie Boisvert",
    secteurActivite: "Design graphique",
    region: "Montérigie",
    dateInscription: "2017-07-02"
}

const stagiere3 = {
    actif: "1",
    poste: "Gestionnaire de projets",
    nom: "Steve McQueen",
    secteurActivite: "Évennementiel",
    region: "Mauricie",
    dateInscription: "2022-10-14"
}
</script>

<style scoped>

html, body {
    background-color: rgb(222, 222, 222);
    font-family: Arial, Helvetica, sans-serif;
}

h1 {
    margin: 0 0 3rem 0;
    padding: 0;
}

.pageContainer {
    padding: 2rem;
    margin: 2rem;
}

.listeStagesHeader {
    display: none;
}

.listeStages {
    background-color: white;
    padding: 4rem 2rem 2rem 2rem;
    border-radius: 1rem;
}

.ajouterDemande {
    margin: 0 0 1rem 0;
    padding: 0.8rem;
    border-radius: 0.3rem;
    border: 0px solid white;
    background-color: orange;
    color: white;
}

.iconTemp {
    background-color: orange;
    width: 40px;
    height: 40px;
    border-radius: 0.5rem;
}

.elementStage {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 0 0;
    padding: 0 0 1rem 0;
    border-bottom: 0.1rem solid rgb(193, 193, 193);
}

.barreVerticale {
    width: 0.3rem;
    background-color: orange;
}

.poste {
    display: flex;
    flex-direction: column;
}


</style>