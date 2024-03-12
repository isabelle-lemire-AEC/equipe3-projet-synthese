<template>
    <section class="entete">
        <h3>Offre de stage</h3>
        <h1>Intégrateur Web junior api titre</h1>
        <h2>api entreprise.name</h2>
    </section>

    <form>

        <button>Annuler</button>
        <button>Mettre à jour</button>

        <div class="groupe-tache">
            <h1>Description de la tâche</h1>
            <textarea id="description-tache"></textarea>
        </div>

        <div class="groupe-programme">
            <h3>Programme de formation</h3>
            <input type="text" id="programme">
        </div>

        <div class="groupe-exigence">
            <h3>Exigences</h3>
            <textarea id="exigences"></textarea>
        </div>

        <div class="groupe-info-stage">
            <h3>Informations sur le stage recherché</h3>

            <div class="groupe-gauche">
                <h3>Type de stage</h3>
                <label for="type">Veuillez effectuer un choix</label>
                <select name="type" id="type">
                    <option value=""></option>
                </select>

                <h3>Nombre d'heures par semaine</h3>
                <label for="heure">Veuillez effectuer un choix</label>
                <select name="heure" id="heure">
                    <option value=""></option>
                </select>

                <h3>Rénumération</h3>

                <input type="checkbox" id="remuneration1" name="remuneration1" value="discuter">
                <label for="remuneration1"> À discuter</label><br>
                <input type="checkbox" id="remuneration2" name="remuneration2" value="remunere">
                <label for="remuneration2"> Stage rémunéré</label><br>
                <input type="checkbox" id="remuneration3" name="remuneration3" value="nonRemunere">
                <label for="remuneration3"> Stage non rémunéré</label>
            </div>

            <div class="groupe-droite">
                <h3>Date de début</h3>
                <input type="date" id="dateDebut" name="dateDebut">

                <h3>Date de fin</h3>
                <input type="date" id="dateFin" name="dateFin">
            </div>
        </div>

        <section class="info-sup">
            <h3>Informations suplémentaires</h3>
            <textarea id="info-sup-form"></textarea>
        </section>

    </form>


</template>

<script setup>

</script>

<style>

</style>