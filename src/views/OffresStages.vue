<template>
    
    <h1>Offres de stage</h1>

    <button>Ajouter une offre de stage</button>

    <table>
        <thead>
            <tr>
                <th scope="col">Poste</th>
                
                <th scope="col">Secteur d'activité</th>
                
                <th scope="col">Région</th>
                
                <th scope="col">Date de publication</th>
                
                <th scope="col"></th>
            </tr>
        </thead>
   
        <tbody>
            <tr>
                <div v-for="offre in offreStage.value">
                    <th scope="row">
                        <div class="poste">
                            <div class="vl"></div>
                            <!--icone-->
                            <h4>{{ offre.title }}</h4>
                            <p>{{ offre.entreprise}}</p>
                        </div>
                        
                    </th>
                            
                    <td>{{ offre.activitySector }}</td>
                    <td>{{ offre.entreprise.city }}</td>
                    <td>2023-03-03</td>
                    <td><!--icone--></td>
                </div>
            </tr>
        </tbody>
        
    </table>
    <hr>
</template>

<script setup>
import useInternshipOffers from '../composables/offres_stage/offreDeStage';
/*import { router } from 'vue-router'*/

const offreStage = useInternshipOffers();
offreStage.getAllOffers();
/*const pageOffreStageDetail = () =>{
        router.push({name: 'offre-de-stage-details'})
    }*/



</script>

<style scoped>

h1{
    color: #707070;
    padding: 40px;
}

button{
    margin: 0 0 40px 40px;
    padding: 10px;
    border-radius: 10px;
    color: rgb(249, 246, 247);
    background-color: #bb2026;
    
}
table{
    width: 100%;
    table-layout: fixed;
    margin-left: 40px;
}
tbody td {
  text-align: left;
}
tbody th{
    text-align: left;
}
thead th{
    text-align: left;
    color: #707070;
   
}
hr.separation{
    margin: 0 40px;
}
.vl{
    border-left: 6px solid #bb2026;
    height: 60px;
    display: inline;
}
.poste{
    display: flex;
    align-items: center;
  
}
.poste-detail{
    margin-left: 10px;
}


</style>