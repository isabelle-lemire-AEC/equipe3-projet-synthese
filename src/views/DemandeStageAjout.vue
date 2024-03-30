<template>
	<section v-if="demande">
		<h1>Ajouter une demande de stage</h1>

		<div>
			<button @click="retour()">Annuler</button>
			<button @click="soumettreFormulaire()">Sauvegarder</button>
		</div>
		<form id="ajout-demande-stage">

			<div>
				<label for="ajout-demande-titre">Titre</label>
				<input
					type="text"
					id="ajout-demande-titre"
					name="ajout-demande-titre"
					v-model.trim="demande.title" />
				<p v-if="erreurs.title" class="validForm">
					Veuillez fournir le titre du stage.
				</p>
			</div>

			<div>
				<div>
					<label for="ajout-demande-nom-prenom">Candidat</label>
					<select id="ajout-demande-nom-prenom"
							name="ajout-demande-nom-prenom" 
							v-model.trim="demande.candidate"
							@change="candidatChange()">
						<option value="">Veuillez effectuer un choix</option>
						<option
							v-for="candidate in candidates"
							:key="candidate._id"
							:value="candidate">
							{{ candidate.firstName }} {{ candidate.lastName }}
						</option>
					</select>
					<p v-if="erreurs.candidat" class="validForm">
                        Veuillez fournir votre nom complet.
                    </p>
				</div>

				<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
					<label for="ajout-demande-presentation">Présentation</label>
					<textarea
						id="ajout-demande-presentation"
						name="ajout-demande-presentation"
						v-model.trim="demande.description"></textarea>
					<p v-if="erreurs.description" class="validForm">
						Veuillez fournir une présentation.
					</p>
				</div>

				<div>
					<!-- Classe pour groupe de deux inputs qui occupent 50% de l'espace -->
					<div><!-- Classe pour regrouper DEUX INPUTS UN EN DESSOUS DE L'AUTRES-->
						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-programme">Programme de formation</label>
							<input
								type="text"
								id="ajout-demande-programme"
								name="ajout-demande-programme"
								v-model.trim="formationInput"/>
							<p v-if="erreurs.formation" class="error-message">
                                Veuillez fournir un programme de formation.
                            </p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-secteur">Secteur d'activité</label>
							<select id="ajout-demande-secteur"
									name="ajout-demande-secteur"
									v-model="activitySectorInput">
								<option value="">Veuillez effectuer un choix</option>
								<option
									v-for="activitySector in allSecteursDActivites"
									:key="activitySector"
									:value="activitySector">
									{{ activitySector.value }}
								</option>
							</select>
							<p v-if="erreurs.activitySector" class="error-message">
                                Veuillez fournir un secteur d'activité de formation.
                            </p>
						</div>
					</div>
				</div>

				<div>
					<!-- Classe pour groupe de deux inputs qui occupent 50% de l'espace -->
					<div><!-- Classe pour regrouper deux inputs side by side-->
						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-etablissement">Établissement scolaire</label>
							<input
								type="text"
								id="ajout-demande-etablissement"
								name="ajout-demande-etablissement"
								v-model="etablissementInput" />
							<p v-if="erreurs.etablissement" class="error-message">
								Veuillez fournir un établissement scolaire.
							</p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-ville">Ville</label>
							<input
								type="text"
								id="ajout-demande-ville"
								name="ajout-demande-ville"
								v-model.trim="demande.candidate.city"/>
							<p v-if="erreurs.city" class="validForm">
								Veuillez fournir une ville.
							</p>
						</div>
					</div>
				</div>

				<div><!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 100 % de l'espace-->
					<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="ajout-demande-region">Région</label>
						<select
							id="ajout-demande-region"
							name="ajout-demande-region"
							v-model.trim="demande.province">
							<option value="">Veuillez effectuer un choix</option>
							<option
								v-for="province in provinces"
								:key="province._id"
								:value="province">
								{{ province.value }}
							</option>
						</select>
						<p v-if="erreurs.province" class="validForm">
							Veuillez choisir une région.
						</p>
					</div>

					<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="ajout-demande-competences">Compétences</label>
						<textarea
							id="ajout-demande-competences"
							name="ajout-demande-competences"
							v-model="demande.skills"></textarea>
						<p v-if="erreurs.skills" class="validForm">
							Veuillez fournir des compétences.
						</p>
					</div>
				</div>

				<fieldset>
					<legend>Informations sur le stage recherché</legend>
					<div>
						<!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 50 % de l'espace-->
						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-type">Type de stage</label>
							<select id="ajout-demande-type" name="ajout-demande-type" v-model.trim="demande.internshipType">
								<option value="">Veuillez effectuer un choix</option>
								<option
									v-for="internshipType in internshipTypes"
									:key="internshipType._id"
									:value="internshipType">
									{{ internshipType.value }}
								</option>
							</select>
							<p v-if="erreurs.internshipType" class="validForm">
								Veuillez choisir un type de stage.
							</p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-heures">Nombre d'heures par semaine</label>
							<input
								type="number"
								id="ajout-demande-heures"
								name="ajout-demande-heures"
								v-model.trim="demande.weeklyWorkHours" />
							<p v-if="erreurs.weeklyWorkHours" class="validForm">
								Veuillez inscrire le nombre d'heures par semaine.
							</p>
						</div>
					</div>

					<div>
						<!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 50 % de l'espace-->
						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-date-debut">Date de début</label>
							<input
								type="date"
								id="ajout-demande-date-debut"
								name="ajout-demande-date-debut"
								v-model.trim="demande.startDate" />
							<p v-if="erreurs.startDate" class="validForm">
								Veuillez fournir une date de début.
							</p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-date-fin">Date de fin</label>
							<input
								type="date"
								id="ajout-demande-date-fin"
								name="ajout-demande-date-fin"
								v-model.trim="demande.endDate" />
							<p v-if="erreurs.endDate" class="validForm">
								Veuillez fournir une date de fin.
							</p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="edit-demande-remuneration">Rémunération</label>
							<div>
								<input type="radio" id="edit-demande-discretion"
									name="edit-demande-remuneration"
									value="discretion"
									v-model="remunerationType"
									checked="checked" />
								<label for="edit-demande-discretion">À la discrétion de l'entreprise</label>
							</div>
							<!-- Wrapper case checkbox + label -->
							<div>
								<input
									type="radio"
									id="edit-demande-remunere"
									name="edit-demande-remuneration"
									value="remunere"
									v-model="remunerationType" />
								<label for="edit-demande-remunere">Rémunéré</label>
							</div>
							<!-- Wrapper case checkbox + label -->
							<div>
								<input
									type="radio"
									id="edit-demande-non-renumere"
									name="edit-demande-remuneration"
									value="non-remunere"
									v-model="remunerationType" />
								<label for="edit-demande-non-renumere">Non-rémunéré</label>
							</div>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Informations supplémentaires</legend>
					<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="ajout-demande-infos-supp">Informations supplémentaires</label>
						<!-- Classe pour cacher le label -->
						<textarea
							id="ajout-demande-infos-supp"
							name="ajout-demande-infos-supp"
							v-model="demande.additionalInformation">
						</textarea>
						<p v-if="erreurs.additionalInformation" class="error-message">
                            Veuillez fournir des informations supplémentaires.
                        </p>
					</div>
				</fieldset>
			</div>
		</form>
	</section>
