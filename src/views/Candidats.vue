<!-- Candidats.vue - Donaria  -->
<template>
  <div class="container">
    <div class="candidatsList">
      <h1>Candidats</h1>
      <button class="post-candidat" @click="goToCandidatAjout">Ajouter un candidat</button>
      <div class="grid" v-if="candidates.length">
        <CandidatCard v-for="candidate in candidates" :key="candidate._id" :candidate="candidate"></CandidatCard>
      </div>
    </div>
  </div>
</template>

<script setup>
  import CandidatCard from '@/components/CandidatCard.vue';
  import { useCandidat } from '@/composables/candidats/candidat';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';


  const candidates = ref([]);
  
  // Importation de la fonction getAllCandidats depuis le fichier candidat.js
  const { getAllCandidats } = useCandidat();
  
  const router = useRouter();

  // Fonction pour naviguer vers la page d'ajout de candidat
  const goToCandidatAjout = () => {
    router.push({ name: 'CandidatAjout' });
  };

  // Fonction pour récupérer tous les candidats
  onMounted(async () => {
    try {
      const response = await getAllCandidats();
      candidates.value = response.data; 
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  });
</script>

<style scoped>
  .container {
    max-width: 100%;
    height: 900px;
    
  }

  .candidatsList {
    font-family: Arial, sans-serif;
    color: #100f0f;
    background-color: #ececee;
    padding:40px 40px 40px 40px;
  }

  .candidatsList h1 {
    color: #0a0a0a;
    padding-bottom: 20px;
  }

  .post-candidat {
    background-color: purple;
    color: #fff;
    border-radius: 5px;
    padding: 10px 20px;
    margin-bottom: 50px;
    border:none;
  }

  .post-candidat:hover{
    background-color: rgb(53, 5, 53);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 20px;
  }
</style>
