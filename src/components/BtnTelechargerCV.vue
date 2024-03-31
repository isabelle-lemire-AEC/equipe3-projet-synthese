<template>
    <button @click="telechargerPDF" class="bouton bouton--turquoise bouton--cv">
        <div class="icone-libelle">
            <i class="fa-solid fa-cloud-arrow-down"></i>
            <span>Télécharger le C.V.</span>
        </div>
    </button>
</template>

<script setup>
    const telechargerPDF = () => {
        const cheminPDF = "https://www.ccdmd.qc.ca/media/Genres_03Lecurriculumvit.pdf";
        window.open(cheminPDF, "_blank");
    }
</script>

<style scoped>

</style>