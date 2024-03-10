<!-- Candidats.vue - Donaria  -->
<template>
    <div class="candidatsList">
      <h1>Candidats</h1>
      <button class="post-candidat">Ajouter un candidat</button>
      <div class="grid">
        <CandidatCard v-for="n in 12" :key="n"></CandidatCard>
      </div>
    </div>
  </template>
  
  <script>
  import CandidatCard from '@/components/CandidatCard.vue';

  
  export default {
    components: {
      CandidatCard,
    },
  };
  </script>
  

  <style scoped>
  .candidatsList {
    font-family: Arial, sans-serif;
    color: #100f0f;
    background-color: #ececee;
    padding:80px 200px 80px 200px;
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