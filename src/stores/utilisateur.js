// utilisateur.js
import { defineStore } from 'pinia';

export const utilisateurStore = defineStore({
  id: 'utilisateur',
  state: () => ({
    nomPrenom: '',
    courriel: ''
  }),
  actions: {
    updateInfo(newNomPrenom, newCourriel) {
      console.log('Updating user info...');
      console.log('New nomPrenom:', newNomPrenom);
      console.log('New courriel:', newCourriel);

      this.nomPrenom = newNomPrenom;
      this.courriel = newCourriel;

      console.log('User info updated successfully!');
      console.log('NomPrenom:', this.nomPrenom);
      console.log('Courriel:', this.courriel);      
    }
  }
});
