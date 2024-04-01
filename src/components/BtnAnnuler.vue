<template>
    <button class="bouton bouton--transparent" type="button" @click="goBack">
        Annuler
    </button>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

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
</script>
