<template>
    <div class="elementStage" v-if="showThisElement">
        <div>
            <div class="poste">
            <div class="iconTemp"></div>
                <div class="posteEtNom">
                    <span>{{ props.posteTitre }}</span>
                    <span>{{ props.posteNom }}</span>
                </div>
            </div>
        </div>
        <div class="secteurActivite">
            <span>TODO</span>
        </div>
        <div class="region">
            <span>{{ props.region }}</span>
        </div>
        <div class="dateInscription">
            <span>{{ date }}</span>
        </div>
        <div class="boutonActiver" v-if="props.isTableauDeBord">
            <button @click="activer()">Activer</button>
        </div>

        <!-- Boutons pour les DEMANDES de stage -->
        <div class="groupeBtns boutons-action" v-if="props.isDemande">
            <RouterLink :to="{name: 'DemandeStageDetails', params: {id: props.id}}">
                <button><i class="fa-solid fa-eye"></i></button>
            </RouterLink>

            <RouterLink :to="{name: 'DemandeStageMiseAjour', params: {id: props.id}}">
                <button class="boutons-action__modifier"><i class="fas fa-pen-to-square"></i></button>
            </RouterLink>

            <button class="boutons-action__supprimer" @click="afficherConfirmationModal()"><i class="fa-solid fa-trash-can"></i></button>
        </div>

        <!-- Boutons pour les OFFRES de stage -->
        <div class="groupeBtns boutons-action" v-if="!props.isDemande">
            <RouterLink :to="{name: 'OffreStageDetails', params: {id: props.id}}">
                <button><i class="fa-solid fa-eye"></i></button>
            </RouterLink>

            <RouterLink :to="{name: 'OffreStageMiseAjour', params: {id: props.id}}">
                <button class="boutons-action__modifier"><i class="fas fa-pen-to-square"></i></button>
            </RouterLink>

            <button class="boutons-action__supprimer" @click="afficherConfirmationModal()"><i class="fa-solid fa-trash-can"></i></button>
        </div>

        <!-- Modal de confirmation de suppression -->
        <div class="modal" v-if="showConfirmationModal">
            <div class="modal-content">
                <p v-if="props.isDemande">Êtes-vous sûr de vouloir supprimer cette demande de stage?</p>
                <p v-if="!props.isDemande">Êtes-vous sûr de vouloir supprimer cette offre de stage?</p>
                <div class="modal-buttons">
                <button class="btn cancel" @click="annulerSuppression()">Annuler</button>
                <button class="btn confirm" @click="deleteDemande()">Confirmer</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js';
    import { useInternshipOffers } from '../composables/offres_stage/offreDeStage.js';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const { deleteRequest, activateRequest } = useInternshipRequests();
    const { supprimerOffre, activateOffer } = useInternshipOffers();
    const props = defineProps(['posteTitre', 'posteNom', 'region', 'date', 'id', 'isDemande', 'isTableauDeBord', 'isActive']);
    const showConfirmationModal = ref(false);
    const showThisElement = ref(true);
    const date = ref([]);

    if(props.isTableauDeBord && props.isActive) {
        showThisElement.value = false;
    }

    date.value = props.date;
    date.value = date.value.substring(0, 10);

    const deleteDemande = async () => {
        props.isDemande ? await deleteRequest(props.id) : await supprimerOffre(props.id);
        showConfirmationModal.value = false;
        showThisElement.value = false;
    }

    // Fonction pour afficher la modal de confirmation
    const afficherConfirmationModal = () => {
    showConfirmationModal.value = true;
    };

    // Fonction pour annuler la suppression
    const annulerSuppression = () => {
    showConfirmationModal.value = false;
    };

    const lienDetails = ref(null);
    const lienMiseAJour = ref(null);
    if (props.isDemande) {
        lienDetails.value = 'DemandeStageDetails';
        lienMiseAJour.value = 'DemandeStageMiseAjour';
    } else {
        lienDetails.value = 'OffreStageDetails';
        lienMiseAJour.value = 'OffreStageMiseAjour';
    }

    const activer = async () => {
        if(props.isDemande) {
            await activateRequest(props.id);
        } else {
            await activateOffer(props.id);
        }
        showThisElement.value = false;
    }

</script>

<style scoped>

    .poste {
        border-left: 0.3rem solid orange;
        padding-left: 0.6rem;
        display: flex;
        gap: 1rem;
    }

    .posteEtNom {
        display: flex;
        flex-direction: column;
    }

    .iconTemp {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.3rem;
        background-color: orange;
    }

    
    .btn {
        cursor: pointer;
        border: none;
    }

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