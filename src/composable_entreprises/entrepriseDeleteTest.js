import { ref } from "vue";
import axios from "axios";

const deleteEntreprise = async (id) => {
  try {
    const response = await axios.delete(`https://api-3.fly.dev/enterprises/${id}`);
    console.log("L'entreprise a été retiré", response.data);
  } catch (error) {
    console.error("Erreur, vous n'avez pas effacé l'entreprise", error.response ? error.response.data : error.message);
  }
};

const entrepriseId = '65f27c246b6b31ec79d74019';
deleteEntreprise(entrepriseId);
