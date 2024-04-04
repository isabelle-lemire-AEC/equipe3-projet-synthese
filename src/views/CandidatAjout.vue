<!-- CandidatAjout.vue -->
<template>
  <div class="form-fiche formulaire-ajout-candidat">
    <div class="form-fiche__wrapper-titre">
      <h1>Ajouter un candidat</h1>
    </div>

    <form id="ajout-candidat" @submit.prevent="soumettreFormulaire">
      
      <!-- Boutons annuler et sauvegarder -->
      <BtnAnnulerModifierSauvegarder
        class="form-fiche__boutons-haut"
        buttonText="Sauvegarder"
        buttonClass="bouton bouton--mauve">
      </BtnAnnulerModifierSauvegarder>

      <div class="form-fiche__input-hors-encadre">
        <div class="form-fiche__label-input-horizontal">
          <label for="fullName">Nom et prénom :</label>
          <div class="form-fiche__wrapper-input-msg-erreur">
            <input type="text" id="fullName" v-model.trim="fullName" @input="splitFullName">
            <p class="error-message" v-if="erreurs.fullName">
                Veuillez remplir ce champs.
            </p>
          </div>
        </div>
        <div class="form-fiche__label-input-horizontal">
          <label for="poste">Poste :</label>
          <div class="form-fiche__wrapper-input-msg-erreur">
            <input
              type="text"
              id="poste"
              v-model.trim="candidat.poste"
              @input="validerChamp('poste')"
            />
            <p class="error-message" v-if="erreurs.poste">
              Veuillez remplir ce champs.
            </p>
          </div>
        </div>
      </div>

      <!-- Section encadré blanc -->
      <div class="form-fiche__encadre">
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h2>Courte présentation</h2>
          <div>
            <label for="description" hidden>Description</label>
            <textarea
              name="description"
              id="description"
              rows="6"
              v-model.trim="candidat.description"
              @input="validerChamp('description')">
            </textarea>
            <p class="error-message" v-if="erreurs.description">
              Veuillez remplir ce champs.
            </p>
          </div>
        </div>

        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3>Informations personnelles</h3>

          <div class="form-fiche__colonnes-inputs">
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <label for="address">Adresse</label>
                <div>
                  <input
                    type="text"
                    id="address"
                    v-model.trim="candidat.address"
                    @input="validerChamp('address')"
                  />
                  <p class="error-message" v-if="erreurs.address">
                    Veuillez remplir ce champs.
                  </p>
                </div>
              </div>

              <div class="form-fiche__label-input-vertical">
                <label for="city">Ville</label>
                <div>
                  <input
                    type="text"
                    id="city"
                    v-model.trim="candidat.city"
                    @input="validerChamp('city')"
                  />
                  <p class="error-message" v-if="erreurs.city">
                    Veuillez remplir ce champs.
                  </p>
                </div>
              </div>

              <div class="form-fiche__label-input-vertical">
                <label for="province">Province</label>
                <div>
                  <select id="province" v-model="candidat.province">
                    <option value="" disabled selected>
                      Choisissez votre province
                    </option>
                    <option
                      v-for="province in provinces"
                      :key="province._id"
                      :value="province"
                    >
                      {{ province.value }}
                    </option>
                  </select>
                  <p class="error-message" v-if="erreurs.province">
                    Veuillez effectuer un choix.
                  </p>
                </div>
              </div>
              <div class="form-fiche__label-input-vertical">
                <label for="postalCode">Code postal</label>
                <div>
                  <input
                    type="text"
                    id="postalCode"
                    v-model.trim="candidat.postalCode"
                    @input="validerChamp('postalCode')"
                  />
                  <p class="error-message" v-if="erreurs.postalCode">
                    Veuillez remplir ce champs.
                  </p>
                </div>
              </div>
            </div>

            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <label for="phone">Téléphone</label>
                <div>
                  <input
                    type="text"
                    id="phone"
                    v-model.trim="candidat.phone"
                    @input="validerChamp('phone')"
                  />
                  <p class="error-message" v-if="erreurs.phone">
                    Veuillez remplir ce champs.
                  </p>
                </div>
              </div>

              <div class="form-fiche__label-input-vertical">
                <label for="email">Courriel</label>
                <div>
                  <input
                    type="email"
                    id="email"
                    v-model.trim="candidat.email"
                    @input="validerChamp('email')"
                  />
                  <p class="error-message" v-if="erreurs.email">
                    Veuillez remplir ce champs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BtnAnnulerModifierSauvegarder
        buttonText="Sauvegarder"
        buttonClass="bouton bouton--mauve">
      </BtnAnnulerModifierSauvegarder>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCandidat } from "@/composables/candidats/candidat";