</template>

<script setup>
	import {reactive, onMounted, ref} from "vue";
	import {useInternshipRequests} from "../composables/demandes_stages/demandeDeStage.js";
	import {useCandidat} from "../composables/candidats/candidat.js";
	import {useProvinces} from "../composables/provinces/provinces.js";
	import {useInternshipTypes} from "@/composables/types_stage/types_stage.js";
	import {useActivitySectors} from "../composables/secteurs_activites/secteurs_activites.js";
	import {useRouter} from 'vue-router';

	const {addRequest, getAllRequests} = useInternshipRequests();
	const {getAllCandidats} = useCandidat();
	const {getAllProvinces, getProvinceById} = useProvinces();
	const {getAllInternshipTypes} = useInternshipTypes();
	const {getAllActivitySectors} = useActivitySectors();

	const candidates = ref([]);
	const provinces = ref([]);
	const internshipTypes = ref([]);
	const remunerationType = ref([]);
	const allSecteursDActivites = ref([]);
    const router = useRouter();
	const competences = ref('');
	const formationInput = ref('');
	const etablissementInput = ref('');
	const activitySectorInput = ref('');
	const formulaireValide = ref(false);
	
	const demande = ref({
		title: "",
		description: "",
		candidate: {
			_id: "",
			description: "",
			email: "",
			firstName: "",
			lastName: "",
			address: "",
			phone: "",
			city: "",
			skills: [""],
			province: {
				_id: "",
				value: "",
			},
			postalCode: "",
		},
		startDate: "",
		endDate: "",
		weeklyWorkHours: 0,
		province: {
			_id: "",
			value: "",
		},
		skills: [""],
		internshipType: {
			_id: "",
			value: "",
		},
		additionalInformation: "",
		isActive: false
	});

	const erreurs = ref({
        title: false,
        candidat: false,
        description: false,
		formation: false,
		activitySector: false,
        city: false,
		province: false,
		etablissement: false,
        startDate: false,
        endDate: false,
        skills: false,
        internshipType: false,
        weeklyWorkHours: false,
		additionalInformation: false
    });

	const validerFormulaire = () => {
		erreurs.value.title = demande.value.title === '',
		erreurs.value.candidat = demande.value.candidate.firstName === '',
		erreurs.value.description = demande.value.candidate.description === '',
		erreurs.value.formation = formationInput.value === '',
		erreurs.value.activitySector = activitySectorInput.value === '',
		erreurs.value.city = demande.value.candidate.city === '',
		erreurs.value.province = demande.value.candidate.province.value === '',
		erreurs.value.etablissement = etablissementInput.value === '',
		erreurs.value.startDate = demande.value.startDate === '',
		erreurs.value.endDate = demande.value.endDate === '',
		erreurs.value.skills = demande.value.candidate.skills === '',
		erreurs.value.internshipType = demande.value.internshipType.value === '',
		erreurs.value.weeklyWorkHours = demande.value.weeklyWorkHours === 0,
		erreurs.value.additionalInformation = demande.value.additionalInformation === ''
		
		return Object.values(erreurs.value).some(err => err);
	};

	const candidatChange = async () => {
		demande.value.description = demande.value.candidate.description;
		demande.value.province = demande.value.candidate.province;
		demande.value.city = demande.value.candidate.city;
		demande.value.skills = demande.value.candidate.skills;
	}

	const soumettreFormulaire = async () => {
			try {
				formulaireValide.value = validerFormulaire();
				if (!formulaireValide.value) {
					await ajouterDemande();
				}else {
				throw new Error("Veuillez remplir tous les champs obligatoires.");
			}
			
			} catch (error) {
				console.error("Erreur lors de la soumission du formulaire :", error);
			}
	}

	const retour = () => {
		router.push({name: "DemandesStages"});
	}

	const listerCompetences = () => {
		competences.value = demande.value.skills.toString();
		competences.value = competences.value.replace(/ /g,'');
		demande.value.skills = competences.value.split(',');
	}

	const ajouterDemande = async () => {
		try {
			console.log("1 - demande.value: ", demande.value);
			listerCompetences();
			console.log("2 - demande.value: ", demande.value);
			await addRequest(demande.value);
			console.log("Nouvelle demande ajoutée");
			retour();
		} catch (error) {
			console.error("Erreur lors de l'ajout de la demande :", error);
		}
	};

	const initProvinces = async () => {
		try {
			const provincesData = await getAllProvinces();
			provinces.value = provincesData.data;
		} catch (error) {
			console.error("Erreur lors de la récupération des provinces :", error);
		}
	};

	const initCandidats = async () => {
		try {
			const candidatesData = await getAllCandidats();
			candidates.value = candidatesData.data;
		} catch (error) {
			console.error("Erreur lors de la récupération des candidats :", error);
		}
	};

	const initTypes = async () => {
		try {
			const intershipTypesData = await getAllInternshipTypes();
			internshipTypes.value = intershipTypesData.data;
		} catch (error) {
			console.error("Erreur lors de la récupération des types de stages :", error);
		}
	};

	const initSecteursDActivites = async () => {
		try {
			allSecteursDActivites.value = await getAllActivitySectors();
		} catch (error) {
			console.error("Erreur lors de la récupération des secteurs d'activitées :", error);
		}
	}
	
	initTypes();
	initProvinces();
	initCandidats();
	initSecteursDActivites();
</script>

<style></style>
