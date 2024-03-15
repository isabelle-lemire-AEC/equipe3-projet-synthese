<!-- CandidatDetails.vue - Donaria  -->
<template>
  <div class="candidat">
    <h3>Candidat</h3>
   
  <CandidatCardDetails></CandidatCardDetails>
  </div>
</template>

<script>
import CandidatCardDetails from "@/components/CandidatCardDetails.vue";

export default {
  components: {
    CandidatCardDetails,
  },
 

};
</script>


<style scoped>
.candidat{
  background-color: #ececee;
  padding:80px 200px 80px 200px;
}

.candidat h3{
  padding-left: 300px;
}
</style>
