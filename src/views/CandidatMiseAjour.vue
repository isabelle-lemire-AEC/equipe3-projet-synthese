<!-- CandidatMiseAjour.vue -->
<template>
    <div class="form-fiche formulaire-edition-candidat">
        <div class="form-fiche__wrapper-titre" v-if="candidat">
            <p class="form-fiche__nom-section">Candidat</p>
            <h1>{{ candidat.firstName }} {{ candidat.lastName }}</h1>
            <p class="form-fiche__sous-titre">UX Designer</p>
        </div>

        <form id="edition-candidat" @submit.prevent="soumettreFormulaire">
            
            <!-- Boutons annuler et mettre à jour -->
            <BtnAnnulerModifierSauvegarder 
                buttonText="Mettre à jour" 
                buttonClass="bouton bouton--mauve">
            </BtnAnnulerModifierSauvegarder>

            <div class="form-fiche__encadre">
                <div class="form-fiche__wrapper-titre-groupe-inputs">
                    <h2>Courte présentation</h2>
                    <div>
                        <label for="description"></label>
                        <textarea name="description" id="description" rows="6" v-model="candidat.description"></textarea>
                        <p class="error-message" v-if="erreurs.description">
                            Veuillez remplir ce champs.
                        </p>
                    </div>
                </div>

                <div class="form-fiche__wrapper-titre-groupe-inputs">
                    <h3>Informations personnelles</h3>
                    <div class="form-fiche__colonnes-inputs">
                        <div class="form-fiche__colonne-inputs">
                            <div class="form-fiche__label-input-vertical">
                                <label for="address">Adresse</label>
                                <input type="text" id="address" v-model="candidat.address">
                                <p class="error-message" v-if="erreurs.address">
                                    Veuillez remplir ce champs.
                                </p>
                            </div>

                            <div class="form-fiche__label-input-vertical">
                                <label for="city">Ville</label>
                                <input type="text" id="city" v-model="candidat.city">
                                <p class="error-message" v-if="erreurs.city">
                                    Veuillez remplir ce champs.
                                </p>
                            </div>

                            <div class="form-fiche__label-input-vertical">
                                <label for="province">Province</label>
                                <select id="province" v-model="candidat.province">
                                    <option value="" disabled selected>Province</option>
                                    <option v-for="province in provinces"
                                            :key="province._id"
                                            :value="province">{{ province.value }}
                                    </option>

                                </select>
                                <p class="error-message" v-if="erreurs.province">
                                    Veuillez effectuer un choix.
                                </p>
                            </div>

                            <div class="form-fiche__label-input-vertical">
                                <label for="postalCode">Code postal</label>
                                <input type="text" id="postalCode" v-model="candidat.postalCode">
                                <p class="error-message" v-if="erreurs.postalCode">
                                    Veuillez remplir ce champs.
                                </p>
                            </div>
                        </div>

                        <div class="form-fiche__colonne-inputs">
                            <div class="form-fiche__label-input-vertical">
                                <label for="phone">Téléphone</label>
                                <input type="text" id="phone" v-model="candidat.phone">
                                <p class="error-message" v-if="erreurs.phone">
                                    Veuillez remplir ce champs.
                                </p>
                            </div>

                            <div class="form-fiche__label-input-vertical">
                                <label for="email">Courriel</label>
                                <input type="email" id="email" v-model="candidat.email">
                                <p class="error-message" v-if="erreurs.email">
                                    Veuillez remplir ce champs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BtnAnnulerModifierSauvegarder 
                buttonText="Mettre à jour" 
                buttonClass="bouton bouton--mauve">
            </BtnAnnulerModifierSauvegarder>
        </form>
    </div>
</template>


<script setup>
    import { useCandidat } from '@/composables/candidats/candidat';
    import { fetchProvinces } from '@/composables/api';

    import BtnAnnulerModifierSauvegarder from '../components/BtnAnnulerModifierSauvegarder.vue'

    const { getCandidatById, editCandidat } = useCandidat();

    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import {  useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const provinces = ref([]);

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPhone = /^\d{10}$/;
    const regexPostalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

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
        province: {
            _id: '',
            value: ''
        },
        postalCode: ''
    });

    const erreurs = ref({
        description: false,
        address: false,
        phone: false,
        city: false,
        email: false,
        province: false,
        postalCode: false,
    });

    const initProvinces = async () => {
        try {
            provinces.value = await fetchProvinces();
        } catch (error) {
            console.error("Erreur lors de la récupération des provinces :", error);
        }
    }


    const validerChamp = (champ) => {
        switch (champ) {
            case "description":
            erreurs.value.description = !candidat.value.description.trim();
        break;
            case "address":
            erreurs.value.address = !candidat.value.address.trim();
        break;
            case "city":
            erreurs.value.city = !candidat.value.city.trim();
        break;
            case "email":
            erreurs.value.email = !regexEmail.test(candidat.value.email);
        break;
            case "phone":
            erreurs.value.phone = !regexPhone.test(candidat.value.phone);
        break;
            case "province":
            erreurs.value.province = !candidat.value.province.value.trim();
        break;
            case "postalCode":
            erreurs.value.postalCode = !regexPostalCode.test(candidat.value.postalCode);
        break;
        }
    };

    const validerFormulaire = () => {
        const champs = Object.keys(erreurs.value);
        champs.forEach((champ) => validerChamp(champ));
        return Object.values(erreurs.value).some((err) => err);
    };


    const modifCandidat = async () => {
        try {
            if (validerFormulaire()) {
                throw new Error("Veuillez remplir tous les champs obligatoires.");
            }
            console.log("Tentative de modification du candidat :", candidat.value);
            console.log("URL de la requête PATCH :", `https://api-3.fly.dev/candidates/${candidat.value._id}`);
            const response = await editCandidat(candidat.value._id, candidat.value); // Passez candidat.value._id en premier argument
            console.log("Candidat modifié");
            if(response === undefined) {
                router.push(`/candidat/${candidat.value._id}`);
            }
        } catch (error) {
            console.error("Erreur lors de la modification du candidat :", error);
        }
    }

    const soumettreFormulaire = async () => {
        try {
            await modifCandidat();
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
    }

    initProvinces();

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

</style>