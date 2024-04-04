<template>
    <tr class="liste__rangee" v-if="showThisElement">
        <td class="liste__body__contenu-colonne liste__body__contenu-colonne--1">
            <div class="liste__wrapper-horizontal">
                <div v-if="props.isDemande">
                    <div :class="{ 'icone': true, 'icone--demande': true, 'icone-inactive': !props.isActive, 'demandestages-list': isDemandesStages }">
                        <i class="fas fa-graduation-cap" :style="{ color: props.isActive ? 'inherit' : 'black' }"></i>
                    </div>
                </div>

                <div v-if="!props.isDemande">
                    <div class="icone icone--offre">
                        <i class="fas fa-suitcase"></i>
                    </div>
                </div>

                <div class="liste__wrapper-vertical">
                    <span class="poste">{{ props.posteTitre }}</span>
                    <span>{{ props.posteNom }}</span>
                </div>
            </div>
        </td>
        <td class="liste__body__contenu-colonne liste__body__contenu-colonne--2">
            <div class="region">
                <span>{{ props.info2 }}</span>
            </div>
        </td>
        <td v-if="!props.isTableauDeBord" class="liste__body__contenu-colonne liste__body__contenu-colonne--3">
            <div class="dateInscription">
                <span>{{ props.region }}</span>
            </div>
        </td>

         <td class="liste__body__contenu-colonne liste__body__contenu-colonne--5">
            <div class="dateInscription">
                <span>{{ date }}</span>
            </div>
        </td>

        <td class="liste__body__contenu-colonne liste__body__contenu-colonne--4">
            <div class="liste__wrapper-boutons">

                <button v-if="props.isTableauDeBord" class="bouton bouton--activer" @click="activer()">
                    Accepter
                </button>


                <!-- Boutons Demande -->
                <div v-if="props.isDemande">
                    <div class="boutons-action" v-if="props.isDemande">
                        <RouterLink :to="{name: 'DemandeStageDetails', params: {id: props.id}}">
                            <button class="boutons-action-liste boutons-action-liste__consulter">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                        </RouterLink>

                        <RouterLink :to="{name: 'DemandeStageMiseAjour', params: {id: props.id}}">
                            <button class="boutons-action-liste boutons-action-liste__modifier">
                                <i class="fas fa-pen-to-square"></i>
                            </button>
                        </RouterLink>

                        <button class="boutons-action-liste boutons-action-liste__supprimer"
                                @click="afficherConfirmationModal()">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>

                <!-- Boutons offre -->
                <div v-if="!props.isDemande">
                    <div class="groupeBtns boutons-action" v-if="!props.isDemande">
                        <RouterLink :to="{name: 'OffreStageDetails', params: {id: props.id}}">
                            <button class="boutons-action-liste boutons-action-liste__consulter">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                        </RouterLink>

                        <RouterLink :to="{name: 'OffreStageMiseAjour', params: {id: props.id}}">
                            <button class="boutons-action-liste boutons-action-liste__modifier">
                                <i class="fas fa-pen-to-square"></i>
                            </button>
                        </RouterLink>

                        <button class="boutons-action-liste boutons-action-liste__supprimer"
                                @click="afficherConfirmationModal()">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>
        </td>
    </tr>

    <!-- Modal de confirmation de suppression -->
    <div class="modal" v-if="showConfirmationModal">
        <div class="modal__contenu">
            <p v-if="props.isDemande">Êtes-vous sûr de vouloir supprimer cette demande de stage?</p>
            <p v-if="!props.isDemande">Êtes-vous sûr de vouloir supprimer cette offre de stage?</p>
            <div class="modal__boutons">
                <button class="bouton bouton--rouge" @click="annulerSuppression()">Annuler</button>
                <button class="bouton bouton--vert" @click="deleteDemande()">Confirmer</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        useInternshipRequests
    } from '../composables/demandes_stages/demandeDeStage.js';
    import {
        useInternshipOffers
    } from '../composables/offres_stage/offreDeStage.js';
    import {
        ref,
        onMounted
    } from 'vue';
    import {
        useRoute
    } from 'vue-router';

    const {
        deleteRequest,
        activateRequest
    } = useInternshipRequests();
    const {
        supprimerOffre,
        activateOffer
    } = useInternshipOffers();

    const props = defineProps(['posteTitre', 'posteNom', 'info2', 'region', 'date', 'id', 'isDemande',
        'isTableauDeBord', 'isActive'
    ]);
    const showConfirmationModal = ref(false);
    const showThisElement = ref(true);
    const date = ref([]);
    const route = useRoute();
    const lienDetails = ref(null);
    const lienMiseAJour = ref(null);

    if (props.isTableauDeBord && props.isActive) {
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

    if (props.isDemande) {
        lienDetails.value = 'DemandeStageDetails';
        lienMiseAJour.value = 'DemandeStageMiseAjour';
    } else {
        lienDetails.value = 'OffreStageDetails';
        lienMiseAJour.value = 'OffreStageMiseAjour';
    }

    const activer = async () => {
        if (props.isDemande) {
            await activateRequest(props.id);
        } else {
            await activateOffer(props.id);
        }
        showThisElement.value = false;
    }


    //Tableau responsive 4 colonnes

    const ajoutDataTitle4Col = () => {
        const titreColonne2 = document.querySelector(".liste__head__titre-colonne--2");
        const titreColonne3 = document.querySelector(".liste__head__titre-colonne--3");

        const contenuColonne2 = document.querySelectorAll(".liste__body__contenu-colonne--2");
        const contenuColonne3 = document.querySelectorAll(".liste__body__contenu-colonne--3");

        const totalTableBodyRow = document.querySelectorAll(".liste__body .liste__rangee");

        for (let i = 0; i < totalTableBodyRow.length; i++) {
            contenuColonne2[i].setAttribute("data-title", titreColonne2.innerText);

            if(contenuColonne3[i]) contenuColonne3[i].setAttribute("data-title", titreColonne3.innerText);
        }
    };

    //Tableau responsive 5 colonnes

    const ajoutDataTitle5Col = () => {
        const titreColonne2 = document.querySelector(".liste__head__titre-colonne--2");
        const titreColonne3 = document.querySelector(".liste__head__titre-colonne--3");
        const titreColonne5 = document.querySelector(".liste__head__titre-colonne--5");

        const contenuColonne2 = document.querySelectorAll(".liste__body__contenu-colonne--2");
        const contenuColonne3 = document.querySelectorAll(".liste__body__contenu-colonne--3");
        const contenuColonne5 = document.querySelectorAll(".liste__body__contenu-colonne--5");

        const totalTableBodyRow = document.querySelectorAll(".liste-5-colonnes .liste__body .liste__rangee");

        for (let i = 0; i < totalTableBodyRow.length; i++) {
            contenuColonne2[i].setAttribute("data-title", titreColonne2.innerText);
            contenuColonne3[i].setAttribute("data-title", titreColonne3.innerText);
            contenuColonne5[i].setAttribute("data-title", titreColonne5.innerText);
        }
    };

    onMounted(() => {
        ajoutDataTitle4Col();
        ajoutDataTitle5Col();
    });
</script>


