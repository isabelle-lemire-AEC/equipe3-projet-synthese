<template>
    <div class="elementOffre" v-if="showThisElement">
        <div>
            <div class="offre">
                <div class="iconTemp"></div>
                <div class="posteEtNomEntreprise">
                    <span>{{ props.offer.title }}</span>
                    <span>{{ props.offer.enterprise.name }}</span>
                </div>
            </div>
        </div>
   

        <div class="secteurActivite">
            <span>{{ props.offer.activitySector.value }}</span>
        </div>

        <div class="region">
            <span>{{ props.offer.province.value }}</span>
        </div>

        <div class="dateInscription">
            <span>{{ date }}</span>
        </div>

        <div class="groupeBtns">
            <RouterLink :to="{name: 'OffreStageDetails', params: {id: props.offer._id}}">
                <button>Oeil</button>
            </RouterLink>
            <RouterLink :to="{name: 'OffreStageMiseAjour', params: {id: props.offer._id}}">
                <button>Edit</button>
            </RouterLink>
            <button @click="afficherConfirmationModal()">Trash</button>
        </div>

        <!-- Modal de confirmation de suppression -->
        <div class="modal" v-if="showConfirmationModal">
            <div class="modal-content">
                <p>Êtes-vous sûr de vouloir supprimer cette offre?</p>
                <div class="modal-buttons">
                <button class="btn cancel" @click="annulerSuppression()">Annuler</button>
                <button class="btn confirm" @click="deleteDemande()">Confirmer</button>
                </div>
            </div>
        </div>

    </div>
</template>


<script setup>


    import { ref, defineProps } from 'vue';
    import { useInternshipOffers } from '../composables/offres_stage/offreDeStage'; 

    const { deleteRequest } = useInternshipOffers();
    const props = defineProps(['offer']);
    const showConfirmationModal = ref(false);

    let showThisElement = ref(true);
    let date = ref([]);

    date = props.offer.startDate;
    date = date.substring(0, 10);

    const deleteDemande = async () => {
        await deleteRequest(props.offer._id);
        showConfirmationModal = false;
        showThisElement.value = false;
    }

    // Fonction pour afficher la modal de confirmation
    const afficherConfirmationModal = () => {
    showConfirmationModal = true;
    };

    // Fonction pour annuler la suppression
    const annulerSuppression = () => {
    showConfirmationModal = false;
    };

</script>
