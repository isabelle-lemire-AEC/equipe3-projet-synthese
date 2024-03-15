<template>
    <div class="content">
      <div class="header">
        <h2>Entreprises</h2>
        <button @click="ajouterEntreprise">Ajouter une entreprise</button>
      </div>
      <div class="grid">
        <router-link
          v-for="entreprise in entreprises"
          :key="entreprise.id"
          :to="{ name: 'EntrepriseDetails', params: { id: entreprise.id } }"
          class="card"
          tag="div"
        >
          <div class="logo">
            <img :src="entreprise.logoUrl" alt="Logo de l'entreprise" />
          </div>
          <div class="informations">
            <h2>{{ entreprise.nom }}</h2>
            <p>{{ entreprise.adresse }}</p>
            <p>Téléphone : {{ entreprise.telephone }}</p>
            <p>Télécopieur : {{ entreprise.telecopieur }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Entreprises',
    data() {
      return {
        entreprises: [
          {
            id: 1,
            nom: 'Mediavox',
            adresse: '985, rue Royale, Trois-Rivières, G9A 4H7',
            telephone: '819 373-2325',
            telecopieur: '819 373-8805',
            logoUrl: 'src/assets/mediavox-logo.jpg'
          },
          {
            id: 2,
            nom: 'Mediavox',
            adresse: '985, rue Royale, Trois-Rivières, G9A 4H7',
            telephone: '819 373-2325',
            telecopieur: '819 373-8805',
            logoUrl: 'src/assets/mediavox-logo.jpg'
          }
        ]
      }
    },
    methods: {
      ajouterEntreprise() {
        this.$router.push({ name: 'EntrepriseAjout' })
      }
    }
  }
  </script>
  
  <style scoped>
  .content {
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
  button {
    width: 20%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #89a9e6;
    color: black;
    font-weight: bold;
  }
  button:hover {
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
  }
  </style>
  