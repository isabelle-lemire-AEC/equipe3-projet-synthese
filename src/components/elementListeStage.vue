<template>
    <div class="elementStage" v-if="showThisElement">
        <div>
            <div class="poste">
                <div class="iconTemp"></div>
                <div class="posteEtNom">
                    <span>{{ props.stage.title }}</span>
                    <span>{{ props.stage.candidate.firstName }} {{ props.stage.candidate.lastName }}</span>
                </div>
            </div>
        </div>
        <div class="secteurActivite">
            <span>{{ props.stage.activitySector }}</span>
        </div>
        <div class="region">
            <span>{{ props.stage.province.value }}</span>
        </div>
        <div class="dateInscription">
            <span>{{ date }}</span>
        </div>
        <div class="groupeBtns">
            <RouterLink :to="{name: 'DemandeStageDetails', params: {id: props.stage._id}}">
                <button>Oeil</button>
            </RouterLink>

            <RouterLink :to="{name: 'DemandeStageMiseAjour', params: {id: props.stage._id}}">
                <button>Edit</button>
            </RouterLink>

            <button @click="afficherConfirmationModal()">Trash</button>
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
</template>

<script setup>
    import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js';
    import { ref } from 'vue';
    const { deleteRequest } = useInternshipRequests();

    const props = defineProps(['stage']);
    const showConfirmationModal = ref(false);
    let showThisElement = ref(true);
    let date = ref([]);

    date = props.stage.startDate;
    date = date.substring(0, 10);

    const deleteDemande = async () => {
        await deleteRequest(props.stage._id);
        showConfirmationModal.value = false;
        showThisElement = false;
    }

    // Fonction pour afficher la modal de confirmation
    const afficherConfirmationModal = () => {
    showConfirmationModal.value = true;
    };

    // Fonction pour annuler la suppression
    const annulerSuppression = () => {
    showConfirmationModal.value = false;
    };

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

</style>