<!-- CandidatCard.vue - Donaria -->
<template>
  <div class="carte-candidat" @click="redirectToDetails">
    <img class="carte-candidat__img " src="../assets/icons8-account-96.png" alt="Candidate Icon">
    <div class="carte-candidat__texte">
      <div>
        <h2>{{ candidate.firstName }} {{ candidate.lastName }}</h2>
        <p>UX Designer</p>
      </div>
      <div>
        <p>{{ candidate.email }}</p>
        <p>{{ candidate.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const { push } = useRouter();

  const redirectToDetails = () => {
    push({
      name: 'CandidatDetails',
      params: {
        id: props.candidate._id
      }
    });
  };

  const props = defineProps({
    candidate: {
      type: Object,
      required: true
    }
  });
</script>



<style scoped>
  /* .candidat-card {
  display: flex;
  background-color: #fff;
  padding: 10px; 
  width: 380px; 
  }

  .candidat-card:hover{
    background-color: rgb(239, 206, 233);
    cursor: pointer;
  }

  .candidat-card img {
  background-color: purple;
  width: 33%; 
  height: auto; 
  margin-right: 10px; 
  }

  .text-content {
  width: 66%; 
  }

  .text-content h3, .text-content p {
  color: #000000;
  margin: 0;
  margin-bottom: 5px;
  }

  .fonction{
    padding-bottom: 15px; 
  } */
</style>