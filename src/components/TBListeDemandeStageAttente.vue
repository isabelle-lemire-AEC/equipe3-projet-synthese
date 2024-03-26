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
            <button>
                <i class="fa-solid fa-eye"></i>
            </button>
            <button class="boutons-action__modifier">
                <i class="fas fa-pen-to-square"></i>
            </button>
            <button class="boutons-action__supprimer">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        demande: Object
    });

    // Méthode pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
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