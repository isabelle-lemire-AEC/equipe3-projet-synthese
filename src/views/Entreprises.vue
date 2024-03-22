<template>
  <div class="content">
    <div class="grid">
      <router-link
        v-for="entreprise in entreprises"
        :key="entreprise._id"
        :to="{ name: 'EntrepriseDetail', params: { id: entreprise._id } }"
        class="card"
      >
        <div class="logo">
          <img :src="entreprise.image" alt="Logo de l'entreprise" />
        </div>
        <div class="informations">
          <h2>{{ entreprise.name }}</h2>
          <p>{{ entreprise.address }}</p>
          <p>Téléphone : {{ entreprise.phone }}</p>
          <p>Courriel : {{ entreprise.email }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useEntreprise } from "@/composables/entreprises/entreprise";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Entreprises",
  setup() {
    const { entreprises, chargerEntreprises } = useEntreprise();
    const router = useRouter();

    onMounted(() => {
      chargerEntreprises();
    });

    const goToEntrepriseDetail = (entrepriseId) => {
      router.push({ name: "EntrepriseDetail", params: { id: entrepriseId } });
    };

    return { entreprises, goToEntrepriseDetail };
  },
};
</script>

<style scoped>
.content {
  padding-left: 3rem;
  max-width: 80%;
  margin-top: 0;
  text-decoration: none;
}

.header {
  align-items: flex-start;
  gap: 2rem;
}

h2 {
  margin: 0;
  font-size: 2rem;
  margin-bottom: 20px;
}
div {
  padding-bottom: 20px;
}
button {
  width: 20%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #89a9e6;
  color: black;
  font-weight: bold;
}
button:hover {
  background-color: #507ac8;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.card {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 5px 3px gray;
}

.logo {
  flex-basis: 30%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  max-width: 100%;
  height: auto;
}

.informations {
  flex-basis: 70%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
}

.informations h2 {
  font-size: 1.5rem;
  margin: 0;
}

.informations p {
  font-size: 14px;
  margin: 0;
}
.card,
.card:link,
.card:visited,
.card:hover,
.card:active,
.card:focus {
  text-decoration: none;
  color: gray;
  outline: none;
}
</style>
