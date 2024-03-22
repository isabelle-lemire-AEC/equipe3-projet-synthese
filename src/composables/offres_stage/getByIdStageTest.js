import axios from 'axios';


const getInternshipOfferById = async (id) => {
  try {
    const response = await axios.get(`https://api-3.fly.dev/internship-offers/${id}`);
    console.log("Success: Obtained internship offer by ID", response.data);
  } catch (err) {
    console.error("Error: Failed to obtain internship offer by ID", err);
  }
};

// Remplace "65ecd2360321b1c87f2b6325" par l'ID réel de l'offre de stage que tu souhaites récupérer
getInternshipOfferById("65ecd2360321b1c87f2b6325");
