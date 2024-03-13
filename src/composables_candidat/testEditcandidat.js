import axios from 'axios';


const candidatId = '65eccc40873054ca29c00bc2';
const editCandidat = async (id, candidatData) => {
  try {
    const response = await axios.patch(`https://api-3.fly.dev/candidates/${id}`, candidatData);
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

// Les données fictives pour le test
const candidatDataToUpdate = {
  description: "test d'édition.",
  email: "jane.doe@example.com",
  firstName: "Jeanne",
  lastName: "Doe",
  address: "1234 Rue des Érables",
  phone: "514-966-4567",
  city: "VilleTech",
  skills: ["React", "Vue.js", "CSS"],
  province: { _id: "65e4dff388da6547197b1229", value: "NUNAVUT", __v: 0 },
  postalCode: "K1A 0B1"
};

editCandidat(candidatId, candidatDataToUpdate);
