<!-- EntrepriseMiseAjour -->
<template>
  <div class="ajouter-entreprise-container">
    <div class="entreprise-header-card">
        <div class="entreprise-header-card">
      <div class="logo-container">
         <!-- Affichage du logo de l'entreprise -->
         <img class="entreprise-logo" :src="logoEntreprise" alt="Logo de l'entreprise" />
        </div>
      <div class="nom-container">
        <h3>Entreprise</h3>
        <h2 class="entreprise-nom">{{ entreprise.name }}</h2>
      </div>
    </div>

      </div>
    </div>
    <div class="form-buttons">
      <button type="button" class="cancel-button" @click="$router.go(-1)">Annuler</button>
      <button type="submit" class="save-button">Mettre à jour</button>
    </div>
    <form @submit.prevent="mettreAJourEntreprise" class="entreprise-detail-wrapper">
      <div class="entreprise-info-card">
        <div class="form-group">
          <label for="nom">Entreprises</label>
          <input id="nom" type="text" v-model="entreprise.name" />
        </div>

        <div class="form-group">
          <label for="logo">Logo</label>
          <input id="logo" type="text" v-model="entreprise.image" />
        </div>
      </div>

      <div class="section">
        <h2 class="section-title"><span>Courte présentation</span></h2>
        <textarea id="presentation" v-model="entreprise.description"></textarea>
        <h3>Personne contact</h3>
        <!-- Champ de saisie vide pour la personne de contact -->
        <input id="contactPerson" type="text" v-model="entreprise.contactPerson" />

      </div>

      <div class="section">
        <h3 class="section-title">Informations de contact</h3>
        <div class="grid-container">
          <div class="form-group">
            <label for="adresse">Adresse</label>
            <input id="adresse" type="text" v-model="entreprise.address" />
          </div>
          <div class="form-group">
            <label for="telephone">Téléphone</label>
            <input id="telephone" type="tel" v-model="entreprise.phone" />
          </div>
          <div class="form-group">
            <label for="ville">Ville</label>
            <input id="ville" type="text" v-model="entreprise.city" />
          </div>
          <div class="form-group">
            <label for="courriel">Courriel</label>
            <input id="courriel" type="email" v-model="entreprise.email" />
          </div>
          <div class="form-group">
            <label for="province">Province</label>
            <input id="province" type="text" v-model="entreprise.province.value" />
          </div>
          <div class="form-group">
            <label for="cp">Code postal</label>
            <input id="cp" type="text" v-model="entreprise.postalCode" />
          </div>
        </div>
      </div>

      <div class="form-buttons">
        <button type="button" class="cancel-button" @click="$router.go(-1)">Annuler</button>
        <button type="submit" class="save-button">Mettre à jour</button>
      </div>
    </form>
</template>

<script>
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router'
  import logoEntreprise from '@/assets/logo-ent.jpg';

  export default {
    name: 'EntrepriseMiseAjour', 
    props: ['id'], // Ajoutez cette ligne
    data() {
      return {
        entreprise: {
          name: '',
          image: '',
          description: '',
          contactPerson: '',
          address: '',
          phone: '',
          city: '',
          email: '',
          province: { value: '' },
          postalCode: ''
        },
        logoEntreprise
      }
    },
    methods: {
      async mettreAJourEntreprise() {
        try {
          // Mise à jour de l'entreprise en utilisant une requête PUT
          const response = await axios.put(
            `https://api-3.fly.dev/enterprises/${this.$route.params.id}`,
            this.entreprise
          )
          // Si la mise à jour est réussie, redirection vers la page des entreprises
          if (response.status === 200) {
            this.$router.push({ name: 'Entreprises' })
          }
        } catch (error) {
          // Affichage d'une erreur en cas d'échec de la mise à jour
          console.error("Erreur lors de la mise à jour de l'entreprise:", error)
        }
      }
    },
    async mounted() {
      try {
        // Récupération des détails de l'entreprise lors du montage du composant
        const response = await axios.get(`https://api-3.fly.dev/enterprises/${this.$route.params.id}`)
        this.entreprise = response.data
      } catch (error) {
        // Affichage d'une erreur en cas d'échec de la récupération des détails de l'entreprise
        console.error("Erreur lors de la récupération de l'entreprise:", error)
      }
    }
  }
</script>


<style scoped>
  .ajouter-entreprise-container {
    width: 90%;
    margin: auto;
    padding: 1rem;
  }

  .entreprise-header-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem;
  }

  .nom-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 5px solid #89a9e6;
    padding-left: 1rem;
  }

  .entreprise-info-card {
    margin-bottom: 20px;
    width: 80%;
    padding: 1rem 0;
  }

  .entreprise-nom {
    color: gray;
    font-weight: bold;
    font-size: 30px;
    margin: 0;
    margin-bottom: 2rem;
  }

  .entreprise-detail-wrapper {
    position: relative;
    padding: 1rem;
  }

  .entreprise-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  }

  .section-title span {
    font-weight: bold;
    color: #89a9e6;
    font-size: 20px;
  }

  .section-title {
    color: #89a9e6;
  }

  .info-item {
    border-left: 8px solid grey;
    padding-left: 10px;
    width: 50%;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .form-group,
  .file-upload-group {
    margin-bottom: 1rem;
  }

  .info-item label {
    font-weight: bold;
    color: gray;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 0.5rem;
  }

  .file-input {
    border: none;
  }

  .form-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-right: 80px;
    margin-bottom: 50px;
  }

  .cancel-button,
  .save-button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cancel-button {
    background-color: white;
    border: 1px solid gray;
    color: gray;
  }

  .save-button {
    background-color: #89a9e6;
    color: white;
  }

  .save-button i.fas.fa-save {
    margin-right: 8px;
  }

  .logo-container {
    flex: 0 1 20%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .entreprise-logo {
    max-width: 60%;
    height: auto;
  }

</style>
