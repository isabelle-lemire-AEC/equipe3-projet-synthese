<template>
    <div v-if="demande" class="form-fiche fiche-candidat-details">
        <div class="form-fiche__wrapper-titre">
            <p class="form-fiche__nom-section">Demande de stage</p>
            <h1>{{ demande.title }}</h1>
        </div>

        <div class="form-fiche__wrapper-boutons-encadre">
            
            <div class="boutons-action">
                <button :class="{ 'boutons-action__crochet': demande.isActive }" @click="activate()">
                    <i class="fas fa-check"></i>
                </button>
                <button class="boutons-action__modifier" @click="redirigerVersMiseAJour(demande._id)">
                    <i class="fas fa-pen-to-square"></i>
                </button>
                <button class="boutons-action__supprimer" @click="afficherConfirmationModal()">
                    <i class="fas fa-square-xmark"></i>
                </button>
            </div>

            <div class="form-fiche__encadre">
                <!-- Section de description de la demande de stage -->
                <div class="form-fiche__wrapper-titre-groupe-inputs">
                    <h2>{{ demande.candidate.firstName }} {{ demande.candidate.lastName }}</h2>
                    <p>{{ demande.candidate.description }}</p>
                </div>
                <!-- Section d'informations -->
                <div class="form-fiche__wrapper-titre-groupe-inputs">
                    <div class="form-fiche__colonnes-inputs">
                        <div class="form-fiche__colonne-inputs">
                            <div class="form-fiche__label-input-vertical">
                                <h4>Programme de formation</h4>
                                <p>Développement Web</p> <!-- Info pas fournie par l'API -->
                            </div>
                            <div class="form-fiche__label-input-vertical" v-if="randomActivitySector">
                                <h4>Secteur d'activité</h4>
                                <p>{{ randomActivitySector.value }}</p> <!-- Info pas lié avec une demande, alors on en affiche une aléatoirement -->
                            </div>
                            <div class="form-fiche__label-input-vertical">
                            <h4>Compétences</h4>
                                <p class="skills">{{ competences }}</p>
                            </div>
                        </div>
                        <div class="form-fiche__colonne-inputs">
                            <div class="form-fiche__label-input-vertical">
                                <h4>Établissement d'enseignement</h4>
                                <p>Cégep de Trois-Rivières</p> <!-- Info pas fournie par l'API -->
                            </div>
                            <div class="form-fiche__label-input-vertical">
                                <h4>Ville</h4>
                                <p>{{ demande.candidate.city }}</p>
                            </div>
                            <div class="form-fiche__label-input-vertical">
                                <h4>Région</h4>
                                <p>{{ demande.province.value }}</p>
                            </div>
                        </div>
                    </div>            
                </div>

                <div class="form-fiche__wrapper-titre-groupe-inputs">
                    <h3>Informations sur le stage recherché</h3>
                    <div class="form-fiche__colonne-inputs">
                        <div class="form-fiche__colonnes-inputs">
                            <div class="form-fiche__label-input-vertical">
                                <h4>Type de stage</h4>
                                <p>{{ demande.internshipType.value }}</p>
                            </div>
                            <div class="form-fiche__label-input-vertical">
                                <h4>Nombre d'heures par semaine</h4>
                                <p>{{ demande.weeklyWorkHours }}</p>
                            </div> 
                            <div class="form-fiche__label-input-vertical">
                                <h4>Rénumération</h4>
                                <p>À la discrétion de l'entreprise</p>
                            </div>   
                        </div>  
                        <div class="form-fiche__colonnes-inputs">
                            <div class="form-fiche__label-input-vertical">
                                <h4>Date de début</h4>
                                <p>{{ dateDebut }}</p>
                            </div>  
                            <div class="form-fiche__label-input-vertical">
                                <h4>Date de fin</h4>
                                <p>{{ dateFin }}</p>
                            </div>  
                        </div>                      
                    </div>
                </div>

                <div class="form-fiche__wrapper-titre-groupe-inputs">
                    <h3>Informations suplémentaires</h3>
                    <p>{{ demande.additionalInformation }}</p>
                </div>
                
                <btnTelechargerCV></btnTelechargerCV>

                </div>

                <!-- Modal de confirmation de suppression -->
                <div class="modal" v-if="showConfirmationModal">
                    <div class="modal-content">
                        <p>Êtes-vous sûr de vouloir supprimer cette demande de stage?</p>
                        <div class="modal-buttons">
                        <button class="btn cancel" @click="annulerSuppression()">Annuler</button>
                        <button class="btn confirm" @click="deleteDemande()">Confirmer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </template>

