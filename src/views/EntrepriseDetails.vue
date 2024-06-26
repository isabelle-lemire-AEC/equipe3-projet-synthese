<!-- EntrepriseDetails.vue-->
<template>
  <div v-if="entreprise" class="form-fiche fiche-entreprise-details">
    <!-- Affichage du logo de l'entreprise -->
    <div class="form-fiche__wrapper-titre-logo">
      <img
        class="entreprise-logo"
        :src="logoEntreprise"
        :alt="entreprise.name"
      />
      <div class="form-fiche__wrapper-titre">
        <p class="form-fiche__nom-section">Entreprise</p>
        <h1 class="entreprise-nom">{{ entreprise.name }}</h1>
      </div>
    </div>

    <!-- Boutons d'action pour modifier, valider ou supprimer l'entreprise -->
    <div class="form-fiche__wrapper-boutons-encadre">
      <div class="boutons-action">
        <button class="boutons-action__crochet">
          <i class="fa-solid fa-check"></i>
        </button>
        <button class="boutons-action__modifier" @click="mettreAjour">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <!-- Bouton de suppression -->
        <button class="boutons-action__supprimer" @click="afficherConfirmationModal">
          <i class="fas fa-square-xmark"></i>
        </button>
      </div>

      <!-- Informations sur l'entreprise -->
      <div class="form-fiche__encadre">
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h2>Courte présentation</h2>
          <p>{{ entreprise.description }}</p>
        </div>

        <!-- Contact de l'entreprise -->
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3>Personne contact</h3>
          <p class="nom-contact">Mathieu Thériault</p>
        </div>

        <!-- Informations de contact -->
        <div class="form-fiche__wrapper-titre-groupe-inputs">
          <h3 class="section-title">Information de contact</h3>
          <div class="form-fiche__colonnes-inputs">
            <div class="form-fiche__colonne-inputs">
              <div class="adresse">
                <div class="form-fiche__label-input-vertical">
                  <h4>Adresse</h4>
                  <p>{{ entreprise.address }}</p>
                </div>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Ville</h4>
                <p>{{ entreprise.city }}</p>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Province</h4>
                <p>{{ entreprise.province.value }}</p>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Code postal</h4>
                <p>{{ entreprise.postalCode }}</p>
              </div>
            </div>
            <div class="form-fiche__colonne-inputs">
              <div class="form-fiche__label-input-vertical">
                <h4>Téléphone</h4>
                <p>{{ entreprise.phone }}</p>
              </div>
              <div class="form-fiche__label-input-vertical">
                <h4>Courriel</h4>
                <p>{{ entreprise.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

   <!-- Modal de confirmation de suppression -->
   <ModalSuppression
      :showConfirmationModal="showConfirmationModal"
      :message="'Êtes-vous sûr de vouloir supprimer cette entreprise?'"
      @annulerSuppression="annulerSuppression"
      @confirmerSuppression="confirmerSuppression"
    />

</template>

<script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useRouter, useRoute } from "vue-router";
  import logoEntreprise from "@/assets/mediavox-logo.jpg";
  import ModalSuppression from '@/components/ModalSuppression.vue';
  import { defineProps } from 'vue';

  const entreprise = ref(null);
  const router = useRouter();
  const route = useRoute();
  const showConfirmationModal = ref(false);

  const props = defineProps({
  id: String, 
});

  // Fonction pour charger les détails de l'entreprise
  const chargerEntreprise = async () => {
    try {
      const response = await axios.get(
        `https://api-3.fly.dev/enterprises/${route.params.id}`
      );
      entreprise.value = response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'entreprise:",
        error
      );
    }
  };

  // Fonction pour mettre à jour l'entreprise
  const mettreAjour = () => {
    router.push({
      name: "EntrepriseMiseAjour",
      params: { id: entreprise.value._id },
    });
  };

  // Fonction pour afficher la modal de confirmation
  const afficherConfirmationModal = () => {
    showConfirmationModal.value = true;
  };

  // Fonction pour annuler la suppression
  const annulerSuppression = () => {
    showConfirmationModal.value = false;
  };

  // Fonction pour confirmer la suppression
  const confirmerSuppression = async () => {
    await supprimerEntreprise();
    showConfirmationModal.value = false;
  };

  const supprimerEntreprise = async () => {
    try {
      await axios.delete(`https://api-3.fly.dev/enterprises/${route.params.id}`);
      router.push({ name: 'Entreprises' });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'entreprise:", error);
    }
  };

  // Appel de la fonction pour charger les détails de l'entreprise au montage du composant
  chargerEntreprise();
</script>

<style scoped></style>
