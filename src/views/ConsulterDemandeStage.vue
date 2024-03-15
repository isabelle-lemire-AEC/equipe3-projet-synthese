<template>
    <div class="pageContainer">
        <div>
            <div class="bordureGauche">
                <h2>Demande de stage</h2>
                <h1>Développeur Front-End</h1>
            </div>
        </div>
        <div class="btnsContainer">
            <button>Activer</button>
            <button>Modifier</button>
            <button>Fermer</button>
        </div>
        <div class="infoContainer">
            <div>
                <h3>Kevin Labonté</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi amet culpa maiores necessitatibus voluptas reiciendis aliquid fugiat tenetur praesentium blanditiis ratione atque assumenda, quod cumque veritatis quos autem deleniti reprehenderit?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi amet culpa maiores necessitatibus voluptas reiciendis aliquid fugiat tenetur praesentium blanditiis ratione atque assumenda, quod cumque veritatis quos autem deleniti reprehenderit?</p>
            </div>
            <div class="grilleStage">
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>            
            </div>

            <h4>Informations sur le stage recherché</h4>
            <div class="grilleStage">
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>
                <div class="grilleStageCellule bordureGauche">
                        <span>Titre Cellule</span>
                        <span>Info Cellule</span>
                </div>            
            </div>

            <h4>Informations suplémentaires</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At saepe earum, possimus, a doloremque voluptatum neque voluptates quaerat asperiores, porro repudiandae fuga. Quia consequuntur voluptates natus blanditiis quis! Eos, nam.</p>
            <button class="btnTelechargerCV">Télécharger le C.V.</button>

        </div>
    </div>
</template>

<script>

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

</style>