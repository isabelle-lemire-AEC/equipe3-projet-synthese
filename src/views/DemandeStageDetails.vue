<template>
    <div class="pageContainer" v-if="demande">
        <div>
            <div class="bordureGauche">
                <h2>Demande de stage</h2>
                <h1>{{ demande.title }}</h1>
            </div>
        </div>
        <div class="btnsContainer">
            <button>Activer</button>
            <button @click="redirigerVersMiseAJour(demande._id)">Modifier</button>
            <button>Fermer</button>
        </div>
        <div class="infoContainer">
            <div>
                <h3>{{ demande.candidate.firstName }} {{ demande.candidate.lastName }}</h3>
                <p>{{ demande.candidate.description }}</p>
            </div>
            <div class="grilleStage">
                <div class="grilleStageCellule bordureGauche">
                        <h4>Ville</h4>
                        <span>{{ demande.candidate.city }}</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <h4>Compétences</h4>
                        <span class="skills" v-for="skill in demande.candidate.skills" :key="skill">{{ skill }}</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <h4>Région</h4>
                        <span>{{ demande.province.value }}</span>
                </div>            
            </div>

            <h4>Informations sur le stage recherché</h4>
            <div class="grilleStage">
                <div class="grilleStageCellule bordureGauche">
                        <h4>Type de stage</h4>
                        <span>{{ demande.internshipType.value }}</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <h4>Date de début</h4>
                        <span>{{ demande.startDate }}</span>
                </div>   
                <div class="grilleStageCellule bordureGauche">
                        <h4>Nombre d'heures par semaine</h4>
                        <span>{{ demande.weeklyWorkHours }}</span>
                </div>   
                <div class="grilleStageCellule bordureGauche">
                        <h4>Date de fin</h4>
                        <span>{{ demande.endDate }}</span>
                </div>            
            </div>

            <h4>Informations suplémentaires</h4>
            <p>{{ demande.additionalInformation }}</p>
            <button class="btnTelechargerCV">Télécharger le C.V.</button>

        </div>
    </div>
</template>

<script setup>
    import { useInternshipRequests } from '../composables/demandes_stages/demandeDeStage.js'
    import { ref, reactive, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router'

    const { getRequestById } = useInternshipRequests();

    const route = useRoute();
    const router = useRouter();
    const demande = ref(null);

    const redirigerVersMiseAJour = (id) => {
        router.push({ name: 'DemandeStageMiseAjour', params: { id } });
    };

    onMounted(async () => {
        try {
            const response = await getRequestById(route.params.id);
            demande.value = response.data;
            // console.log("response: ", response);
            // console.log("response.data: ", demande.value);
            // console.log("demande: ", demande);
            console.log("demande.value: ", demande.value);
            // console.log("demande.value.data.candidate.firstName: ", demande.value.data.candidate.firstName);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    });

</script>

<style scoped>

    h2 {
        margin-bottom: 0.5rem;
    }

    h3 {
        color: rgb(34,166,172);
        font-size: xx-large;
        margin-top: 0;
    }

    h4 {
        color: rgb(34,166,172);
        margin: 0;
    }

    p {
        color: grey;
    }

    .btnsContainer {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
    }

    .infoContainer {
        padding: 3rem;
        background-color: white;
        border-radius: 1rem;
    }

    .grilleStage {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .grilleStageCellule {
        display: flex;
        flex-direction: column;
    }

    .barreVerticale {
        width: 0.3rem;
        height: 2rem;
        background-color: grey;
        margin-right: 1rem;
    }

    .bordureGauche {
        border-left: 0.3rem solid grey;
        padding-left: 0.6rem;
    }

    .btnTelechargerCV {
        background-color: rgb(34,166,172);
        border: 0 white solid;
        padding: 0.7rem;
        color: white;
        font-weight: bold;
        font-size: x-large;
        border-radius: 0.5rem;
    }

    .skills {
        display: inline;
    }
</style>