<!-- CandidatAjout.vue - Isa  -->
<template>
    <div class="container">
        <h1>Ajouter un candidat</h1>

        <form @submit.prevent="soumettreFormulaire">

            <button class="annuler">Annuler</button>
            <button class="mettre-a-jour"><i class="fas fa-save"></i>Sauvegarder</button>

            <div class="flex">
                <div class="flex">
                    <label for="prenom">Prénom :</label>
                    <input type="text" id="prenom" v-model="prenom">
                </div>
                <div class="flex">
                    <label for="nom">Nom :</label>
                    <input type="text" id="nom" v-model="nom">
                </div>
            </div>
            <div class="flex">
                <label for="poste">Poste :</label>
                <input type="text" id="poste" v-model="poste">
            </div>

            <div class="section">
                <div>
                    <h2>Courte présentation</h2>
                    <label for="presentation"></label>
                    <textarea name="presentation" id="presentation" cols="30" rows="10" v-model="presentation"></textarea>
                </div>

                
                <div>
                    <h3>Inormations personnelles</h3>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="adresse">Adresse</label>
                            <input type="text" id="adresse" v-model="adresse">
                        </div>
                        <div class="col-droite border-left">
                            <label for="telephone">Téléphone</label>
                            <input type="text" id="telephone" v-model="telephone">
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="ville">Ville</label>
                            <input type="text" id="ville" v-model="ville">
                        </div>
                        <div class="col-droite border-left">
                            <label for="courriel">Courriel</label>
                            <input type="email" id="courriel" v-model="courriel">
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
                        <label for="codePostal">Code postal</label>
                        <input type="text" id="codePostal" v-model="codePostal">
                    </div>
                </div>
            </div>

            <div>
                <button class="annuler">Annuler</button>
                <button type="submit" class="mettre-a-jour"><i class="fas fa-save"></i>Sauvegarder</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    
    import { useCandidat } from '@/composables/candidats/candidat';
    import { fetchProvinces } from '@/composables/api';

    // données du formulaire
    const selectedProvince = ref('');
    const provinces = ref([]);

    onMounted(async () => {
        try {
            provinces.value = await fetchProvinces();
            console.log('Provinces récupérées :', provinces.value); // Ajoutez cette ligne
        } catch (error) {
            console.error('Erreur lors de la récupération des provinces :', error);
        }
    });

    // données du formulaire
    const nom = ref('');
    const prenom = ref('');
    const poste = ref('');
    const presentation = ref('');
    const adresse = ref('');
    const telephone = ref('');
    const ville = ref('');
    const courriel = ref('');
    const province = ref('');
    const codePostal = ref('');

    const { addCandidat, response, error, loading } = useCandidat();
    
    const soumettreFormulaire = async () => {
        const candidatData = {
            nom: nom.value,
            prenom: prenom.value,
            presentation: presentation.value,
            adresse: adresse.value,
            telephone: telephone.value,
            ville: ville.value,
            courriel: courriel.value,
            province: province.value,
            codePostal: codePostal.value
        };

        await addCandidat(candidatData);

        // Réinitialisation des champs du formulaire après l'ajout du candidat
        if (!error.value) {
            nom.value = '';
            prenom.value = '';
            poste.value = '';
            presentation.value = '';
            adresse.value = '';
            telephone.value = '';
            ville.value = '';
            courriel.value = '';
            province.value = '';
            codePostal.value = '';
        }
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

    .label-flex {
        
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