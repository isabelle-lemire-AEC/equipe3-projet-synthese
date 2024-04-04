<!-- EntrepriseCard.vue -->
<template>
    <div class="carte-entreprise" @click="redirectToDetails">
      <img class="carte-entreprise__img" src="../assets/mediavox-logo.jpg" :alt=entreprise.name>
      <div class="carte-entreprise__texte">
        <div>
          <h2>{{ entreprise.name }}</h2>
          <p>{{ entreprise.address }}</p>
          
        </div>
        <div>
          <p>Téléphone : {{ entreprise.phone }}</p>
          <p>Courriel : {{ entreprise.email }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { useRouter } from 'vue-router';
  
    const { push } = useRouter();
    const props = defineProps({
      entreprise: {
        type: Object,
        required: true
      }
    });
  
     /* La fonction qui redirige vers les détails de l'entreprise */
    const redirectToDetails = () => {
      push({
        name: 'EntrepriseDetails',
        params: {
          id: props.entreprise._id
        }
      });
    };
  </script>
  
