<!-- Accueil.vue -->
<template>
  <div class="app-container">

    <div class="logo-container">
      <img src="../assets/eStage-logo.png" alt="Logo" class="logo">
    </div>

    <div class="content-container">
      <img src="../assets/accueil.png" alt="Image" class="half-page-image">

      <div class="login-panel">
        <div class="entete-login-panel">
          <h1>Identification</h1>
          <p>Lorem ipsum magna aliqua ut enim ad minim veniam, quis <br> nostrud exercitation ullamco laboris nisi consequat</p>
        </div>

        <!-- Début du formulaire d'identification -->
        <form @submit.prevent="submitForm">
          <div class="form-group form-fiche__colonne-inputs" >
            <label for="accueil-nomPrenom"></label>
            <input type="text" id="accueil-nomPrenom" v-model="nomPrenom" placeholder="Votre nom et prénom" required>
          </div>
          <div class="form-group form-fiche__colonne-inputs" >  
            <label for="accueil-courriel"></label>
            <input type="email" id="accueil-courriel" v-model="courriel" placeholder="Votre courriel" required>
          </div>

          <button class="bouton bouton--turquoise bouton-acceuil"type="submit">Accéder maintenant</button>
        </form>
      </div>

    </div>

  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const nomPrenom = ref(''); // Initialiser nomPrenom en tant que ref avec une chaîne vide
  const courriel = ref(''); // Initialiser courriel en tant que ref avec une chaîne vide

  const submitForm = () => {
    const nomPrenomValue = nomPrenom.value;
    const courrielValue = courriel.value;

    // Stocker les informations dans le localStorage
    localStorage.setItem('nomPrenom', nomPrenomValue);
    localStorage.setItem('courriel', courrielValue);

    router.push({ name: 'TableauDeBord' });
  };
</script>