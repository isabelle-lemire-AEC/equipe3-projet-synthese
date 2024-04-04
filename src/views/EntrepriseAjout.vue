<!-- EntrepriseAjout -->
<template>
  <div class="form-fiche formulaire-ajout-entreprise">
    <div class="form-fiche__wrapper-titre">
      <h1>Ajouter une entreprise</h1>
    </div>
    <form id="ajout-entreprise" @submit.prevent="soumettreFormulaireEntreprise">

    <div class="form-fiche__wrapper-boutons-inputs">

      <!-- Boutons annuler et sauvegarder -->
      <BtnAnnulerModifierSauvegarder
        class="form-fiche__boutons-haut"
        buttonText="Sauvegarder"
        buttonClass="bouton bouton--bleu">
      </BtnAnnulerModifierSauvegarder>

      <div class="form-fiche__input-hors-encadre">
        <div class="form-fiche__colonne-inputs">
          <div class="form-fiche__label-input-horizontal">
            <label for="nom">Entreprise :</label>
            <div class="form-fiche__wrapper-input-msg-erreur">
              <input type="text" id="nom" v-model.trim="entreprise.name" @input="validerChamp('name')" />
              <p class="error-message" v-if="erreurs.name">Veuillez remplir ce champs.</p>
            </div>
          </div>
          <div class="form-fiche__label-input-horizontal">
            <label for="logo">Logo :</label>
            <div class="form-fiche__wrapper-input-msg-erreur form-fiche__input-parcourir">
              <input type="text" id="logo" v-model.trim="entreprise.image" @input="validerChamp('image')" />
              <button disabled>Parcourir</button>
              <p class="error-message" v-if="erreurs.image">Veuillez remplir ce champs.</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div class="form-fiche__wrapper-boutons-inputs">
      <div class="form-fiche__encadre">
        <div class="form-fiche__colonne-inputs">
          <h2>Courte présentation</h2>
          <div>
            <label for="presentation" class="form-fiche__label--cache" hidden>Présentation</label>
            <textarea id="presentation" cols="30" rows="10" v-model.trim="entreprise.description"
                      @input="validerChamp('description')"></textarea>
            <p class="error-message" v-if="erreurs.description">Veuillez remplir ce champs.</p>
          </div>

          <div
               class="form-fiche__label-input-vertical form-fiche__colonne-inputs form-fiche__label-input-demi">
            <label for="contactPerson">Personne contact :</label>
            <div>
              <input
                     type="text"
                     id="contactPerson"
                     v-model.trim="entreprise.contactPerson"
                     @input="validerChamp('contactPerson')"

                     class="largeur-100" />
              <p class="error-message" v-if="erreurs.contactPerson">Veuillez remplir ce champs.</p>
            </div>
          </div>
        </div>

        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3>Informations de contact</h3>
          <div class="form-fiche__colonnes-inputs">
            <!-- Colonne Gauche -->
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <label for="adresse">Adresse :</label>
                <div>
                  <input type="text" id="adresse" v-model.trim="entreprise.address" @input="validerChamp('address')" />
                  <p class="error-message" v-if="erreurs.address">Veuillez remplir ce champs.</p>
                </div>
              </div>
              <div class="form-fiche__label-input-vertical">
                <label for="ville">Ville :</label>
                <div>
                  <input type="text" id="ville" v-model.trim="entreprise.city" @input="validerChamp('city')" />
                  <p class="error-message" v-if="erreurs.city">Veuillez remplir ce champs.</p>
                </div>
              </div>  
              <div class="form-fiche__label-input-vertical">
                <label for="province">Province :</label>
                <div>
                  <select id="province" v-model="entreprise.province._id">
                    <option v-for="province in provinces" :key="province._id" :value="province._id" >
                      {{ province.value }}
                    </option>
                  </select>
                  <p class="error-message" v-if="erreurs.province"> Veuillez effectuer un choix. </p>
                </div>
              </div>
              <div class="form-fiche__label-input-vertical">
                <label for="cp">Code postal :</label>
                <div>
                  <input type="text" id="cp" v-model.trim="entreprise.postalCode" @input="validerChamp('postalCode')" />
                  <p class="error-message" v-if="erreurs.postalCode"> Veuillez remplir ce champs. </p>
                </div>
              </div>
            </div>
            <!-- Colonne droite -->
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <label for="telephone">Téléphone :</label>
                <div>
                  <input type="text" id="telephone" v-model.trim="entreprise.phone" @input="validerChamp('phone')" />
                  <p class="error-message" v-if="erreurs.phone">
                    Veuillez remplir ce champs.
                  </p>
                </div>
              </div>              
              <div class="form-fiche__label-input-vertical">
                <label for="courriel">Courriel :</label>
                <div> 
                  <input type="email" id="courriel" v-model.trim="entreprise.email" @input="validerChamp('email')" />
                  <p class="error-message" v-if="erreurs.email"> Veuillez remplir ce champs.</p>
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
</div>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useEntreprise } from '@/composables/entreprises/entreprise';
  import { fetchProvinces } from '@/composables/api';

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
      console.error("Vous ne pouvez pas sauvegarder car des champs obligatoires ne sont pas remplis.");
    } else {
      try {
        const response = await ajouterEntreprise(entreprise.value);
        if (response === undefined)
        {
          router.push({ name: "Entreprises" });
        }
      } catch (error) {
        console.error("Erreur lors de la soumission du formulaire :", error);
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

</style>