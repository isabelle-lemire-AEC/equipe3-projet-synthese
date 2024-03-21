
import axios from 'axios';
import { ref } from 'vue';
// REMPLIR ENTREPRIZE AVEC LES VALEUR DUNE ENTREPRISE CRÉÉ AU PRÉALABLE RAPH ATTENTION***

const offerData = {
  title: "developeur debutent",
  description: "Recherche un développeur debutent.",
  enterprise: {
    _id: "65f27c246b6b31ec79d74019",
    image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACgAB/1TD9R8AAAAASUVORK5CYII=",
    name: "Les réseaux du nord",
    address: "6767 des Colibries",
    postalCode: "J5T 0B4",
    city: "St-bruno",
    province: {
      _id: "65e4dff388da6547197b1225",
      value: "PRINCE EDWARD ISLAND"
    },
    phone: "514-555-1234",
    email: "truite_ping@hotmail.ca",
    description: "Groupe de reseautage",
    activitySector: {
      _id: "65f27444cbefd230d7c90949",
      value: "securite pour entreprise"
    },
    website: "reseau_nord@gmail.com"
  },
  "startDate": "2024-03-14T16:48:11.067Z",
  "endDate": "2024-03-14T16:48:11.067Z",
  weeklyWorkHours: 30,
  salary: 200,
  province: {
    _id: "65e4dff388da6547197b1225",
    value: "PRINCE EDWARD ISLAND"
  },
  requiredSkills: ["Python"],
  internshipType: {
    _id: "65e4dffb88da6547197b1233",
    value: "PARTIAL"
  },
  paid: "DISCRETIONARY",
  isActive: true
};

export function ajouterUnOffre() {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // Ajouter une offre de stage
  const ajouterUnOffre = async (offerData) => {
    loading.value = true;
    try {
      response.value = await axios.post('https://api-3.fly.dev/internship-offers', offerData);
      // ``
      console.log("Offre joutée");
    } catch (err) {
      error.value = err;
      console.log("offre ajout erreur");
    } finally {
      loading.value = false;
    }
  };


  return { ajouterUnOffre, response, error, loading };
}
ajouterUnOffre(offerData);

console.log(offerData);