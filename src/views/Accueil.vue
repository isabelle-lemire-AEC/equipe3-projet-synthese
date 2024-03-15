<!-- Accueil.vue -->
<template>
  <div class="app-container">
    <div class="logo-container">
    <img src="../assets/eStage-logo.png" alt="Logo" class="logo">
    </div>
    <div class="content-container">
      <img src="../assets/accueil.png" alt="Image" class="half-page-image"> 
      <div class="login-panel">
        <h1>Identification</h1>
        <p>Lorem ipsum magna aliqua ut enim ad minim veniam, quis <br> nostrud exercitation ullamco laboris nisi consequat</p>
        <form @submit.prevent="submitForm">
          <div class="form-group">
          <input type="text" id="name" v-model="name" placeholder="Votre nom et prénom" required>
        </div>
        <div class="form-group">
          <input type="email" id="email" v-model="email" placeholder="Votre courriel" required>
        </div>
          <button type="submit">Accéder maintenant</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: ''
    }
  },
  methods: {
    submitForm() {
      // Logique pour le formulaire
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}

.logo-container {
  justify-content: center;
  width: 100%;
  padding: 20px 0;
}

.logo {
  width: 150px;
  height: auto;
}

h1{
  font-size: 60px;
 }

 img{
  height: 70%;
 }

.content-container {
  display: flex;
  width: 100%;
}


.half-page-image {
  width: 50%;
  height: auto;
}

.login-panel {
  width: 50%;
  background-color: rgb(240, 239, 239);
  padding: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.login-panel p{
padding-bottom: 80px;
}

.form-group {
  margin-bottom: 20px;
  width: 70%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 70%;
  padding: 10px;
  border: 2px solid rgb(59, 198, 184);
}

button {
  display: block;
  width: 16%;
  padding: 10px;
  background-color: rgb(59, 198, 184);
  color: white;
  border: none;
  cursor: pointer;
}

button:hover{
  background-color: rgb(38, 108, 101);
}
</style>
