
import axios from 'axios';
import { ref } from 'vue';
// REMPLIR ENTREPRIZE AVEC LES VALEUR DUNE ENTREPRISE CRÉÉ AU PRÉALABLE RAPH ATTENTION***

const offerData = {
  "title": "Développeur Front-End Innovant",
    "description": "Recherche un développeur front-end passionné par la création d'expériences utilisateur captivantes et l'innovation technologique.",
    "enterprise": {
      "_id": "65ecc6e68ba959c0b0e17864",
      "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACgAB/1TD9R8AAAAASUVORK5CYII=",
      "name": "THE_SPIDER_WEB",
      "address": "1800 RUE DES sapins",
      "postalCode": "H7L 0B2",
      "city": "VILLE ST-GEORGE",
      "province": {
        "_id": "65e4dff388da6547197b121b",
        "value": "QUEBEC"
      },
      "phone": "514-966-6782",
      "email": "SPIDE@VLOUD.CA",
      "description": "CIE EOUVRENT DANS LA TOILE",
      "activitySector": {
        "_id": "65ecc4cde6bb4d85fbad0437",
        "value": "WEB"
      },
      "website": "THE_SPIDER_WEB.CA"
    },
    "startDate": "2024-04-01T00:00:00.000Z",
    "endDate": "2024-10-31T00:00:00.000Z",
    "weeklyWorkHours": 40,
    "salary": 50000,
    "province": {
      "_id": "65e4dff388da6547197b1229",
      "value": "NUNAVUT"
    },
    "requiredSkills": [
      "React",
      "Vue.js",
      "CSS"
    ],
    "internshipType": {
      "_id": "65e4dffb88da6547197b1233",
      "value": "PARTIAL"
  },
  "paid": "DISCRETIONARY",
    "isActive": true
  }

  const ajouterUnOffre = async () => {

    try {
     const response = await axios.post('https://api-3.fly.dev/internship-offers', offerData);
     console.log("Success: Offre de stage ajouté added", response.data);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };
ajouterUnOffre();

