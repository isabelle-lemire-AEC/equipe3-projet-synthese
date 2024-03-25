<!-- EntrepriseDetails -->
<template>
  <div v-if="entreprise" class="entreprise-detail-container">
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
    <div class="entreprise-detail-wrapper">
      <div class="crud-icons">
        <i class="fa-solid fa-check" style="color: green"></i>
        <i class="fa-solid fa-pen-to-square" @click="mettreAjour" style="color: gray"></i>
        <i class="fa-solid fa-trash-can" @click="supprimerEntreprise" style="color: red"></i>
      </div>
      <div class="entreprise-detail-container">
        <div class="entreprise-content">
          <h2 class="section-title"><span>Courte présentation</span></h2>
          <p>{{ entreprise.description }}</p>
          <div class="contact-section">
            <h3 class="section-title">Personne contact</h3>
            <p>Louise St-Cyr</p>
            
            <h3 class="section-title">Information de contact</h3>
            <div class="grid-container">
              <div class="adresse">
                <div class="info-item">
                  <h4>Adresse</h4>
                  <p>{{ entreprise.address }}</p>
                </div>
              </div>
              <div class="ville">
                <div class="info-item">
                  <h4>Ville</h4>
                  <p>{{ entreprise.city }}</p>
                </div>
              </div>
              <div class="province">
                <div class="info-item">
                  <h4>Province</h4>
                  <p>{{ entreprise.province.value }}</p>
                </div>
              </div>
              <div class="cp">
                <div class="info-item">
                  <h4>Code postal</h4>
                  <p>{{ entreprise.postalCode }}</p>
                </div>
              </div>
              <div class="telephone">
                <div class="info-item">
                  <h4>Téléphone</h4>
                  <p>{{ entreprise.phone }}</p>
                </div>
              </div>
              <div class="courriel">
                <div class="info-item">
                  <h4>Courriel</h4>
                  <p>{{ entreprise.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { useRouter } from 'vue-router'; 
  import logoEntreprise from '@/assets/logo-ent.jpg';

  export default {
    name: 'EntrepriseDetails',
    
    data() {
      return {
        entreprise: null,
        logoEntreprise, // Logo de l'entreprise
      };
    },
    methods: {
      async chargerEntreprise() {
        try {
          // Récupération des détails de l'entreprise à partir de l'API
          const response = await axios.get(`https://api-3.fly.dev/enterprises/${this.$route.params.id}`);
          this.entreprise = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des détails de l'entreprise:", error);
        }
      },
      mettreAjour() {
        // Redirection vers la page de mise à jour de l'entreprise
        this.$router.push({ name: 'EntrepriseMiseAjour', params: { id: this.entreprise._id } });
      },
      async supprimerEntreprise() {
        // Suppression de l'entreprise après confirmation
        if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
          try {
            await axios.delete(`https://api-3.fly.dev/enterprises/${this.$route.params.id}`);
            // Redirection vers la page des entreprises après la suppression
            this.$router.push({ name: 'Entreprises' });
          } catch (error) {
            console.error('Erreur lors de la suppression de l\'entreprise:', error);
          }
        }
      }
    },
    mounted() {
      // Chargement des détails de l'entreprise au montage du composant
      this.chargerEntreprise();
    }
  }
</script>

<style scoped>
  .entreprise-detail-container {
    width: 90%;
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }

  .entreprise-header-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 1rem;
  }
  .entreprise-detail-wrapper {
    position: relative;
    width: 100%;
    padding: 1rem;
  }
  .crud-icons {
    font-size: 20px;
    position: absolute;
    top: -10px;
    right: 90px;
    display: flex;
    gap: 25px;
  }
  .entreprise-content {
    width: 100%;
    background-color: white;
    margin: 0 auto;
    padding: 20px;
  }
  .info-item {
    border-left: 8px solid grey;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .section-title {
    color: #89a9e6;
    font-size: 1rem;
  }
  h2 span {
    font-weight: bold;
    font-size: 30px;
  }
  p span {
    font-weight: bold;
    font-size: 20px;
    color: gray;
  }
  p {
    color: gray;
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

  .nom-container {
    flex: 0 1 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 5px solid #89a9e6;
    padding-left: 1rem;
  }
  h3 {
    margin-top: 0;
    color: gray;
  }
  .nom-container h2 {
    color: gray;
    font-weight: bold;
    font-size: 30px;
  }
  .entreprise-nom {
    margin: 0;
    margin-bottom: 2rem;
  }

  .section-title {
    font-weight: bold;
    margin: 1rem 0 0.5rem;
    color: #89a9e6;
    line-height: 2.5rem;
  }

  .contact-section .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
</style>
