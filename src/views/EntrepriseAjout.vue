<!-- EntrepriseAjout -->
<template>
  <div class="form-fiche formulaire-ajout-entreprise">
    <div class="form-fiche__wrapper-titre">
      <h1>Ajouter une entreprise</h1>
    </div>

    <form id="ajout-entreprise" @submit.prevent="soumettreFormulaireEntreprise">

      <div class="boutons">
        <button class="bouton bouton--transparent" type="button"  @click="$router.go(-1)">Annuler</button>
        <button class="bouton bouton--bleu" type="submit">
          <div class="icone-libelle">
            <i class="fas fa-save"></i>
            <span>Sauvegarder</span>
          </div>
        </button>
      </div>

      <div class="form-fiche__input-hors-encadre">
        <div class="form-fiche__label-input-horizontal">
          <label for="nom">Entreprise :</label>
          <div class="form-fiche__wrapper-input-msg-erreur">
            <input type="text" id="nom" v-model.trim="entreprise.name">
            <p class="validForm" v-if="erreurs.name">Ce champ est obligatoire</p>
          </div>
        </div>

        <div class="form-fiche__label-input-horizontal">
          <label for="logo">Logo (URL) :</label>
          <div class="form-fiche__wrapper-input-msg-erreur">
            <input type="text" id="logo" v-model.trim="entreprise.image" placeholder="Entrez l'URL de l'image ou laissez vide pour l'image par défaut">
            <p class="validForm" v-if="erreurs.image">Ce champ est obligatoire</p>
          </div>
        </div>
      </div>

      <div class="form-fiche__encadre">
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h2>Courte présentation</h2>
          <div>
            <label for="presentation" class="form-fiche__label--cache">Présentation</label>
            <textarea name="presentation" id="presentation" cols="30" rows="10" v-model.trim="entreprise.description"></textarea>
            <p class="validForm" v-if="erreurs.description">Ce champ est obligatoire</p>
          </div>
        </div>

        <div class="form-fiche__label-input-vertical form-fiche__colonne-inputs">
          <label for="contactPerson">Personne contact :</label>
          <div>
            <input type="text" id="contactPerson" v-model.trim="entreprise.contactPerson" class="largeur-100">
            <p class="validForm" v-if="erreurs.contactPerson">Ce champ est obligatoire</p>
          </div>
        </div>

        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3>Informations de contact</h3>

          <div class="form-fiche__colonnes-inputs">
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <label for="adresse">Adresse :</label>
                <div>
                  <input type="text" id="adresse" v-model.trim="entreprise.address">
                  <p class="validForm" v-if="erreurs.address">Ce champ est obligatoire</p>
                </div>
              </div>

              <div class="form-fiche__label-input-vertical">
                <label for="telephone">Téléphone :</label>
                <div>
                  <input type="text" id="telephone" v-model.trim="entreprise.phone">
                  <p class="validForm" v-if="erreurs.phone">Ce champ est obligatoire</p>
                </div>
              </div>

              <div class="form-fiche__label-input-vertical">
                <label for="ville">Ville :</label>
                <div>
                  <input type="text" id="ville" v-model.trim="entreprise.city">
                  <p class="validForm" v-if="erreurs.city">Ce champ est obligatoire</p>
                </div>
              </div>
            </div>

            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <label for="courriel">Courriel :</label>
                <div>
                  <input type="email" id="courriel" v-model.trim="entreprise.email">
                  <p class="validForm" v-if="erreurs.email">Ce champ est obligatoire</p>
                </div>
              </div>

              <div class="form-fiche__label-input-vertical">
                <label for="province">Province :</label>
                <div>
                  <select id="province" v-model="entreprise.province._id">
                    <option v-for="province in provinces" :key="province._id" :value="province._id">
                      {{ province.value }}
                    </option>
                  </select>
                  <p class="validForm" v-if="erreurs.province">Ce champ est obligatoire</p>
                </div>
              </div>

              <div class="form-fiche__label-input-vertical">
                <label for="cp">Code postal :</label>
                <div>
                  <input type="text" id="cp" v-model.trim="entreprise.postalCode">
                  <p class="validForm" v-if="erreurs.postalCode">Ce champ est obligatoire</p>
                </div>
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
            <span>Sauvegarder</span>
          </div>
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
  // Ajout entreprise - Dona
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useEntreprise } from '@/composables/entreprises/entreprise';
  import { fetchProvinces } from '@/composables/api';

  const router = useRouter();

  // Utilisation du composable d'entreprise
  const { ajouterEntreprise: ajouterEntrepriseAPI } = useEntreprise();

  // Initialisation des provinces
  const provinces = ref([]);

  // Initialisation de l'entreprise 
  const entreprise = ref({
    name: '',
    image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACgAB/1TD9R8AAAAASUVORK5CYII=',
    contactPerson: '',
    description: '',
    address: '',
    phone: '',
    city: '',
    email: '',
    province: { _id: '', value: '' },
    postalCode: '',
    activitySector: {_id: "65f27444cbefd230d7c90949",value: "securite pour entreprise"},
    website: 'valeur par défaut'
  });

  // Fonction pour initialiser les provinces en faisant une requête à l'API
  const initProvinces = async () => {
    try {
      console.log("Initialisation des provinces...");
      provinces.value = await fetchProvinces();
      console.log("Provinces récupérées avec succès :", provinces.value);
    } catch (error) {
      console.error("Erreur lors de la récupération des provinces :", error);
    }
  }

  console.log("Début de l'initialisation du formulaire d'ajout d'entreprise...");
  initProvinces();
  console.log("Fin de l'initialisation du formulaire d'ajout d'entreprise.");

  const formulaireValide = ref(false);

  // Initialisation des erreurs du formulaire 
  const erreurs = ref({
    name: false,
    image: false,
    description: false,
    address: false,
    phone: false,
    city: false,
    email: false,
    province: false,
    postalCode: false
  });

  // Fonction pour valider le formulaire
  const validerFormulaire = () => {
    erreurs.value.name = entreprise.value.name === '';
    erreurs.value.image = entreprise.value.image === '';
    erreurs.value.description = entreprise.value.description === '';
    erreurs.value.address = entreprise.value.address === '';
    erreurs.value.phone = entreprise.value.phone === '';
    erreurs.value.city = entreprise.value.city === '';
    erreurs.value.email = entreprise.value.email === '';
    erreurs.value.province = entreprise.value.province._id === ''; // Vérifiez l'_id de la province, pas la valeur
    erreurs.value.postalCode = entreprise.value.postalCode === '';

    // Retourne vrai si au moins une erreur est présente
    return Object.values(erreurs.value).some(err => err);
  };

  // Fonction pour soumettre le formulaire
  const soumettreFormulaireEntreprise = async () => {
    try {
      console.log('État du formulaire avant validation :', entreprise.value);
      console.log('État des erreurs avant validation :', erreurs.value);
      formulaireValide.value = validerFormulaire();
      console.log('Formulaire valide :', !formulaireValide.value);
      if (!formulaireValide.value) {
        await ajouterEntreprise();
      } else {
        throw new Error("Veuillez remplir tous les champs obligatoires.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  // Fonction pour ajouter une entreprise
  const ajouterEntreprise = async () => {
    try {
      // Validation des données
      if (validerDonnees(entreprise.value)) {
        console.log("Tentative d'ajout de l'entreprise :", entreprise.value);
        await ajouterEntrepriseAPI(entreprise.value);
        console.log("Nouvelle entreprise ajoutée avec succès :", entreprise.value);
        router.push({ name: 'Entreprises' });
      } else {
        // Afficher un message d'erreur à l'utilisateur
        console.error("Erreur : Données manquantes ou incorrectes.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'entreprise :", error);
    }
  };

  // Fonction pour valider les données de l'entreprise
  const validerDonnees = (entreprise) => {
    // Vérifier si les champs obligatoires sont présents et non vides
    if (
      entreprise.name.trim() !== '' &&
      entreprise.address.trim() !== '' &&
      entreprise.phone.trim() !== '' &&
      entreprise.email.trim() !== '' &&
      entreprise.province._id.trim() !== '' &&
      entreprise.postalCode.trim() !== ''
    ) {
      return true; // Les données sont valides
    } else {
      return false; // Les données sont invalides
    }
  };
</script>



<style scoped lang="scss">
 /* .ajouter-entreprise-container {
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

  .error {
    color: red;
  }*/
</style>
