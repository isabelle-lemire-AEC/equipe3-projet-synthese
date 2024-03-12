<template>
    <div class="container">
        <div class="border-left-titre">
            <h3>Candidat</h3>
            <h1>Plume Latraverse</h1>
            <h2>UX Designer</h2>
        </div>

        <form action="">

            <button class="annuler">Annuler</button>
            <button class="mettre-a-jour">Sauvegarder</button>

            
            <div class="section">
                <div>
                    <h2>Courte présentation</h2>
                    <label for="presentation"></label>
                    <textarea name="presentation" id="presentation" cols="30" rows="10"></textarea>
                </div>

                
                <div>
                    <h3>Inormations personnelles</h3>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="adresse">Adresse</label>
                            <input type="text" id="adresse">
                        </div>
                        <div class="col-droite border-left">
                            <label for="telephone">Téléphone</label>
                            <input type="text" id="telephone">
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-gauche padding-right-15 border-left">
                            <label for="ville">Ville</label>
                            <input type="text" id="ville">
                        </div>
                        <div class="col-droite border-left">
                            <label for="courriel">Courriel</label>
                            <input type="email" id="courriel">
                        </div>
                    </div>
                    <div class="border-left">
                        <label for="province">Province</label>
                        <input type="text" id="province">
                    </div>
                    <div class="border-left">
                        <label for="codePostal">Code postal</label>
                        <input type="text" id="codePostal">
                    </div>
                </div>
            </div>

            <div>
                <button class="annuler">Annuler</button>
                <button class="mettre-a-jour">Sauvegarder</button>
            </div>
        </form>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .container {
        padding:80px 200px 80px 200px;
        background-color: #ececee;
    }

    .section {
        background: white;
        padding: 50px;
        border-radius: 25px;
        margin: 25px 0;
    }

    .section h2 {
        font-size: 50px;
        color: purple;
    }

    .border-left-titre {
        border-left: 10px solid purple;
        padding-left: 25px;
    }

    .border-left {
        border-left: 10px solid gray;
        padding-left: 10px;
        margin-bottom: 25px;
    }

    input[type=text], input[type=email], textarea {
        margin-bottom: 10px;
        width: 100%;
    }

    input[type=text], input[type=email] {
        min-height: 50px;
    }

    .label-flex {
        width: 15%;
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