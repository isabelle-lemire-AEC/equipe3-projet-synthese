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
      <div class="form-fiche__wrapper-boutons-inputs">

        <!-- Boutons annuler et mettre à jour -->
        <BtnAnnulerModifierSauvegarder 
          buttonText="Mettre à jour" 
          buttonClass="bouton bouton--bleu">
        </BtnAnnulerModifierSauvegarder>

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

        <BtnAnnulerModifierSauvegarder 
          buttonText="Mettre à jour" 
          buttonClass="bouton bouton--mauve">
        </BtnAnnulerModifierSauvegarder>

      </div>
    </form>
  </div>
</template>


<script setup>
  import axios from "axios";
  import { useRoute, useRouter } from "vue-router";
  import { ref } from 'vue';

  import logoEntreprise from "../assets/mediavox-logo.jpg";
  import BtnAnnulerModifierSauvegarder from '../components/BtnAnnulerModifierSauvegarder.vue'

  const id = useRoute().params.id;
  const router = useRouter();

  const entreprise = ref({
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
  });

  const provinces = ref([]);

  // Fonction pour mettre à jour l'entreprise
  const mettreAJourEntreprise = async () => {
    try {
      const response = await axios.patch(
        `https://api-3.fly.dev/enterprises/${id}`,
        entreprise.value
      );
      // Redirection vers la page des entreprises si la mise à jour est réussie
      if (response.status === 200) {
        router.push({
          name: "Entreprises"
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'entreprise:", error);
    }
  };

  // Fonction pour récupérer les provinces depuis l'API
  const fetchProvinces = async () => {
    try {
      const response = await axios.get("https://api-3.fly.dev/provinces");
      provinces.value = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des provinces :", error);
    }
  };

  // Fonction pour charger les détails de l'entreprise
  const chargerEntreprise = async () => {
    try {
      const response = await axios.get(`https://api-3.fly.dev/enterprises/${id}`);
      entreprise.value = response.data;
      // Récupérer les provinces lors du chargement de l'entreprise
      await fetchProvinces();
    } catch (error) {
      console.error("Erreur lors de la récupération de l'entreprise:", error);
    }
  };

  // Appeler la fonction chargerEntreprise au montage du composant
  chargerEntreprise();
  
</script>


<style scoped>

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