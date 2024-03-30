<template>
    <button @click="telechargerPDF" class="bouton bouton--mauve">
        <i class="fa-solid fa-cloud-arrow-down"></i>Télécharger le C.V.
    </button>
</template>

<script setup>
    const telechargerPDF = () => {
        const cheminPDF = "https://www.ccdmd.qc.ca/media/Genres_03Lecurriculumvit.pdf";
        window.open(cheminPDF, "_blank");
    }
</script>

<style scoped>
    button {
        background-color: #0C9DA4;
    }

    button:hover {
        background-color: #054d51 !important;
    }
</style>