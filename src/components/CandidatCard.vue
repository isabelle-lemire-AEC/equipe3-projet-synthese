<!-- CandidatCard.vue - Donaria -->
<template>
    <div class="candidat-card">
      <img src="../assets/icons8-account-96.png" alt="Candidate Icon">
      <div class="text-content">
        <h2>Plume Latraverse</h2>
        <p class="fonction">UX Designer</p>
        <p>plume@latraverse.com</p>
        <p>819 999 9999</p>
      </div>
    </div>
  </template>

<script></script>

<style scoped>
.candidat-card {
  display: flex;
  background-color: #fff;
  padding: 20px;
  width: 400px; 
  margin-bottom: 20px;
}

.candidat-card:hover{
    background-color: rgb(239, 206, 233);
    cursor: pointer;
}

.candidat-card img {
  background-color: purple;
  width: 33%; 
  height: auto; 
  margin-right: 10px; 
}

.text-content {
  width: 66%; 
}

.text-content h2, .text-content p {
  color: #000000;
  margin: 0;
  margin-bottom: 5px;
}

.fonction{
    padding-bottom: 30px;
}

</style>
