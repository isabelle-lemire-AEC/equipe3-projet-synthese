<!-- CandidatAjout.vue -->
<template>

    <div class="form-fiche formulaire-ajout-candidat">
        <div class="form-fiche__wrapper-titre">
            <h1>Ajouter un candidat</h1>
        </div>

        <form id="ajout-candidat" @submit.prevent="soumettreFormulaire">

            <BtnAnnulerModifierSauvegarder 
                buttonText="Sauvegarder" 
                buttonClass="bouton bouton--mauve">
            </BtnAnnulerModifierSauvegarder>

            <div class="form-fiche__input-hors-encadre">
                <div class="form-fiche__label-input-horizontal">
                    <label for="firstName">Prénom:</label>
                    <div class="form-fiche__wrapper-input-msg-erreur">
                        <input type="text" id="firstName" v-model.trim="candidat.firstName">
                        <p class="validForm" v-if="erreurs.firstName">Veuillez remplir ce champ</p>
                    </div>
                </div>
                <div class="form-fiche__label-input-horizontal">
                    <label for="lastName">Nom :</label>
                    <div class="form-fiche__wrapper-input-msg-erreur">
                        <input type="text" id="lastName" v-model.trim="candidat.lastName">
                        <p class="validForm" v-if="erreurs.lastName">Veuillez remplir ce champ</p>
                    </div>
                </div>
                <div class="form-fiche__label-input-horizontal">
                    <label for="poste">Poste :</label>
                    <div class="form-fiche__wrapper-input-msg-erreur">
                        <input type="text" id="poste" v-model="candidat.poste" required>
                        <p class="validForm" v-if="erreurs.poste">Veuillez remplir ce champ</p>
                    </div>
                </div>
            </div>

            <!-- Section encadré blanc -->
            <div class="form-fiche__encadre">
                <div class="form-fiche__wrapper-titre-groupe-inputs">
                    <h2>Courte présentation</h2>
                    <div>
                        <label for="description" hidden>Description</label>
                        <textarea name="description" id="description" cols="30" rows="10"
                                  v-model.trim="candidat.description"></textarea>
                        <p class="validForm" v-if="erreurs.description">Veuillez remplir ce champ</p>
                    </div>
                </div>

                <div class="form-fiche__wrapper-titre-groupe-inputs">
                    <h3>Informations personnelles</h3>

                    <div class="form-fiche__colonnes-inputs">
                        <div class="form-fiche__colonne-inputs">
                            <div class="form-fiche__label-input-vertical">
                                <label for="address">Adresse</label>
                                <div>
                                    <input type="text" id="address" v-model.trim="candidat.address">
                                    <p class="validForm" v-if="erreurs.address">Veuillez remplir ce champ</p>
                                </div>
                            </div>

                            <div class="form-fiche__label-input-vertical">
                                <label for="city">Ville</label>
                                <div>
                                    <input type="text" id="city" v-model.trim="candidat.city">
                                    <p class="validForm" v-if="erreurs.city">Veuillez remplir ce champ</p>
                                </div>
                            </div>

                            <div class="form-fiche__label-input-vertical">
                                <label for="province">Province</label>
                                <div>
                                    <select id="province" v-model="candidat.province">
                                        <option value="">Province</option>
                                        <option v-for="province in provinces"
                                                :key="province._id"
                                                :value="province">{{ province.value }}
                                        </option>
                                    </select>
                                    <p class="validForm" v-if="erreurs.province">Veuillez effectuer un choix</p>
                                </div>
                            </div>
                            <div class="form-fiche__label-input-vertical">
                                <label for="postalCode">Code postal</label>
                                <div>
                                    <input type="text" id="postalCode" v-model.trim="candidat.postalCode">
                                    <p class="validForm" v-if="erreurs.postalCode">Veuillez remplir ce champ</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-fiche__colonne-inputs">
                            <div class="form-fiche__label-input-vertical">
                                <label for="phone">Téléphone</label>
                                <div>
                                    <input type="text" id="phone" v-model.trim="candidat.phone">
                                    <p class="validForm" v-if="erreurs.phone">Veuillez remplir ce champ</p>
                                </div>
                            </div>

                            <div class="form-fiche__label-input-vertical">
                                <label for="email">Courriel</label>
                                <div>
                                    <input type="email" id="email" v-model.trim="candidat.email">
                                    <p class="validForm" v-if="erreurs.email">Veuillez remplir ce champ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BtnAnnulerModifierSauvegarder 
                buttonText="Sauvegarder" 
                buttonClass="bouton bouton--mauve">
            </BtnAnnulerModifierSauvegarder>
            
        </form>
    </div>
</template>


<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    import { useCandidat } from '@/composables/candidats/candidat';
    import { fetchProvinces } from '@/composables/api';

    import BtnAnnulerModifierSauvegarder from '../components/BtnAnnulerModifierSauvegarder.vue'

    const router = useRouter();
    const { addCandidat} = useCandidat();
    const provinces = ref([]);

    const candidat = ref({
        firstName: '',
        lastName: '',
        poste: '',
        description: '',
        skills: "React, Vue.js et css",
        address: '',
        phone: '',
        city: '',
        email: '',
        province: {
            _id: '',
            value: ''
        },
        postalCode: ''
    });

    const initProvinces = async () => {
        try {
            provinces.value = await fetchProvinces();
        } catch (error) {
            console.error("Erreur lors de la récupération des provinces :", error);
        }
    }

    initProvinces();

    const formulaireValide = ref(false);

    const soumettreFormulaire = async () => {
        try {
            console.log('État du formulaire avant validation :', candidat.value);
            console.log('État des erreurs avant validation :', erreurs.value);
            formulaireValide.value = validerFormulaire(); // Mettre à jour la valeur de formulaireValide
            if (!formulaireValide.value) {
                await ajouterCandidat();
            } else {
                throw new Error("Veuillez remplir tous les champs obligatoires.");
            }
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
    };

    const ajouterCandidat = async () => {
        try {
            if (validerFormulaire()) {
                throw new Error("Veuillez remplir tous les champs obligatoires.");
            }
            console.log("Tentative d'ajout du candidat :", candidat.value);
            await addCandidat(candidat.value);
            console.log("Nouveau candidat ajouté");
            router.push({
                name: 'Candidats'
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout du candidat :", error);
        }
    };


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
        erreurs.value.firstName = candidat.value.firstName === '';
        erreurs.value.lastName = candidat.value.lastName === '';
        erreurs.value.poste = candidat.value.poste === '';
        erreurs.value.description = candidat.value.description === '';
        erreurs.value.address = candidat.value.address === '';
        erreurs.value.phone = candidat.value.phone === '';
        erreurs.value.city = candidat.value.city === '';
        erreurs.value.email = candidat.value.email === '';
        erreurs.value.province = candidat.value.province.value === '';
        erreurs.value.postalCode = candidat.value.postalCode === '';

        return Object.values(erreurs.value).some(err => err);
    };
</script>


<style scoped>

</style>