<template>
    <div class="elementStage">
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
            <span>Où est cette info?</span>
        </div>
        <div class="region">
            <span>{{ props.stage.province.value }}</span>
        </div>
        <div class="dateInscription">
            <span>{{ props.stage.startDate }}</span>
        </div>
        <div class="groupeBtns">
            <RouterLink :to="{name: 'DemandeStageDetails', params: {id: props.stage._id}}">
                <button>Oeil</button>
            </RouterLink>

            <RouterLink :to="{name: 'DemandeStageMiseAjour', params: {id: props.stage._id}}">
                <button>Edit</button>
            </RouterLink>

            <button>Trash</button>
        </div>
    </div>
</template>

<script setup>
    // await getAllRequests();

    const props = defineProps(['stage'])
    // console.log("props.stage: ", props.stage)
    


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