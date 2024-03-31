<!-- EntrepriseMiseAjour -->
<template>
  <div class="form-fiche formulaire-edition-entreprise">

    <div class="form-fiche__wrapper-titre-logo">
      <img class="entreprise-logo" :src="logoEntreprise" :alt="entreprise.name" />
      <div class="form-fiche__wrapper-titre">
        <p class="form-fiche__nom-section">Entreprise</p>
        <h1 class="entreprise-nom">{{ entreprise.name }}</h1>
      </div>
    </div>

    <form id="edition-entreprise" @submit.prevent="mettreAJourEntreprise">

      <!-- Logo de l'entreprise -->
      <!-- <div class="logo-container">
        <img class="entreprise-logo" :src="logoEntreprise" alt="Logo de l'entreprise" />
      </div> -->
      <div class="form-fiche__wrapper-boutons-inputs">
        <div class="boutons">
          <button class="bouton bouton--transparent" @click="$router.go(-1)">Annuler</button>
          <button class="bouton bouton--bleu" type="submit">
            <div class="icone-libelle">
              <i class="fas fa-save"></i>
              <span>Mettre à jour</span>
            </div>
          </button>
        </div>

        <div class="form-fiche__input-hors-encadre">
          <div class="form-fiche__label-input-horizontal">
            <label for="nom">Entreprise</label>
            <input id="nom" type="text" v-model="entreprise.name" />
          </div>

          <div class="form-fiche__label-input-horizontal form-fiche__input-parcourir">
            <label for="logo">Logo</label>
            <input id="logo" type="text" v-model="entreprise.image" />
            <button disabled>Parcourir</button>
          </div>
        </div>
      </div>

      <div class="form-fiche__wrapper-boutons-inputs">
        <div class="form-fiche__encadre">
          <div class="form-fiche__wrapper-titre-groupe-inputs">
            <h2>Courte présentation</h2>
            <div>
              <label for="presentation" hidden>Présentation de l'entreprise</label>
              <textarea name="presentation" id="presentation" cols="30" rows="10"
                        v-model="entreprise.description"></textarea>
            </div>

            <!-- Personne de contact -->
            <div class="form-fiche__label-input-vertical form-fiche__label-input-demi ">
              <label for="contactPerson">Personne de contact</label>
              <input id="contactPerson" type="text" v-model="entreprise.contactPerson" />
            </div>
          </div>

          <!-- Informations de contact -->
          <div class="form-fiche__wrapper-titre-groupe-inputs">
            <h3>Informations de contact</h3>
            <div class="form-fiche__colonnes-inputs">
              <div class="form-fiche__colonne-inputs">
                <div class="form-fiche__label-input-vertical">
                  <label for="adresse">Adresse</label>
                  <input type="text" id="adresse" v-model="entreprise.address" />
                </div>

                <div class="form-fiche__label-input-vertical">
                  <label for="ville">Ville</label>
                  <input type="text" id="ville" v-model="entreprise.city" />
                </div>

                <div class="form-fiche__label-input-vertical">
                  <label for="province">Province</label>
                  <select id="province" v-model="entreprise.province._id">
                    <option v-for="province in provinces" :key="province._id" :value="province._id">
                      {{ province.value }}
                    </option>
                  </select>
                </div>

                <div class="form-fiche__label-input-vertical">
                  <label for="cp">Code postal</label>
                  <input type="text" id="cp" v-model="entreprise.postalCode" />
                </div>
              </div>

              <div class="form-fiche__colonne-inputs">
                <div class="form-fiche__label-input-vertical">
                  <label for="telephone">Téléphone</label>
                  <input type="text" id="telephone" v-model="entreprise.phone" />
                </div>

                <div class="form-fiche__label-input-vertical">
                  <label for="courriel">Courriel</label>
                  <input type="email" id="courriel" v-model="entreprise.email" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="boutons">
          <button class="bouton bouton--transparent" type="button" @click="$router.go(-1)">Annuler</button>
          <button class="bouton bouton--bleu" type="submit">
            <div class="icone-libelle">
              <i class="fas fa-save"></i>
              <span>Mettre à jour</span>
            </div>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
  import axios from "axios";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import logoEntreprise from "../assets/mediavox-logo.jpg";

  import BtnAnnuler from '../components/BtnAnnuler.vue';


  export default {
    name: "EntrepriseMiseAjour",
    props: ["id"], // Ajoutez cette ligne
    data() {
      return {
        entreprise: {
          name: "",
          image: "",
          description: "",
          contactPerson: "",
          address: "",
          phone: "",
          city: "",
          email: "",
          province: {
            _id: "",
            value: ""
          },
          postalCode: "",
        },
        provinces: [], // Ajoutez cette ligne
        logoEntreprise,
      };
    },
    methods: {
      async mettreAJourEntreprise() {
        try {
          // Mise à jour de l'entreprise en utilisant une requête PATCH
          const response = await axios.patch(
            `https://api-3.fly.dev/enterprises/${this.$route.params.id}`,
            this.entreprise
          );
          // Si la mise à jour est réussie, redirection vers la page des entreprises
          if (response.status === 200) {
            this.$router.push({
              name: "Entreprises"
            });
          }
        } catch (error) {
          // Affichage d'une erreur en cas d'échec de la mise à jour
          console.error("Erreur lors de la mise à jour de l'entreprise:", error);
        }
      },
      async fetchProvinces() {
        // Ajoutez cette fonction
        try {
          const response = await axios.get("https://api-3.fly.dev/provinces");
          this.provinces = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des provinces :", error);
        }
      },
    },
    async mounted() {
      try {
        // Récupération des détails de l'entreprise lors du montage du composant
        const response = await axios.get(
          `https://api-3.fly.dev/enterprises/${this.$route.params.id}`
        );
        this.entreprise = response.data;
        this.fetchProvinces(); // Récupérez les provinces lors du montage du composant
      } catch (error) {
        // Affichage d'une erreur en cas d'échec de la récupération des détails de l'entreprise
        console.error("Erreur lors de la récupération de l'entreprise:", error);
      }
    },
  };
</script>

<style scoped>
  /*.entete {
  background-color: brown;
}

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
}*/

  .logo-container {
    flex: 0 1 20%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .entreprise-logo {
    max-width: 20%;
    height: auto;
  }
</style>