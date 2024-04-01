<!-- EntrepriseAjout -->
<template>
  <div class="form-fiche formulaire-ajout-entreprise">
    <div class="form-fiche__wrapper-titre">
      <h1>Ajouter une entreprise</h1>
    </div>
    <form id="ajout-entreprise" @submit.prevent="soumettreFormulaireEntreprise">

        <BtnAnnulerModifierSauvegarder 
          buttonText="Sauvegarder" 
          buttonClass="bouton bouton--bleu">
        </BtnAnnulerModifierSauvegarder>

      <div class="form-fiche__input-hors-encadre">
        <div class="form-fiche__label-input-horizontal">
          <label for="nom">Entreprise :</label>
          <div class="form-fiche__wrapper-input-msg-erreur">
            <input
              type="text"
              id="nom"
              v-model.trim="entreprise.name"
              @input="validerChamp('name')"
              placeholder="Inscrivez la dénomination de l'entreprise"
            />
            <p class="error-message" v-if="erreurs.name">
              Ce champ est obligatoire
            </p>
          </div>
        </div>
        <div class="form-fiche__label-input-horizontal">
          <label for="logo">Logo (URL) :</label>
          <div class="form-fiche__wrapper-input-msg-erreur">
            <input
              type="text"
              id="logo"
              v-model.trim="entreprise.image"
              @input="validerChamp('image')"
            />
            <p class="error-message" v-if="erreurs.image">
              L'URL du logo est obligatoire
            </p>
          </div>
        </div>
      </div>
      <div class="form-fiche__encadre">
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h2>Courte présentation</h2>
          <div>
            <label for="presentation" class="form-fiche__label--cache"
              >Présentation</label
            >
            <textarea
              id="presentation"
              cols="30"
              rows="10"
              v-model.trim="entreprise.description"
              @input="validerChamp('description')"
              placeholder="Donner une courte description de l'entreprise..."
            ></textarea>
            <p class="error-message" v-if="erreurs.description">
              Ce champ est obligatoire
            </p>
          </div>
        </div>
        <div
          class="form-fiche__label-input-vertical form-fiche__colonne-inputs"
        >
          <label for="contactPerson">Personne contact :</label>
          <div>
            <input
              type="text"
              id="contactPerson"
              v-model.trim="entreprise.contactPerson"
              @input="validerChamp('contactPerson')"
              placeholder="Nom de la personne à contacter"
              class="largeur-100"
            />
            <p class="error-message" v-if="erreurs.contactPerson">
              Ce champ est obligatoire
            </p>
          </div>
        </div>
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3>Informations de contact</h3>
          <div class="form-fiche__colonnes-inputs">
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <label for="adresse">Adresse :</label>
                <div>
                  <input
                    type="text"
                    id="adresse"
                    v-model.trim="entreprise.address"
                    @input="validerChamp('address')"
                    placeholder="123 Rue Principale"
                  />
                  <p class="error-message" v-if="erreurs.address">
                    Ce champ est obligatoire
                  </p>
                </div>
              </div>
              <div class="form-fiche__label-input-vertical">
                <label for="telephone">Téléphone :</label>
                <div>
                  <input
                    type="text"
                    id="telephone"
                    v-model.trim="entreprise.phone"
                    @input="validerChamp('phone')"
                    placeholder="1234567890"
                  />
                  <p class="error-message" v-if="erreurs.phone">
                    Ce champ est obligatoire
                  </p>
                </div>
              </div>
              <div class="form-fiche__label-input-vertical">
                <label for="ville">Ville :</label>
                <div>
                  <input
                    type="text"
                    id="ville"
                    v-model.trim="entreprise.city"
                    @input="validerChamp('city')"
                    placeholder="Toronto"
                  />
                  <p class="error-message" v-if="erreurs.city">
                    Ce champ est obligatoire
                  </p>
                </div>
              </div>
            </div>
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <label for="courriel">Courriel :</label>
                <div>
                  <input
                    type="email"
                    id="courriel"
                    v-model.trim="entreprise.email"
                    @input="validerChamp('email')"
                    placeholder="exemple@domaine.com"
                  />
                  <p class="error-message" v-if="erreurs.email">
                    Ce champ est obligatoire
                  </p>
                </div>
              </div>
              <div class="form-fiche__label-input-vertical">
                <label for="province">Province :</label>
                <div>
                  <select id="province" v-model="entreprise.province._id">
                    <option
                      v-for="province in provinces"
                      :key="province._id"
                      :value="province._id"
                    >
                      {{ province.value }}
                    </option>
                  </select>
                  <p class="error-message" v-if="erreurs.province">
                    Ce champ est obligatoire
                  </p>
                </div>
              </div>
              <div class="form-fiche__label-input-vertical">
                <label for="cp">Code postal :</label>
                <div>
                  <input
                    type="text"
                    id="cp"
                    v-model.trim="entreprise.postalCode"
                    @input="validerChamp('postalCode')"
                    placeholder="M5V 3J5"
                  />
                  <p class="error-message" v-if="erreurs.postalCode">
                    Ce champ est obligatoire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BtnAnnulerModifierSauvegarder 
        buttonText="Sauvegarder" 
        buttonClass="bouton bouton--bleu">
      </BtnAnnulerModifierSauvegarder>

    </form>
  </div>

  <div v-if="modalShow" class="modal">
    <div class="modal-content">
      <span class="close" @click="fermerModal">&times;</span>
      <p>{{ modalMessage }}</p>
      <div class="modal-footer">
        <button class="btn non" @click="annulerEnregistrement">Non</button>
        <button class="btn oui" @click="confirmerEnregistrement">Oui</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useEntreprise } from '@/composables/entreprises/entreprise';
  import { fetchProvinces } from '@/composables/api';

  import BtnAnnuler from '../components/BtnAnnuler.vue';
  import BtnAnnulerModifierSauvegarder from '../components/BtnAnnulerModifierSauvegarder.vue'

