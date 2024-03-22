<!-- CandidatMiseAjour.vue - Isa  -->

<template>
    <div class="container">
        <div class="border-left-titre" v-if="candidat">
            <h3>Candidat</h3>
            <h1>{{ candidat.firstName }} {{ candidat.lastName }}</h1>
            <h2>UX Designer</h2>
        </div>

        <form id="edition-candidat" @submit.prevent="soumettreFormulaire">
            
            <div>
                <button class="annuler" type="submit" @click="annulerModif">Annuler</button>
                <button class="mettre-a-jour" type="submit"><i class="fas fa-save"></i>Mettre à jour</button>
            </div>

            <div class="section">
                <div>
                    <h2>Courte présentation</h2>
                    <label for="description"></label>
                    <textarea name="description" id="description" cols="30" rows="10" v-model="candidat.description"></textarea>
                </div>
                
                <div>
                    <h3>Inormations personnelles</h3>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="address">Adresse</label>
                            <input type="text" id="address" v-model="candidat.address">
                        </div>
                        <div class="col-droite border-left">
                            <label for="phone">Téléphone</label>
                            <input type="text" id="phone" v-model="candidat.phone">
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="city">Ville</label>
                            <input type="text" id="city" v-model="candidat.city">
                        </div>
                        <div class="col-droite border-left">
                            <label for="email">Courriel</label>
                            <input type="email" id="email" v-model="candidat.email">
                        </div>
                    </div>
                    <div class="border-left">
                        <label for="province"></label>
                        <select id="province" v-model="candidat.province">
                            <option value="">Province</option>
                            <option v-for="province in provinces" 
                                :key="province._id" 
                                :value="province">{{ province.value }}
                            </option>

                        </select>
                    </div>
                    <div class="border-left">
                        <label for="postalCode">Code postal</label>
                        <input type="text" id="postalCode" v-model="candidat.postalCode">
                    </div>
                </div>
            </div>

            <div>
                btn à mettre quand prog ok
            </div>
        </form>
    </div>
</template>


<script setup>
    import { useCandidat } from '@/composables/candidats/candidat';
    import { fetchProvinces } from '@/composables/api';
    
    const { getCandidatById, editCandidat } = useCandidat();
    
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const provinces = ref([]);
    
    const candidat = ref({
        firstName: '',
        lastName: '',
        poste: '',
        description: '',
        skills: "test",
        address: '',
        phone: '',
        city: '',
        email: '',
        province: { _id: '', value: '' },
        postalCode: ''
    });

    const initProvinces = async () => {
        try {
            provinces.value = await fetchProvinces();
        } catch (error) {
            console.error("Erreur lors de la récupération des provinces :", error);
        }
    }

    const modifCandidat = async () => {
        try {
            if (!validerFormulaire()) {
                throw new Error("Veuillez remplir tous les champs obligatoires.");
            }
            console.log("Tentative de modification du candidat :", candidat.value);
            console.log("URL de la requête PATCH :", `https://api-3.fly.dev/candidates/${candidat.value._id}`);
            await editCandidat(candidat.value._id, candidat.value); // Passez candidat.value._id en premier argument
            console.log("Candidat modifié");
            router.push({ name: 'Candidats' });
        } catch (error) {
            console.error("Erreur lors de la modification du candidat :", error);
        }
    }

    const annulerModif = () => {
        console.log("Annuler la modification du candidat");
        route.push({ name: 'Candidats' });
    }

    const soumettreFormulaire = async () => {
        try {
            await modifCandidat();
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
    }

    initProvinces();

    const validerFormulaire = () => {
        if (!candidat.value.firstName ||
            !candidat.value.lastName ||
            !candidat.value.email ||
            !candidat.value.address ||
            !candidat.value.phone ||
            !candidat.value.city ||
            !candidat.value.province ||
            !candidat.value.postalCode) {
            return false;
        }
        return true;
    }

    onMounted(async () => {
        try {
            const candidatId = route.params.id;
            candidat.value = await getCandidatById(candidatId);
        } catch (error) {
            console.error("Erreur lors de la récupération du candidat par ID :", error);
        }
    });
</script>

<style scoped>
    .container {
        padding:80px 200px 80px 200px;
        background-color: #ececee;
    }

    .section {
        background: white;
        padding: 50px;
        border-radius: 25px;
        margin: 25px 0;
    }

    .section h2 {
        font-size: 50px;
        color: purple;
    }

    .border-left-titre {
        border-left: 10px solid purple;
        padding-left: 25px;
    }

    .border-left {
        border-left: 10px solid gray;
        padding-left: 10px;
        margin-bottom: 25px;
    }

    input[type=text], input[type=email], textarea {
        margin-bottom: 10px;
        width: 100%;
    }

    input[type=text], input[type=email] {
        min-height: 50px;
    }

    .label-flex {
        width: 15%;
    }

    .col-gauche {
        width: 50%;
    }

    .col-droite {
        width: 50%
    }

    .padding-right-15 {
        padding-right: 15px;
    }

    .mettre-a-jour {
        background-color: purple;
        color: #fff;
        border-radius: 5px;
        padding: 10px 20px;
        margin-bottom: 50px;
        border:none;
        cursor: pointer;
    }

    .mettre-a-jour:hover{
        background-color: rgb(53, 5, 53);
    }

    .annuler {
        border-radius: 5px;
        padding: 10px 20px;
        margin-bottom: 50px;
    }

    button {
        margin-right: 15px;
    }
</style>