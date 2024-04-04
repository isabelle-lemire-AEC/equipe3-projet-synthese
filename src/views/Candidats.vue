<!-- Candidats.vue -->
<template>
  <div class="candidats">
    <h1>Candidats</h1>
    <button class="bouton bouton--mauve" @click="goToCandidatAjout">Ajouter un candidat</button>
    <div class="candidats__liste" v-if="candidates.length">
      <CandidatCard v-for="candidate in candidates" :key="candidate._id" :candidate="candidate"></CandidatCard>
    </div>
  </div>
</template>

<script setup>
  import { useCandidat } from '@/composables/candidats/candidat';
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import CandidatCard from '@/components/CandidatCard.vue';

  const candidates = ref([]);
  const { getAllCandidats } = useCandidat();
  const router = useRouter();

  const goToCandidatAjout = () => {
    router.push({
      name: 'CandidatAjout'
    });
  };

  // Fonction pour récupérer tous les candidats
  onMounted(async () => {
  await chargerCandidats();
});

const chargerCandidats = async () => {
  try {
    const response = await getAllCandidats();
    candidates.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des candidats:", error);
  }
};

</script>

<style scoped>
  
</style>