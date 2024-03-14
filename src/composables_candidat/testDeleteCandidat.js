import axios from 'axios';

const deleteCandidat = async (id) => {
  try {
    const response = await axios.delete('https://api-3.fly.dev/candidates/${id}');
    console.log("Success: Candidate deleted", response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

// Remplace 'tonIdDeCandidat' pour le tester amigo !
const candidatId = 'tonIdDeCandidat';
deleteCandidat(candidatId);
