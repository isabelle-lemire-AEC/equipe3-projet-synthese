<!-- ModalSuppression.vue -->
<template>
  <div class="modal" v-if="showConfirmationModal">
    <div class="modal__contenu">
      <p>{{ message }}</p>
      <div class="modal__boutons">
        <button class="bouton bouton--rouge" @click="annulerSuppression">Annuler</button>
        <button class="bouton bouton--vert" @click="confirmerSuppression">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps({
  showConfirmationModal: Boolean,
  message: String,
});

const emit = defineEmits(['annulerSuppression', 'confirmerSuppression']);

const annulerSuppression = () => {
  emit('annulerSuppression');
};

const confirmerSuppression = () => {
  emit('confirmerSuppression');
};
</script>
