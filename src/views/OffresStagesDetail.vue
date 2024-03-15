<template>
    <section class="entete">
        <div class="vl"></div>

        <div class="entete-titre">
            <h3>Offre de stage</h3>
            <h1>Intégrateur Web junior api titre</h1>
            <h2>api entreprise.name</h2>
        </div>
    </section>

    <section class="icone">

    </section>

    <div class="page">
        <h1>Description de la tâche</h1>
        <p>api description</p>

        <div class="formation">
            <div class="vl-detail"></div>
            <div class="formation-detail">
                <h3>Formation demandées</h3>
                <p>lorem</p>
            </div>
        </div>

        <div class="exigence">
            <div class="vl-detail"></div>
            <div class="exigence-detail">
                <h3>Exigences</h3>
                <p>api requiredSkills</p>
            </div>
        </div>

        <section class="info-stage">
            <h3>Informations sur le stage</h3>

            <div class="groupe-gauche">
                <h3>Type de stage</h3>
                <p>api internshipType</p>

                <h3>Nombre d'heures par semaine</h3>
                <p>api weeklyWorkHours</p>

                <h3>Rénumération</h3>
                <p>api salary</p>
            </div>

            <div class="groupe-droite">
                <h3>Date de début</h3>
                <p>api startDate</p>

                <h3>Date de fin</h3>
                <p>api endDate</p>
            </div>
        </section>

        <section class="info-sup">
            <h3>Informations suplémentaires</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, nulla totam nemo, ea asperiores eveniet minus magni ex hic architecto dolores, commodi repudiandae animi inventore quam molestiae quisquam possimus sunt.</p>
        </section>
    </div>

</template>

<script setup>

</script>

<style>
.entete {
    color: #707070;
    margin: 40px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.vl{
    border-left: 6px solid #bb2026;
    height: 100px;
    
}
.vl-detail{
    border-left: 6px solid #707070;
    height: 80px;
}
.entete-titre{
    margin-left: 10px;
}
.page{
    background-color: white;
    margin: 40px;
    border-radius: 10px;
    padding: 30px;
    color: #707070;
}
body{
    background-color: #EEEEEE;
}
.page h1{
    color: #bb2026;
}
.info-sup h3{
    color: #bb2026;
}
.formation{
    display: flex;
    align-items: center;
    
}
.exigence{
    display: flex;
    align-items: center;
    
}
.formation h3 , p{
    padding: 10px;
}
.exigence h3 , p{
    padding: 10px;
}


</style>