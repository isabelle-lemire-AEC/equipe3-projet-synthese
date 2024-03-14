
import axios from 'axios';
import { ref } from 'vue';

const offerData = {
  title: "developeur debutent",
  description: "Recherche un développeur debutent.",
  enterprise: {
    _id: "65ecc6e68ba959c0b0e17864",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
    name: "Petite arraignées",
    address: "1800 RUE DES sapins",
    postalCode: "H7L 0B2",
    city: "VILLE ST-GEORGE",
    province: {
      _id: "65e4dff388da6547197b121b",
      value: "QUEBEC"
    },
    phone: "514-966-6782",
    email: "SPIDE@VLOUD.CA",
    description: "CIE EOUVRENT DANS LA TOILE",
    activitySector: {
      _id: "65ecc4cde6bb4d85fbad0437",
      value: "WEB"
    },
    website: "www.techinnovate.ca"
  },
  startDate: "2024-04-01T09:00:00.000Z",
  endDate: "2024-10-31T17:00:00.000Z",
  weeklyWorkHours: 40,
  salary: 50000,
  province: {
    _id: "65e4dff388da6547197b1229",
    value: "NUNAVUT"
  },
  requiredSkills: ["React", "Vue.js", "CSS"],
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
      response.value = await axios.post('https://api-3.fly.dev/api#/default/InternshipOffers', offerData);
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

