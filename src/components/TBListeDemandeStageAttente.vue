<!-- components/TBListeDemandeStageAttente.vue - Débuter par Isa -->
<template>
    <div class="flex-center-horizontal margin">
        <div class="bgStage marginRight">
            <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <div class="marginRight">
            <p>{{ demande.title }}</p>
            <p>{{ demande.candidate.firstName }} {{ demande.candidate.lastName }}</p>
        </div>
        <p class="marginRight">{{ demande.candidate.city }}</p>
        <p class="marginRight">{{ formatDate(demande.startDate) }}</p>
        <div class="boutons-action">
            <button>Accepter</button>
            <button @click="redirectToDetails">
                    <i class="fa-solid fa-eye"></i>
            </button>
            <button class="boutons-action__modifier" @click="redirectToEdit">
                    <i class="fas fa-pen-to-square"></i>
            </button>
            <button class="boutons-action__supprimer" @click="afficherConfirmationModal()">
                <i class="fa-solid fa-trash-can"></i>
            </button>
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
    import { defineProps } from 'vue';
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';

    import { useInternshipRequests } from '@/composables/demandes_stages/demandeDeStage';
    
    const router = useRouter();

    const { push } = useRouter();

    const { deleteRequest } = useInternshipRequests();
    const showConfirmationModal = ref(false);
    let showThisElement = ref(true);

    const props = defineProps({
        demande: {
        type: Object,
        required: true
        }
    });

    const redirectToDetails = () => {
        push({
            name: 'DemandeStageDetails',
            params: {
                id: props.demande._id
            }
        });
    };

    const redirectToEdit = () => {
        router.push({
            name: 'DemandeStageMiseAjour',
            params: { id: props.demande._id }
        });
    };

    // Méthode pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    const deleteDemande = async () => {
        await deleteRequest(props.demande._id);
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

<style>
    .flex-center-horizontal {
        display: flex;
        align-items: center;
    }

    .marginRight {
        margin-right: 25px;
    }

    .margin {
        margin: 15px 15px 0 0;
    }
    .bgStage {
        background-color: lightgray;
        padding: 15px;
        border-radius: 15px;
    }
</style>