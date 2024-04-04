<!-- CandidatCard.vue --->
<template>
  <div class="carte-candidat" @click="redirectToDetails">
    <img class="carte-candidat__img " src="../assets/icons8-account-96.png" alt="Icône de candidat">
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

</style>