import { fetchProvinces } from "@/composables/api";
import BtnAnnulerModifierSauvegarder from "../components/BtnAnnulerModifierSauvegarder.vue";

const router = useRouter();
const { addCandidat } = useCandidat();
const provinces = ref([]);
const showModal = ref(false);

const candidat = ref({
  firstName: "",
  lastName: "",
  poste: "",
  description: "",
  skills: "React, Vue.js, et CSS",
  address: "",
  phone: "",
  city: "",
  email: "",
  province: {
    _id: "",
    value: "",
  },
  postalCode: "",
});

const erreurs = ref({
  fullName: false,
  firstName: false,
  lastName: false,
  poste: false,
  description: false,
  address: false,
  phone: false,
  city: false,
  email: false,
  province: false,
  postalCode: false,
});

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^\d{10}$/;
const regexPostalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

const initProvinces = async () => {
  try {
    provinces.value = await fetchProvinces();
  } catch (error) {
    console.error("Erreur lors de la récupération des provinces :", error);
  }
};

initProvinces();

// fonction pour joindre nom et prénom
const fullName = ref('');

const splitFullName = () => {
  const names = fullName.value.split(' ');
  candidat.value.firstName = names[0] || '';
  candidat.value.lastName = names.slice(1).join(' ') || '';
};

const validerChamp = (champ) => {
  switch (champ) {
    case "fullName":
      erreurs.value.fullName = !candidat.value.firstName.trim() && !candidat.value.lastName.trim();
      break;
    case "firstName":
      erreurs.value.firstName = !candidat.value.firstName.trim();
      break;
    case "lastName":
      erreurs.value.lastName = !candidat.value.lastName.trim();
      break;
    case "poste":
      erreurs.value.poste = !candidat.value.poste.trim();
      break;
    case "description":
      erreurs.value.description = !candidat.value.description.trim();
      break;
    case "address":
      erreurs.value.address = !candidat.value.address.trim();
      break;
    case "city":
      erreurs.value.city = !candidat.value.city.trim();
      break;
    case "email":
      erreurs.value.email = !regexEmail.test(candidat.value.email);
      break;
    case "phone":
      erreurs.value.phone = !regexPhone.test(candidat.value.phone);
      break;
    case "province":
      erreurs.value.province = !candidat.value.province.value.trim();
      break;
    case "postalCode":
      erreurs.value.postalCode = !regexPostalCode.test(
        candidat.value.postalCode
      );
      break;
  }
};

const validerFormulaire = () => {
  const champs = Object.keys(erreurs.value);
  champs.forEach((champ) => validerChamp(champ));
  return Object.values(erreurs.value).some((err) => err);
};

const soumettreFormulaire = async () => {
  const isFormInvalid = validerFormulaire();

  if (isFormInvalid) {
    showModal.value = true;
    console.error("Veuillez remplir tous les champs obligatoires.");
  } else {
    try {
      splitFullName();
      const response = await addCandidat(candidat.value);
      if(response === undefined) {
        console.log("Nouveau candidat ajouté");
        router.push({ name: "Candidats" });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du candidat :", error);
    }
  }
};

</script>

<style scoped>

</style>
