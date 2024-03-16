<template>
    <div class="container">
    
        <h1>Offres de stage</h1>

        <button>Ajouter une offre de stage</button>

        <div class="ofrreStage">

            <table>
                <thead>
                    <tr>
                        <th scope="col">Poste
                            <hr>
                        </th>
                        
                        <th scope="col">Secteur d'activité
                            <hr>
                        </th>
                        
                        <th scope="col">Région
                            <hr>
                        </th>
                        
                        <th scope="col">Date de publication
                            <hr>
                        </th>
                        
                        <th scope="col"></th>
                    </tr>
                    
                </thead>
            </table>
                
            <table>

                <tbody>   
                    <tr>
                        <th scope="row">
                            <div class="poste">
                                <div class="vl"></div>
                                <!--icone-->
                                <div class="poste-detail" @click="pageOffreStageDetail(offreStageDetail.id)" >
                                    <RouterLink :to=" {name: 'offre-de-stage-details', params: {id:offreStageDetail.id}}">
                                        <h4>Intégrateur Web</h4>
                                        <p>Acolyte communication</p>
                                    </RouterLink>
                                </div>
                            </div>
                        </th>
                        
                        <td>Communication</td>
                        <td>Mauricie</td>
                        <td>2023-03-03</td>
                        <td><!--icone--></td>
                    </tr>
                </tbody>
                
            </table>
            <hr class="separation">
        </div>
    </div>
</template>

<script setup>
import router from '../router/index'


const pageOffreStageDetail = (id) =>{
        router.push({name: 'offre-de-stage-details', params:{id}})
    }

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