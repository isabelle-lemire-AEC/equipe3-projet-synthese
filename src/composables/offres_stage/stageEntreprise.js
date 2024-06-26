import { ref } from "vue";
import axios from "axios";

export function useEntreprise() {
    const response = ref();
    const responseALL = ref([]);
    const error = ref(null);
    const loading = ref(false);

    //     const entreprises = ref([]);
    // const entreprise = ref({});
    // const error = ref(null);
    // const loading = ref(false);


    const addEntreprise = async (entrepriseData) => {
        loading.value = true;
        try {
            response.value = await axios.post('https://api-3.fly.dev/enterprises', entrepriseData);
            console.log("Success: Entreprise posted");
        } catch (err) {
            error.value = err;
            console.log("Error: Failed to post entreprise");
        } finally {
            loading.value = false;
        }
    }

    const editEntreprise = async (id, entrepriseData) => {
        loading.value = true;
        try {
            response.value = await axios.patch(`https://api-3.fly.dev/enterprises/${id}`, entrepriseData);
            console.log("Entreprise eddition ca marche");
        } catch (error) {
            error.value = error;
            console.log("edition erreur");
        } finally {
            loading.value = false;
        }
    }

    const getEntrepriseById = async (id) => {
        loading.value = true;
        try {
            response.value = await axios.get(`https://api-3.fly.dev/enterprises/${id}`);
            console.log("Get edition by id ca marche");
        } catch (err) {
            error.value = err;
            console.log("error vous n'avez pas obetenue l'edition");
        } finally {
            loading.value = false;
        }
    }

    const getAllEntreprises = async () => {
        loading.value = true;
        try {
            responseALL.value = await axios.get('https://api-3.fly.dev/enterprises');
            console.log("Get all entreprises ça marche", responseALL.value);
            return responseALL.value;
        } catch (err) {
            error.value = err;
            console.log("Erreur en récupérant toutes les entreprises");
        } finally {
            loading.value = false;
        }
    }
    
const deleteEntreprise = async (id) => {
        loading.value = true;
        try {
            response.value = await axios.delete(`https://api-3.fly.dev/enterprises/${id}`);
            console.log("L'entreprise a été retiré");
        } catch (error) {
            error.value = error;
            console.log("erreur vous n'avez pas effacé l'entreprise");
        } finally {
            loading.value = false;
        }
        
    }

    return { addEntreprise, editEntreprise, getEntrepriseById, deleteEntreprise, getAllEntreprises, response, responseALL, error, loading };
}

