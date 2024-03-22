import axios from 'axios';




const getAllOffers = async () => {
  try {
    const response = await axios.get('https://api-3.fly.dev/internship-offers');
    console.log("get offer ça marche", response.data);
  } catch (err) {
    console.log("get offer ça marche pas", err);
  }
};

// Exécuter la fonction getAllOffers et afficher le résultat dans le terminal
getAllOffers();
