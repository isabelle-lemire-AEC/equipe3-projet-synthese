<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <slot>
           {{ typeElement }} ?
        </slot>
        <div class="modal-buttons">
          <button @click="$emit('cancel')" class="cancel">Annuler</button>
          <button @click="$emit('confirm')" class="confirm">Confirmer</button>
        </div>
      </div>
    </div>
  </template>
  

<script>
export default {
  props: {
    isVisible: Boolean,
    typeElement: String
  },
  emits: ["cancel", "confirm"],
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-content {
    background: rgb(232, 238, 203);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 90%;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  button {
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .cancel {
    background-color: #e11c1c;
    color: white;

    &:hover {
      background-color: #bc5454;
    }
  }

  .confirm {
    background-color: #014310;
    color: white;

    &:hover {
      background-color: #72ae10;
    }
  }
}

</style>