const router = useRouter();
const { ajouterEntreprise } = useEntreprise();
const modalShow = ref(false);
const modalMessage = ref("");

const provinces = ref([]);
const entreprise = ref({
  name: "",
  image:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACgAB/1TD9R8AAAAASUVORK5CYII=",
  contactPerson: "",
  description: "",
  address: "",
  phone: "",
  city: "",
  email: "",
  province: { _id: "", value: "" },
  postalCode: "",
  activitySector: {
    _id: "65f27444cbefd230d7c90949",
    value: "securite pour entreprise",
  },
  website: "valeur par défaut",
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

const initProvinces = async () => {
  try {
    provinces.value = await fetchProvinces();
  } catch (error) {
    console.error("Erreur lors de la récupération des provinces :", error);
  }
};

initProvinces();

const validerFormulaire = () => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^\d{10}$/;
  const regexPostalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  const regexAddress = /^[0-9a-zA-Z\s,.'-]{3,}$/;
  const regexCity = /^[a-zA-Z\s.-]{2,}$/;

  erreurs.value.name = entreprise.value.name.trim() === "" ? true : false;
  erreurs.value.email = !regexEmail.test(entreprise.value.email.trim());
  erreurs.value.phone = regexPhone.test(entreprise.value.phone.trim()) ? "" : "Le numéro de téléphone doit être un numéro canadien valide.";
  erreurs.value.postalCode = !regexPostalCode.test(
    entreprise.value.postalCode.trim()
  );
  erreurs.value.address = entreprise.value.address.trim() === "" ? true : false;
  erreurs.value.city = entreprise.value.city.trim() === "" ? true : false;

  return Object.values(erreurs.value).some((err) => err);
};

const soumettreFormulaireEntreprise = async () => {
  if (validerFormulaire()) {
    modalMessage.value =
      "Vous ne pouvez pas sauvegarder car des champs obligatoires ne sont pas remplis.";
    modalShow.value = true;
  } else {
    try {
      await ajouterEntreprise(entreprise.value);
      modalMessage.value =
        "Votre nouvelle entreprise est enregistrée. Voulez-vous continuer?";
      modalShow.value = true;
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      modalMessage.value = "Une erreur s'est produite lors de la sauvegarde.";
      modalShow.value = true;
    }
  }
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

const fermerModal = () => {
  modalShow.value = false;
};

const confirmerEnregistrement = async () => {
  modalShow.value = false;
  router.push({ name: "Entreprises" });
};

const annulerEnregistrement = () => {
  modalShow.value = false;
  router.push({ name: "Entreprises" });
};
</script>

<style scoped>
.error {
  color: red;
}

.modal-content {
  width: 400px;
  height: 200px;
  background-color: #eee;
  border: 1px solid cyan;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.close {
  align-self: flex-end;
  cursor: pointer;
  font-size: 1rem;
  color: fff;
  background-color: black;
  border-radius: 50%;
  padding: 10px;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.btn {
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;
  width: 30%;

  &.non {
    background-color: red;
  }

  &.oui {
    background-color: green;
  }
}
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
