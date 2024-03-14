// addEntrepriseTest.js
import axios from 'axios';
import { ref } from 'vue';


const entrepriseData = {
  "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACgAB/1TD9R8AAAAASUVORK5CYII=",
  "name": "Les réseaux du nord",
  "address": "6767 des Colibries",
  "postalCode": "J5T 0B4",
  "city": "St-Zenon",
  "province": {
    "_id": "65e4dff388da6547197b1225",
    "value": "PRINCE EDWARD ISLAND"
  },
  "phone": "514-444-2222",
  "email": "truite_ping@hotmail.ca",
  "description": "Groupe de reseautage",
  "activitySector": {
    "_id": "65f27444cbefd230d7c90949",
    "value": "securite pour entreprise"
  },
  "website": "reseau_nord@gmail.com"
};

const addEntreprise = async () => {
  try {
    // Remplace cette URL par l'URL correcte de ton API
    const response = await axios.post('https://api-3.fly.dev/enterprises', entrepriseData);
    console.log("Success: Entreprise added", response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

addEntreprise();
