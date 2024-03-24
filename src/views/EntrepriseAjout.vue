<!-- EntrepriseAjout -->
<template>
  <div class="ajouter-entreprise-container">
    <div class="entreprise-header-card">
      <div class="nom-container">
        <h2 class="entreprise-nom">Ajouter une entreprise</h2>
      </div>
    </div>
    <form @submit.prevent="soumettreFormulaireEntreprise" class="entreprise-detail-wrapper">
      <div class="form-group">
        <label for="nom">Entreprise</label>
        <input id="nom" type="text" v-model="entreprise.name" />
        <p v-if="erreurs.name" class="error">Ce champ est obligatoire</p>
      </div>

      <div class="form-group">
        <label for="logo">Logo (URL)</label>
        <input id="logo" type="text" v-model="entreprise.image"
          placeholder="Entrez l'URL de l'image ou laissez vide pour l'image par défaut" />
        <p v-if="erreurs.image" class="error">Ce champ est obligatoire</p>
      </div>

      <div class="section">
        <h2 class="section-title"><span>Courte présentation</span></h2>
        <textarea id="presentation" v-model="entreprise.description"></textarea>
        <p v-if="erreurs.address" class="error">Ce champ est obligatoire</p>
        <h3>Personne contact</h3>
        <!-- Champ de saisie vide pour la personne de contact -->
        <input id="contactPerson" type="text" v-model="entreprise.contactPerson" />
        <p v-if="erreurs.address" class="error">Ce champ est obligatoire</p>
      </div>

      <div class="section">
        <h3 class="section-title">Informations de contact</h3>
        <div class="grid-container">
          <div class="form-group">
            <label for="adresse">Adresse</label>
            <input id="adresse" type="text" v-model="entreprise.address" />
            <p v-if="erreurs.address" class="error">Ce champ est obligatoire</p>
          </div>
          <div class="form-group">
            <label for="telephone">Téléphone</label>
            <input id="telephone" type="tel" v-model="entreprise.phone" />
            <p v-if="erreurs.address" class="error">Ce champ est obligatoire</p>
          </div>
          <div class="form-group">
            <label for="ville">Ville</label>
            <input id="ville" type="text" v-model="entreprise.city" />
            <p v-if="erreurs.address" class="error">Ce champ est obligatoire</p>
          </div>
          <div class="form-group">
            <label for="courriel">Courriel</label>
            <input id="courriel" type="email" v-model="entreprise.email" />
            <p v-if="erreurs.address" class="error">Ce champ est obligatoire</p>
          </div>
          <div class="form-group">
            <label for="province">Province</label>
            <select id="province" v-model="entreprise.province._id">
              <option v-for="province in provinces" :key="province._id" :value="province._id">
                {{ province.value }}
              </option>
            </select>
            <p v-if="erreurs.province" class="error">Ce champ est obligatoire</p>
          </div>
          <div class="form-group">
            <label for="cp">Code postal</label>
            <input id="cp" type="text" v-model="entreprise.postalCode" />
            <p v-if="erreurs.address" class="error">Ce champ est obligatoire</p>
          </div>
        </div>
      </div>
      <div class="form-buttons">
        <button type="button" class="cancel-button" @click="$router.go(-1)">Annuler</button>
        <button type="submit" class="save-button"><i class="fas fa-save"></i> Sauvegarder</button>
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
  import logoEntreprise from '@/assets/logo-ent.jpg';

  const router = useRouter();

  // Utilisation du composable d'entreprise
  const { ajouterEntreprise: ajouterEntrepriseAPI } = useEntreprise();

  // Initialisation des provinces
  const provinces = ref([]);

  // Initialisation de l'entreprise 
  const entreprise = ref({
    name: '',
    image: logoEntreprise, // Utilisez une image comme valeur par défaut
    description: '',
    address: '',
    phone: '',
    city: '',
    email: '',
    province: { _id: '', value: '' },
    postalCode: ''
  });

  // Fonction pour initialiser les provinces en faisant une requête à l'API
  const initProvinces = async () => {
    try {
      provinces.value = await fetchProvinces();
    } catch (error) {
      console.error("Erreur lors de la récupération des provinces :", error);
    }
  }

  initProvinces();

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
      console.log("Tentative d'ajout de l'entreprise :", entreprise.value);
      await ajouterEntrepriseAPI(entreprise.value);
      console.log("Nouvelle entreprise ajoutée");
      router.push({ name: 'Entreprises' });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'entreprise :", error);
    }
  };
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

  .error {
    color: red;
  }
</style>
