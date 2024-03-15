
import axios from "axios";
 // Remplacez par le vrai id de l'entreprise
const id = '65f27c246b6b31ec79d74019'; 
const entrepriseData = {
  "city": "St-bruno",
  "phone": "514-555-1234",
};

const editEntreprise = async (id, entrepriseData) => {
  try {
    // attention si dans les vrai appel la reponse est contenur dans une variable
    const response = await axios.patch(`https://api-3.fly.dev/enterprises/${id}`, entrepriseData);
    console.log("Success: Entreprise updated", response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

editEntreprise(id, entrepriseData);
