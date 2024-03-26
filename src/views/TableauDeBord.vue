<!-- TableauDeBord.vue / débuter par Caro, continuer par Isa -->
<template>
    <div class="container">
        <section class="infoRapide flex">
            <div class="infoRapide-demandes flex">
                <i class="fa-solid fa-file-lines"></i>
                <div>
                    <p>Demandes de stage</p>
                    <p>125</p>
                </div>
            </div>
            <div class="infoRapide-offres flex">
                <i class="fa-solid fa-paper-plane"></i>
                <div>
                    <p>Offres de stage</p>
                    <p>58</p>
                </div>
            </div>
            <div class="infoRapide-candidats flex">
                <i class="fa-solid fa-user"></i>
                <div>
                    <p>Candidats</p>
                    <p>125</p>
                </div>
            </div>
            <div class="infoRapide-entreprises flex">
                <i class="fa-solid fa-computer-mouse"></i>
                <div>
                    <p>Entreprises</p>
                    <p>125</p>
                </div>
            </div>
        </section>

        <!-- Demande de stage -->
        <section class="dernieresDemandes">
            <div class="flex">
                <div>
                    <h2>Dernières <span>demandes</span> de stage</h2>
                    <h4>En attente de validation</h4>
                </div>
                <button>Valider toutes les demandes</button>
            </div>
            <div>
                <div class="flex">
                    <p>Poste</p>
                    <p>Etablissement</p>
                    <p>Date</p>
                    <p>Actions</p>
                </div>
                <TBListeDemandeStageAttente></TBListeDemandeStageAttente>
                <TBListeDemandeStageAttente></TBListeDemandeStageAttente>
                <TBListeDemandeStageAttente></TBListeDemandeStageAttente>
                <TBListeDemandeStageAttente></TBListeDemandeStageAttente>
            </div>

            
        </section>

        <hr style="margin: 25px 0;"> <!-- à deleter, seulement pour faire section -->

        <!-- Offre de stage -->
        <section class="dernieresOffres">
            <div class="flex">
                <div>
                    <h2>Dernières <span>offres</span> de stage</h2>
                    <h4>En attente de validation</h4>
                </div>
                <button>Valider toutes les offres</button>
            </div>

            <div>
                <div class="flex">
                    <p>Poste</p>
                    <p>Ville</p>
                    <p>Date</p>
                    <p>Action</p>
                </div>
                <TBListeOffreStageAttente></TBListeOffreStageAttente>
                <TBListeOffreStageAttente></TBListeOffreStageAttente>
                <TBListeOffreStageAttente></TBListeOffreStageAttente>
                <TBListeOffreStageAttente></TBListeOffreStageAttente>

            </div>
            
        </section>
    </div>
</template>

<script setup>
    import TBListeDemandeStageAttente from '../components/TBListeDemandeStageAttente.vue'
    import TBListeOffreStageAttente from '../components/TBListeOffreStageAttente.vue'
</script>

<style>
 .flex {
    display: flex;
 }

 .infoRapide-demandes,
 .infoRapide-offres,
 .infoRapide-candidats,
 .infoRapide-entreprises {
    background-color: beige;
    padding: 25px;
    margin-right: 25px;
    border-radius: 25px;
 }

</style>