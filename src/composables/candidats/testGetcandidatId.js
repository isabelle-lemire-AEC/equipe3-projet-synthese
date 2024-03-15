
import axios from 'axios';

const getCandidatById = async (id) => {
  try {
    const response = await axios.get(`https://api-3.fly.dev/candidates/${id}`);
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

const candidatId = 'tonIdDeCandidat';
getCandidatById("65eccc40873054ca29c00bc2");



