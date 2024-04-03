<!-- Accueil.vue -->
<template>
  <div class="accueil__container">

    <div class="accueil__logo">
      <img src="../assets/eStage-logo.png" alt="Logo" class="logo">
    </div>

    <div class="accueil__contenu">
      <div class="accueil__image"></div>

      <div class="login-panel">
        <div class="login-panel__entete">
          <h1>Identification</h1>
          <p>Lorem ipsum magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi consequat
          </p>
        </div>

        <!-- Début du formulaire d'identification -->
        <form @submit.prevent="submitForm">
          <div class="form-identification form-fiche__colonne-inputs">
            <div>
              <label for="accueil-nomPrenom" hidden>Nom et prénom</label>
              <input type="text" id="accueil-nomPrenom" v-model="nomPrenom" placeholder="Votre nom et prénom" required>
            </div>
            <div>
              <label for="accueil-courriel" hidden>Courriel</label>
              <input type="email" id="accueil-courriel" v-model="courriel" placeholder="Votre courriel" required>
            </div>
            <button class="bouton bouton--turquoise" type="submit">Accéder maintenant</button>
          </div>
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

    router.push({
      name: 'TableauDeBord'
    });
  };
</script>