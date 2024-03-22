<!-- CandidatAjout.vue - Isa  -->
<template>
    <div class="container">
        <h1>Ajouter un candidat</h1>

        <form id="ajout-candidat" @submit.prevent="soumettreFormulaire">
            
            <div>
                <button class="annuler" type="submit" @click="annulerAjout">Annuler</button>
                <button class="mettre-a-jour" type="submit"><i class="fas fa-save"></i>Sauvegarder</button>
            </div>

            <div class="flex">
                <div class="flex">
                    <label for="firstName">Prénom :</label>
                    <input type="text" id="firstName" v-model="candidat.firstName">
                    <p v-if="erreurs.firstName">Veuillez remplir ce champ</p>
                </div>
                <div class="flex">
                    <label for="lastName">Nom :</label>
                    <input type="text" id="lastName" v-model="candidat.lastName" required>
                    <p v-if="erreurs.lastName">Veuillez remplir ce champ</p>
                </div>
            </div>
            <div class="flex">
                <label for="poste">Poste :</label>
                <input type="text" id="poste" v-model="candidat.poste" required>
                <p v-if="erreurs.poste">Veuillez remplir ce champ</p>
            </div>

            <div class="section">
                <div>
                    <h2>Courte présentation</h2>
                    <label for="description"></label>
                    <textarea name="description" id="description" cols="30" rows="10" v-model="candidat.description" required></textarea>
                    <p v-if="erreurs.description">Veuillez remplir ce champ</p>
                </div>
                
                <div>
                    <h3>Informations personnelles</h3>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="address">Adresse</label>
                            <input type="text" id="address" v-model="candidat.address" required>
                            <p v-if="erreurs.address">Veuillez remplir ce champ</p>
                        </div>
                        <div class="col-droite border-left">
                            <label for="phone">Téléphone</label>
                            <input type="text" id="phone" v-model="candidat.phone" required>
                            <p v-if="erreurs.phone">Veuillez remplir ce champ</p>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="city">Ville</label>
                            <input type="text" id="city" v-model="candidat.city" required>
                            <p v-if="erreurs.city">Veuillez remplir ce champ</p>
                        </div>
                        <div class="col-droite border-left">
                            <label for="email">Courriel</label>
                            <input type="email" id="email" v-model="candidat.email" required>
                            <p v-if="erreurs.email">Veuillez remplir ce champ</p>
                        </div>
                    </div>
                    <div class="border-left">
                        <label for="province">Province</label>
                        <select id="province" v-model="candidat.province" required>
                            <option value="">Province</option>
                            <option v-for="province in provinces" 
                                :key="province._id" 
                                :value="province">{{ province.value }}
                            </option>
                        </select>
                        <p v-if="erreurs.province">Veuillez effectuer un choix</p>
                    </div>
                    <div class="border-left">
                        <label for="postalCode">Code postal</label>
                        <input type="text" id="postalCode" v-model="candidat.postalCode" required>
                        <p v-if="erreurs.postalCode">Veuillez remplir ce champ</p>
                    </div>
                </div>
            </div>
            <p>{{ provinces[0].value }}abc</p>

            <div>
                btn à mettre quand prog ok
            </div>
        </form>
    </div>
</template>


<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    import { useCandidat } from '@/composables/candidats/candidat';
    import { fetchProvinces } from '@/composables/api';

    const router = useRouter();
    const { addCandidat } = useCandidat();
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

    const annulerAjout = () => {
        console.log("Annuler l'ajout du candidat");
        router.push({ name: 'Candidats' });
    }

    initProvinces();

    const soumettreFormulaire = async () => {
        try {
            await ajouterCandidat();
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
    }

    const ajouterCandidat = async () => {
        try {
            if (!validerFormulaire()) {
                throw new Error("Veuillez remplir tous les champs obligatoires.");
            }
            console.log("Tentative d'ajout du candidat :", candidat.value);
            await addCandidat(candidat.value);
            console.log("Nouveau candidat ajouté");
            router.push({ name: 'Candidats' });
        } catch (error) {
            console.error("Erreur lors de l'ajout du candidat :", error);
        }
    }

    //  validation formulaire


    const erreurs = ref({
        firstName: false,
        lastName: false,
        poste: false,
        description: false,
        address: false,
        phone: false,
        city: false,
        email: false,
        province: false,
        postalCode: false
    });

    const validerFormulaire = () => {
       erreurs.value = {
        firstName: candidat.value.firstName === '',
        lastName: candidat.value.lastName === '',
        email: candidat.value.email === '',
        address: candidat.value.address === '',
        phone: candidat.value.phone === '',
        city: candidat.value.city === '',
        province: candidat.value.province === '',
        postalCode: candidat.value.postalCode === ''
       
       };
       return Object.values(erreurs.value).some(err => err);
    };

</script>




<style scoped>
    .container {
        padding:80px 200px 80px 200px;
        background-color: #ececee;
    }

    h1 {
        border-left: 10px solid purple;
        padding-left: 25px;
    }

    .section {
        background: white;
        padding: 50px;
        border-radius: 25px;
        margin: 25px 0;
    }

    input[type=text], input[type=email], textarea {
        margin-bottom: 10px;
        width: 100%;
    }

    input[type=text], input[type=email] {
        min-height: 50px;
    }

    .border-left {
        border-left: 10px solid gray;
        padding-left: 10px;
        margin-bottom: 25px;
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