<template>
    <div class="boutons">
        <button class="bouton bouton--transparent" type="button" @click="goBack">
            Annuler
        </button>
        <button :class="buttonClass" type="submit" @click="action">
            <div class="icone-libelle">
                <i class="fas fa-save"></i>
                <span>{{ buttonText }}</span>
            </div>
        </button>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    // Fonction pour la redirection du bouton annuler
    const goBack = () => {
        const currentRoute = router.currentRoute.value;

        let redirectPath = '/tableau-de-bord';
        switch (currentRoute.name) {
            case 'OffreStageMiseAjour':
                redirectPath = `/offre-de-stage-details/${currentRoute.params.id}`;
                break;
            case 'OffreStageAjout':
                redirectPath = '/offres-de-stages';
                break;
            case 'DemandeStageMiseAjour':
                redirectPath = `/demande-stage-details/${currentRoute.params.id}`;
                break;
            case 'DemandeStageAjout':
                redirectPath = '/demandes-de-stages';
                break;
            case 'CandidatMiseAjour':
                redirectPath = `/candidat-details/${currentRoute.params.id}`;
                break;
            case 'CandidatAjout':
                redirectPath = '/candidats';
                break;  
            case 'EntrpriseMiseAjour':
                redirectPath = `/entreprise-details/${currentRoute.params.id}`;
                break;
            case 'EntrpriseAjout':
                redirectPath = '/entreprises';
                break;                                                 
            default:
                break;
        }

        router.push({ path: redirectPath });
    }    
    
    // Props pour le bouton mise à jour ou sauvegarder
    const props = defineProps({
        buttonText: String,
        buttonClass: String,
        action: Function,
    });
</script>

<style>

</style>