<template>
    <div class="elementStage">
        <div>
            <div class="poste">
            <div class="iconTemp"></div>
            <div class="posteEtNom">
                <span>{{ props.stage.poste }}</span>
                <span>{{ props.stage.nom }}</span>
            </div>
            </div>
        </div>
        <div class="secteurActivite">
            <span>{{ props.stage.secteurActivite }}</span>
        </div>
        <div class="region">
            <span>{{ props.stage.region }}</span>
        </div>
        <div class="dateInscription">
            <span>{{ props.stage.dateInscription }}</span>
        </div>
        <div class="groupeBtns">
            <RouterLink to="/demande-de-stage-details">Oeil</RouterLink>
            <button>Edit</button>
            <button>Trash</button>
        </div>
    </div>
</template>

<script setup>
    // import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js'

    // const { getAllRequests, response, error, loading } = useInternshipRequests();
    // await getAllRequests();

    const props = defineProps(['stage'])
    // console.log(props.stage)

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
</style>