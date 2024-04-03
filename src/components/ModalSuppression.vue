<!-- Modal de confirmation de suppression -->
<template>
  <div class="modal" v-if="show">
    <div class="modal__contenu">
      <p>{{ message }}</p>
      <div class="modal__boutons">
        <button class="bouton bouton--rouge" @click="annulerSuppression">
          Annuler
        </button>
        <button class="bouton bouton--vert" @click="confirmerSuppression">
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  message: String,
  onConfirm: Function,
  onCancel: Function,
});

const showConfirmationModal = ref(false);

const annulerSuppression = () => {
  showConfirmationModal.value = false;
  if (props.onCancel) props.onCancel();
};

const confirmerSuppression = () => {
  showConfirmationModal.value = false;
  if (props.onConfirm) props.onConfirm();
};
</script>