<script setup>
    import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js';
    import { ref, reactive, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useActivitySectors } from '../composables/secteurs_activites/secteurs_activites.js';

    import btnTelechargerCV from '../components/BtnTelechargerCV.vue'

    const { getAllActivitySectors } = useActivitySectors();
    const { getRequestById, editRequest, deleteRequest  } = useInternshipRequests();
    const route = useRoute();
    const router = useRouter();
    const demande = ref(null);
    const showConfirmationModal = ref(false);
    const randomActivitySector = ref(null);
    const dateDebut = ref(null);
    const dateFin = ref(null);
    const competences = ref(null);

    const getActivitySectors = async () => {
        const actSectors = await getAllActivitySectors();
        randomActivitySector.value = actSectors[Math.floor(Math.random()*actSectors.length)];
    }

    const deleteDemande = async () => {
        await deleteRequest(demande.value._id);
        showConfirmationModal.value = false;
        router.push({ name: 'DemandesStages' }); 
    }

    // Fonction pour afficher la modal de confirmation
    const afficherConfirmationModal = () => {
        showConfirmationModal.value = true;
    };

    // Fonction pour annuler la suppression
    const annulerSuppression = () => {
        showConfirmationModal.value = false;
    };

    const redirigerVersMiseAJour = (id) => {
        router.push({ name: 'DemandeStageMiseAjour', params: { id } });
    };

    onMounted(async () => {
        try {
            getActivitySectors();
            const response = await getRequestById(route.params.id);
            demande.value = response.data;
            console.log("demande.value: ", demande.value);

            // Afin d'afficher les dates dans le bon format
            dateDebut.value = demande.value.startDate.substring(0, demande.value.startDate.indexOf('T'));
            dateFin.value = demande.value.endDate.substring(0, demande.value.startDate.indexOf('T'));

            // Afin d'afficher les "skills" comme il faut (sans la dernière virgule)
            competences.value = demande.value.skills.join(', ');
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }


    });

    const activate = async () => {
        demande.value.isActive = !demande.value.isActive;
        demande.value = await editRequest(demande.value._id, demande.value);
    }

</script>

<style scoped>

    /* 
        h2 {
        margin-bottom: 0.5rem;
    }

    h3 {
        color: rgb(34,166,172);
        font-size: xx-large;
        margin-top: 0;
    }

    h4 {
        color: rgb(34,166,172);
        margin: 0;
    }

    p {
        color: grey;
    }

    .btnsContainer {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
    }

    .infoContainer {
        padding: 3rem;
        background-color: white;
        border-radius: 1rem;
    }

    .grilleStage {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .grilleStageCellule {
        display: flex;
        flex-direction: column;
    }

    .barreVerticale {
        width: 0.3rem;
        height: 2rem;
        background-color: grey;
        margin-right: 1rem;
    }

    .bordureGauche {
        border-left: 0.3rem solid grey;
        padding-left: 0.6rem;
    }

    .btnTelechargerCV {
        background-color: rgb(34,166,172);
        border: 0 white solid;
        padding: 0.7rem;
        color: white;
        font-weight: bold;
        font-size: x-large;
        border-radius: 0.5rem;
    }

    .skills {
        display: inline;
    }


    .btn {
        cursor: pointer;
        border: none;
    }
    
    */
    
    /* Styles pour le modal */
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 30%;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }

    .modal-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .btn {
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        transition: 0.3s;
    }

    .btn.confirm {
        background-color: #4CAF50;
        color: white;
    }

    .btn.cancel {
        background-color: #f44336;
        color: white;
    }

    .btn:hover {
        opacity: 0.8;
    }

</style>