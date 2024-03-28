<!-- Entreprises -->
<template>
  <div class="entreprises">
    <h1>Entreprises</h1>
    <router-link to="/entreprise-ajout" class="bouton bouton--bleu">Ajouter une entreprise</router-link>

    <div class="entreprises__liste">
      <router-link v-for="entreprise in entreprises" :key="entreprise._id"
                   :to="{ name: 'EntrepriseDetails', params: { id: entreprise._id } }">
        <div class="carte-entreprise">
          <!-- Affichage du logo de l'entreprise -->
          <img :src="logoEntreprise" alt="Logo de l'entreprise" class="carte-entreprise__img" />
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
      </router-link>
    </div>
  </div>
</template>

<script>
  import {
    useEntreprise
  } from '@/composables/entreprises/entreprise'
  import {
    onMounted,
    watch
  } from 'vue'
  import {
    useRoute
  } from 'vue-router'
  import logoEntreprise from '@/assets/logo-ent.jpg';

  export default {
    name: 'ListeEntreprises',
    setup() {
      // Utilisation du composable Entreprise pour obtenir les entreprises et la fonction pour les charger
      const {
        entreprises,
        chargerEntreprises
      } = useEntreprise()
      const route = useRoute()

      // Chargement des entreprises au montage du composant
      onMounted(chargerEntreprises)
      console.log('Le composant est monté, chargement des entreprises...')

      // Rechargement des entreprises lorsque le chemin de la route change
      watch(() => route.path, chargerEntreprises, {
        immediate: true
      })

      return {
        entreprises,
        logoEntreprise
      }
    }
  }
</script>



<style scoped>
  /* .content {
    padding-left: 3rem;
    max-width: 80%;
    margin-top: 0;
    text-decoration: none;
  }

  .header {
    align-items: flex-start;
    gap: 2rem;
  }

  h2 {
    margin: 0;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  div {
    padding-bottom: 20px;
  }

  .button {
    width: 20%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #89a9e6;
    color: black;
    font-weight: bold;
    text-decoration: none;
  }

  .button:hover {
    background-color: #507ac8;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
  }

  .card {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 5px 3px gray;
  }

  .logo {
    flex-basis: 30%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo img {
    max-width: 100%;
    height: auto;
  }

  .informations {
    flex-basis: 70%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
  }

  .informations h2 {
    font-size: 1.5rem;
    margin: 0;
  }

  .informations p {
    font-size: 14px;
    margin: 0;
  }

  .card,
  .card:link,
  .card:visited,
  .card:hover,
  .card:active,
  .card:focus {
    text-decoration: none;
    color: gray;
    outline: none;
  } */
</style>