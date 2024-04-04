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
          class="form-fiche__boutons-haut" 
          buttonText="Mettre à jour" 
          buttonClass="bouton bouton--bleu">
        </BtnAnnulerModifierSauvegarder>

        <div class="form-fiche__input-hors-encadre">
          <div class="form-fiche__label-input-horizontal">
            <label for="nom">Entreprise</label>
            <input id="nom" type="text" v-model="entreprise.name" />
            <p class="error-message" v-if="erreurs.name">Veuillez remplir ce champs.</p>
          </div>

          <div class="form-fiche__label-input-horizontal form-fiche__input-parcourir">
            <label for="logo">Logo</label>
            <div class="form-fiche__input-parcourir">
              <input id="logo" type="text" v-model="entreprise.image" />
              <button disabled>Parcourir</button>
              <p class="error-message" v-if="erreurs.image">Veuillez remplir ce champs.</p>
            </div>
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
              <p class="error-message" v-if="erreurs.description">Veuillez remplir ce champs.</p>
            </div>

            <!-- Personne de contact -->
            <div class="form-fiche__label-input-vertical form-fiche__label-input-demi ">
              <label for="contactPerson">Personne de contact</label>
              <input id="contactPerson" type="text" v-model="entreprise.contactPerson" value="Isabelle Lemire" />
              <p class="error-message" v-if="erreurs.contactPerson">Veuillez remplir ce champs.</p>
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
                  <p class="error-message" v-if="erreurs.address">Veuillez remplir ce champs.</p>
                </div>

                <div class="form-fiche__label-input-vertical">
                  <label for="ville">Ville</label>
                  <input type="text" id="ville" v-model="entreprise.city" />
                  <p class="error-message" v-if="erreurs.city">Veuillez remplir ce champs.</p>
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
                  <p class="error-message" v-if="erreurs.postalCode">Veuillez remplir ce champs.</p>
                </div>
              </div>

              <div class="form-fiche__colonne-inputs">
                <div class="form-fiche__label-input-vertical">
                  <label for="telephone">Téléphone</label>
                  <input type="text" id="telephone" v-model="entreprise.phone" />
                  <p class="error-message" v-if="erreurs.phone">Veuillez remplir ce champs.</p>
                </div>

                <div class="form-fiche__label-input-vertical">
                  <label for="courriel">Courriel</label>
                  <input type="email" id="courriel" v-model="entreprise.email" />
                  <p class="error-message" v-if="erreurs.email">Veuillez remplir ce champs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BtnAnnulerModifierSauvegarder 
          buttonText="Mettre à jour" 
          buttonClass="bouton bouton--bleu">
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
    contactPerson: "Isabelle Lemire",
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

  const erreurs = ref({
    name: false,
    image: false,
    description: false,
    address: false,
    phone: false,
    city: false,
    email: false,
    province: false,
    postalCode: false,
  });

  const provinces = ref([]);

  // Fonction pour mettre à jour l'entreprise
  const mettreAJourEntreprise = async () => {
    if (validerFormulaire()) {
      console.error("Vous ne pouvez pas sauvegarder car des champs obligatoires ne sont pas remplis.");
    }
    else {
      try {
        console.log("entreprise.value: ", entreprise.value);
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
      entreprise.value.contactPerson = "Isabelle Lemire";
      console.log("entreprise.value: ", entreprise.value);
      // Récupérer les provinces lors du chargement de l'entreprise
      await fetchProvinces();
    } catch (error) {
      console.error("Erreur lors de la récupération de l'entreprise:", error);
    }
  };

  // Appeler la fonction chargerEntreprise au montage du composant
  chargerEntreprise();
  
  const validerFormulaire = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPhone = /^\d{10}$/;
    const regexPostalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const regexAddress = /^[0-9a-zA-Z\s,.'-]{3,}$/;
    const regexCity = /^[a-zA-Z\s.-]{2,}$/;

    erreurs.value.name = entreprise.value.name === undefined || entreprise.value.name === null || entreprise.value.name === '';
    erreurs.value.image = entreprise.value.image === undefined || entreprise.value.image === null || entreprise.value.image === '';
    erreurs.value.description = entreprise.value.description === undefined || entreprise.value.description === null || entreprise.value.description.trim() === '';
    erreurs.value.contactPerson = entreprise.value.contactPerson === undefined || entreprise.value.contactPerson === null || entreprise.value.contactPerson.trim() === '';
    erreurs.value.province = entreprise.value.province._id === undefined || entreprise.value.province._id === null || entreprise.value.province._id.trim() === '';
    erreurs.value.email = !regexEmail.test(entreprise.value.email);
    erreurs.value.phone = !/^\d{10}$/.test(entreprise.value.phone.trim());
    // erreurs.value.phone = regexPhone.test(entreprise.value.phone) ? "" : "Le numéro de téléphone doit être un numéro canadien valide.";
    erreurs.value.postalCode = !regexPostalCode.test(
      entreprise.value.postalCode
    );
    erreurs.value.address = entreprise.value.address.trim() === "" ? true : false;
    erreurs.value.city = entreprise.value.city.trim() === "" ? true : false;

    return Object.values(erreurs.value).some((err) => err);
  };

  const validerChamp = (champ) => {
    switch (champ) {
      case "name":
        erreurs.value.name = entreprise.value.name.trim() === "";
        break;
      case "email":
        erreurs.value.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          entreprise.value.email.trim()
        );
        break;
      case "phone":
        erreurs.value.phone = !/^\d{10}$/.test(entreprise.value.phone.trim());
        break;
      case "address":
        erreurs.value.address = entreprise.value.address.trim() === "";
        break;
      case "city":
        erreurs.value.city = entreprise.value.city.trim() === "";
        break;
      case "postalCode":
        erreurs.value.postalCode = !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(
          entreprise.value.postalCode.trim()
        );
        break;
      case "image":
        erreurs.value.image = entreprise.value.image.trim() === "";
        break;
      case "description":
        erreurs.value.description = entreprise.value.description.trim() === "";
        break;
      case "contactPerson":
        erreurs.value.contactPerson =
          entreprise.value.contactPerson.trim() === "";
        break;
      case "province":
        erreurs.value.province = entreprise.value.province._id.trim() === "";
        break;
    }
  };

</script>


<style scoped>

</style>