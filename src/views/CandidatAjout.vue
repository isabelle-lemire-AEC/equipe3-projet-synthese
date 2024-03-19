<!-- CandidatAjout.vue - Isa  -->
<template>
    <div class="container">
        <h1>Ajouter un candidat</h1>

        <form @submit.prevent="soumettreFormulaire">
            
            <div>
                <button class="annuler" type="submit" @click="annulerAjout">Annuler</button>
                <button class="mettre-a-jour" type="submit" @click="sauvegarderClick = true"><i class="fas fa-save"></i>Sauvegarder</button>
            </div>

            <div class="flex">
                <div class="flex">
                    <label for="firstName">Prénom :</label>
                    <input type="text" id="firstName" v-model="firstName">
                </div>
                <div class="flex">
                    <label for="lastName">Nom :</label>
                    <input type="text" id="lastName" v-model="lastName">
                </div>
            </div>
            <div class="flex">
                <label for="poste">Poste :</label>
                <input type="text" id="poste" v-model="poste">
            </div>

            <div class="section">
                <div>
                    <h2>Courte présentation</h2>
                    <label for="description"></label>
                    <textarea name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
                </div>
                
                <div>
                    <h3>Inormations personnelles</h3>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="address">Adresse</label>
                            <input type="text" id="address" v-model="address">
                        </div>
                        <div class="col-droite border-left">
                            <label for="phone">Téléphone</label>
                            <input type="text" id="phone" v-model="phone">
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="city">Ville</label>
                            <input type="text" id="city" v-model="city">
                        </div>
                        <div class="col-droite border-left">
                            <label for="email">Courriel</label>
                            <input type="email" id="email" v-model="email">
                        </div>
                    </div>
                    <div class="border-left">
                        <label for="province"></label>
                        <select id="province" v-model="selectedProvince">
                            <option value="">Province</option>
                            <option v-for="province in provinces" 
                                :key="province._id" 
                                :value="province.value">{{ province.value }}</option>
                        </select>
                    </div>
                    <div class="border-left">
                        <label for="postalCode">Code postal</label>
                        <input type="text" id="postalCode" v-model="postalCode">
                    </div>
                </div>
            </div>

            <div>
                <button class="annuler" type="submit" @click="annulerAjout">Annuler</button>
                <button class="mettre-a-jour" type="submit" @click="sauvegarderClick = true"><i class="fas fa-save"></i>Sauvegarder</button>
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

    const firstName = ref('');
    const lastName = ref('');
    const poste = ref('');
    const description = ref('');
    const address = ref('');
    const phone = ref('');
    const city = ref('');
    const email = ref('');
    const selectedProvince = ref('');
    const postalCode = ref('');
    
    const sauvegarderClick = ref(false);

    const { addCandidat } = useCandidat();
    const provinces = ref([]);

    const initProvinces = async () => {
        try {
            provinces.value = await fetchProvinces();
        } catch (error) {
            console.error("Erreur lors de la récupération des provinces :", error);
        }
    }

    initProvinces();

    const soumettreFormulaire = async () => {
        // Valider le formulaire uniquement lorsque le bouton "Sauvegarder" est cliqué
        if (sauvegarderClick.value && validerFormulaire()) {
            const candidatData = {
                firstName: firstName.value,
                lastName: lastName.value,
                description: description.value,
                email: email.value,
                address: address.value,
                phone: phone.value,
                city: city.value,
                province: { value: selectedProvince.value },
                postalCode: postalCode.value
            };

            try {
                await addCandidat(candidatData);
                console.log("Nouveau candidat ajouté");
                router.push({ name: 'Candidats' });
            } catch (error) {
                console.error("Erreur lors de l'ajout du candidat :", error);
            }
        }
    }

    // ceci fonctionne OK
    const annulerAjout = () => {
        console.log("Annuler l'ajout du candidat");
        router.push({ name: 'Candidats' });
    }

    const validerFormulaire = () => {
        if (!firstName.value || !lastName.value || !email.value || !address.value || !phone.value || !city.value || !selectedProvince.value || !postalCode.value) {
            console.log("Veuillez remplir tous les champs du formulaire.");
            return false;
        }
        return true;
    }

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