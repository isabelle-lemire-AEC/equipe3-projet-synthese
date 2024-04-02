<!-- CandidatAjout.vue -->
<template>
  <div class="form-fiche formulaire-ajout-candidat">
    <div class="form-fiche__wrapper-titre">
      <h1>Ajouter un candidat</h1>
    </div>

    <form id="ajout-candidat" @submit.prevent="soumettreFormulaire">
      <BtnAnnulerModifierSauvegarder
        buttonText="Sauvegarder"
        buttonClass="bouton bouton--mauve"
      >
      </BtnAnnulerModifierSauvegarder>

      <div class="form-fiche__input-hors-encadre">
        <div class="form-fiche__label-input-horizontal">
          <label for="firstName">Prénom:</label>
          <div class="form-fiche__wrapper-input-msg-erreur">
            <input
              type="text"
              id="firstName"
              v-model.trim="candidat.firstName"
              @input="validerChamp('firstName')"
              placeholder="Prénom du candidat"
            />
            <p class="error-message" v-if="erreurs.firstName">
              Le prénom est obligatoire
            </p>
          </div>
        </div>
        <div class="form-fiche__label-input-horizontal">
          <label for="lastName">Nom :</label>
          <div class="form-fiche__wrapper-input-msg-erreur">
            <input
              type="text"
              id="lastName"
              v-model.trim="candidat.lastName"
              @input="validerChamp('lastName')"
              placeholder="Nom du candidat"
            />
            <p class="error-message" v-if="erreurs.lastName">
              Le nom est obligatoire
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
              placeholder="Poste souhaité"
            />
            <p class="error-message" v-if="erreurs.poste">
              L'inscription du poste est requise
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
              cols="30"
              rows="10"
              v-model.trim="candidat.description"
              @input="validerChamp('description')"
              placeholder="Donnez une description de ce poste... "
            ></textarea>
            <p class="error-message" v-if="erreurs.description">
              La description est requise.
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
                    placeholder="123, rue des Champs "
                  />
                  <p class="error-message" v-if="erreurs.address">
                    L'adresse du candidat est requise
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
                    placeholder="Trois-Rivières "
                  />
                  <p class="error-message" v-if="erreurs.city">
                    Le nom de la vielle requis
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
                    Veuillez effectuer un choix
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
                    placeholder="G0X 1A0"
                  />
                  <p class="error-message" v-if="erreurs.postalCode">
                    Le code postal est requis.
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
                    placeholder="XXX000XXXX"
                  />
                  <p class="error-message" v-if="erreurs.phone">
                    Le numero de telephone est requis.
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
                    placeholder="email@e-stage.com"
                  />
                  <p class="error-message" v-if="erreurs.email">
                    L'email est requis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BtnAnnulerModifierSauvegarder
        buttonText="Sauvegarder"
        buttonClass="bouton bouton--mauve"
      >
      </BtnAnnulerModifierSauvegarder>
      <ModalChampRequis v-if="showModal" @close="showModal = false">
        <p>
          Un ou plusieurs champs ne sont pas correctement remplis. <br />
          Veuillez vérifier et réessayer.
        </p>
      </ModalChampRequis>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCandidat } from "@/composables/candidats/candidat";
import { fetchProvinces } from "@/composables/api";
import BtnAnnulerModifierSauvegarder from "../components/BtnAnnulerModifierSauvegarder.vue";
import ModalChampRequis from "../components/ModalChampRequis.vue";

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

const validerChamp = (champ) => {
  switch (champ) {
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
  // Vérifiez d'abord si le formulaire est valide.
  const isFormInvalid = validerFormulaire();

  if (isFormInvalid) {
    // Si le formulaire n'est pas valide, affichez un modal d'erreur.
    showModal.value = true;
    console.error("Veuillez remplir tous les champs obligatoires.");
  } else {
    // Si le formulaire est valide, essayez d'ajouter le candidat.
    try {
      await addCandidat(candidat.value);
      console.log("Nouveau candidat ajouté");
      router.push({ name: "Candidats" });
      // Ici, vous pouvez déclencher une action pour mettre à jour la liste globale si vous utilisez Vuex ou Pinia
    } catch (error) {
      console.error("Erreur lors de l'ajout du candidat :", error);
      // Vous pouvez aussi décider d'afficher le modal en cas d'erreur lors de l'ajout du candidat
      // showModal.value = true;
    }
  }
};

</script>

<style scoped>
input::placeholder,
textarea::placeholder {
  font-size: 14px;
  color: #cccccc;
  opacity: 1;
}

select::placeholder {
  color: #cccccc;
  opacity: 1;
}
.error-message {
  color: rgb(230, 93, 93);
  font-size: 0.75em;
  margin-top: 0.25em;
}
</style>
