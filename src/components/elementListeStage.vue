<template>
    <div class="elementStage">
        <div class="barVertical"></div>
        <div class="iconTemp"></div>
        <div class="poste">
            <span>{{ props.stage.poste }}</span>
            <span>{{ props.stage.nom }}</span>
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
            <RouterLink to="/ConsulterDemandeStage">Oeil</RouterLink>
            <button>Edit</button>
            <button>Trash</button>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps(['stage'])
    console.log(props.stage)

</script>

<style>

</style>