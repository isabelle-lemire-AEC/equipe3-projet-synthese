<!-- CandidatDetails.vue - Donaria  -->
<template>
  <div class="candidat candidat-card-details" v-if="candidat">
    <div class="border">
    <p>Candidat</p>
    <h2 class="candidat-name">{{ candidat.firstName }} {{ candidat.lastName }}</h2>
    <p class="candidat-role">UX Designer</p>
    </div>
    <div class="button-group">
      <button class="btn approve"> <img src="../assets/icons8-tick-box-48.png" alt="Icon"></button>
      <button class="btn edit"> <img src="../assets/icons8-write-24.png" alt="Icon"></button>
      <button class="btn delete"> <img src="../assets/icons8-delete-24.png" alt="Icon"></button>
    </div>

    <div class="description">
      <section class="presentation">
        <h2>Courte présentation</h2>
        <p>{{ candidat.description }}</p>
      </section>
      <section class="personal-info">
        <h3>Informations personnelles</h3>
        <div class="info-row">
          <div class="info-column">
            <div class="info-item">
              <h4>Adresse</h4>
              <p>{{ candidat.address }}</p>
            </div>

            <div class="info-item">
              <h4>Ville</h4>
              <p>{{ candidat.city }}</p>
            </div>

            <div class="info-item">
              <h4>Province</h4>
              <p>{{ candidat.province.value }}</p>
            </div>

            <div class="info-item">
              <h4>Code postal</h4>
              <p>{{ candidat.postalCode }}</p>
            </div>

          </div>
          <div class="info-column">
            <div class="info-item">
              <h4>Téléphone</h4>
              <p>{{ candidat.phone }}</p>
            </div>

            <div class="info-item">
              <h4>Courriel</h4>
              <p>{{ candidat.email }}</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
data() {
  return {
    candidat: null
  };
},
async created() {
  const candidatId = this.$route.params.id;
  try {
    const response = await axios.get(`https://api-3.fly.dev/candidates/${candidatId}`);
    this.candidat = response.data;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}
}
</script>


<style scoped>
.candidat {
background-color: #ececee;
padding: 80px 200px 80px 200px;
}

.candidat-card-details {
width: 900px;
margin: 0 auto;
font-family: Arial, sans-serif;
color: #333;
}

.candidat-name {
font-size: 24px;
font-weight: bold;
margin: 0;
}

.candidat-role {
font-size: 20px;
color: #666;
margin-bottom: 0;
background-color: #fff;
padding: 5px;
display: inline-block;
}

.presentation h2 {
font-size: 24px;
font-weight: bold;
margin-bottom: 30px;
}

.info-row {
display: flex;
justify-content: space-between;
}

.info-column {
width: 45%;
}

.button-group {
display: flex;
justify-content: flex-end;
margin-bottom: 20px;
}

.btn {
cursor: pointer;
border: none;
}

.description {
background-color: #fff;
padding: 30px 50px 40px 60px;
}

.personal-info {
padding-top: 20px;
}

h2,
h3 {
color: purple;
}

.border{
border-left: 5px solid purple;
padding-left: 1em;
}
</style>
