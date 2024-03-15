<!-- CandidatCardDetails.vue - Donaria  -->
<template>
  <div class="candidat-card-details">
    <h2 class="candidat-name">Plume Latraverse</h2>
    <p class="candidat-role">UX Designer</p>

    <div class="button-group">
      <button class="btn approve"> <img src="../assets/icons8-tick-box-48.png" alt="Icon"></button>
      <button class="btn edit"> <img src="../assets/icons8-write-24.png" alt="Icon"></button>
      <button class="btn delete"> <img src="../assets/icons8-delete-24.png" alt="Icon"></button>
    </div>

    <div class="description">
      <section class="presentation">
        <h3>Courte présentation</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit
          amet quam justo. Aliquam interdum facilisis eros, ut dapibus quam
          hendrerit nec. Vestibulum vel blandit lorem. Praesent laoreet quis
          tortor quis pharetra. Nulla dictum erat id nisl pulvinar, ac aliquam
          lectus laoreet. Aliquam.
        </p>
      </section>
      <section class="personal-info">
        <h4>Informations personnelles</h4>
        <div class="info-row">
          <div class="info-column">
            <p>Adresse</p>
            <p>3500 de Courval</p>
            <p>Ville</p>
            <p>Trois-Rivières</p>
            <p>Province</p>
            <p>Québec</p>
            <p>Code postal</p>
            <p>G9Z4Y4</p>
          </div>
          <div class="info-column">
            <p>Téléphone</p>
            <p>819 693 9999</p>
            <p>Courriel</p>
            <p>plume@latraverse.com</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.candidat-card-details {
  width: 900px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #333;
}

.candidat-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.candidat-role {
  font-size: 20px;
  color: #666;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 5px;
  display: inline-block;
}

.presentation h3 {
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
  border:none;
}

.description {
  background-color: #fff;
  padding: 30px 50px 40px 60px;
}

.personal-info {
  padding-top: 20px;
}

h3,
h4 {
  color: purple;
}
</style>
