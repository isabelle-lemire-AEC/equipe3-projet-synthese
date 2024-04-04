<!-- Entreprises.vue -->
<template>
  <div class="entreprises">
    <h1>Entreprises</h1>
    <button class="bouton bouton--bleu" @click="goToEntrepriseAjout">
      Ajouter une entreprise
    </button>
    <div class="entreprises__liste">
      <EntrepriseCard
        v-for="entreprise in entreprises"
        :key="entreprise._id"
        :entreprise="entreprise"
      ></EntrepriseCard>
    </div>
  </div>
</template>

<script setup>
import EntrepriseCard from "@/components/EntrepriseCard.vue";
import { useEntreprise } from "@/composables/entreprises/entreprise";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const { entreprises, chargerEntreprises } = useEntreprise();
const route = useRoute();
const router = useRouter();

const goToEntrepriseAjout = () => {
  router.push({
    name: "EntrepriseAjout",
  });
};

onMounted(chargerEntreprises);
watch(() => route.path, chargerEntreprises, { immediate: true });
</script>

<style scoped>

</style>
