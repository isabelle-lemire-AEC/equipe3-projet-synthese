<template>
    <div class="flex-center-horizontal margin">
        <div class="bgStage marginRight">
            <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <div class="marginRight">
            <p>Intégrateur web</p>
            <p>Jean-Sébastien Tremblay</p>
        </div>
        <p class="marginRight">Cégep de Trois-Rivières</p>
        <p class="marginRight">25 janvier 2025</p>
        <div class="boutons-action">
            <button>Accepter</button>
            <button>
                <i class="fa-solid fa-eye"></i>
            </button>
            <button class="boutons-action__modifier"> <!-- @click="fonction(????._id)" -->
                <i class="fas fa-pen-to-square"></i>
            </button>
            <button class="boutons-action__supprimer"> <!-- @click="afficherConfirmationModal" -->
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
    .flex-center-horizontal {
        display: flex;
        align-items: center;
    }

    .marginRight {
        margin-right: 15px;
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