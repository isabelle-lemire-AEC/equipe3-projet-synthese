<template>
	<div class="form-fiche formulaire-ajout-demandestages" v-if="demande">
		<div class="form-fiche__wrapper-titre">
			<h1>Ajouter une demande</h1>
		</div>

		<form id="ajout-demandestages" @submit.prevent="soumettreFormulaire">

			<!-- Boutons annuler et mettre à jour -->
			<BtnAnnulerModifierSauvegarder
				class="form-fiche__boutons-haut"
				buttonText="Sauvegarder"
				buttonClass="bouton bouton--turquoise">
			</BtnAnnulerModifierSauvegarder>

			<!-- Section titre -->
			<div class="form-fiche__input-hors-encadre">
				<div class="form-fiche__label-input-horizontal">
					<label for="ajout-demande-titre">Titre :</label>
					<div class="form-fiche__wrapper-input-msg-erreur">
						<input type="text" id="ajout-demande-titre" name="ajout-demande-titre"
							v-model.trim="demande.title" />
						<!-- Validation -->
						<p v-if="erreurs.title" class="validForm error-message">Veuillez remplir ce champs.</p>
					</div>
				</div>
			</div>

			<!-- Section encadré encadré blanc -->
			<div class="form-fiche__encadre">
				<!-- Section candidat -->
				<div class="form-fiche__colonne-inputs">
					<div class="form-fiche__label-input-vertical form-fiche__label-input-vertical--sans-bordure">
						<label for="ajout-demande-nom-prenom">Nom et prénom</label>
						<select id="ajout-demande-nom-prenom" name="ajout-demande-nom-prenom"
								v-model.trim="demande.candidate" @change="candidatChange()">
							<option value="">Veuillez effectuer un choix</option>
							<option v-for="candidate in candidates" :key="candidate._id" :value="candidate">
								{{ candidate.firstName }} {{ candidate.lastName }}
							</option>
						</select>
						<!-- Validation -->
						<p v-if="erreurs.candidat" class="validForm error-message">Veuillez remplir ce champs.</p>
					</div>
					<!-- Section présentation -->
					<div class="form-fiche__label-input-vertical form-fiche__label-input-vertical--sans-bordure">
						<label for="ajout-demande-presentation">Présentation</label>
						<textarea id="ajout-demande-presentation" name="ajout-demande-presentation" rows="6"
								  v-model.trim="demande.description"></textarea>
						<!-- Validation -->
						<p v-if="erreurs.description" class="validForm error-message"> Veuillez remplir ce champs.</p>
					</div>
				</div>
				<!-- Section infos -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<div class="form-fiche__colonnes-inputs">
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-programme">Programme de formation</label>
								<input type="text" id="ajout-demande-programme" name="ajout-demande-programme"
									   v-model.trim="formationInput" />
								<!-- Validation -->
								<p v-if="erreurs.formation" class="error-message">Veuillez remplir ce champs.</p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-secteur">Secteur d'activité</label>
								<select id="ajout-demande-secteur" name="ajout-demande-secteur"
										v-model="activitySectorInput">
									<option value="">Veuillez effectuer un choix</option>
									<option v-for="activitySector in allSecteursDActivites" :key="activitySector"
											:value="activitySector">
										{{ activitySector.value }}
									</option>
								</select>
								<!-- Validation -->
								<p v-if="erreurs.activitySector" class="error-message">Veuillez effectuer un choix.</p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-region">Région</label>
								<select id="ajout-demande-region" name="ajout-demande-region"
										v-model.trim="demande.province">
									<option value="">Veuillez effectuer un choix</option>
									<option v-for="province in provinces" :key="province._id" :value="province">
										{{ province.value }}
									</option>
								</select>
								<!-- Validation -->
								<p v-if="erreurs.province" class="validForm error-message">Veuillez effectuer un choix.</p>
							</div>
						</div>
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-etablissement">Établissement scolaire</label>
								<input type="text" id="ajout-demande-etablissement" name="ajout-demande-etablissement"
									   v-model="etablissementInput" />
								<!-- Validation -->
								<p v-if="erreurs.etablissement" class="error-message">Veuillez remplir ce champs.</p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-ville">Ville</label>
								<input type="text" id="ajout-demande-ville" name="ajout-demande-ville"
									   v-model.trim="demande.candidate.city" />
								<!-- Validation -->
								<p v-if="erreurs.city" class="validForm error-message"> Veuillez remplir ce champs.</p>
							</div>
						</div>
					</div>
					<!-- Section compétences -->
					<div class="form-fiche__label-input-vertical">
						<label for="ajout-demande-competences">Compétences</label>
						<textarea id="ajout-demande-competences" name="ajout-demande-competences" rows="6"
								  v-model="demande.skills"></textarea>
						<!-- Validation -->
						<p v-if="erreurs.skills" class="validForm error-message">Veuillez remplir ce champs.</p>
					</div>
				</div>


				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<h3>Informations sur le stage recherché</h3>
					<div class="form-fiche__colonnes-inputs">
						<!-- colonne de gauche -->
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-type">Type de stage</label>
								<select id="ajout-demande-type" name="ajout-demande-type"
										v-model.trim="demande.internshipType">
									<option value="">Veuillez effectuer un choix</option>
									<option
											v-for="internshipType in internshipTypes"
											:key="internshipType._id"
											:value="internshipType">
										{{ internshipType.value }}
									</option>
								</select>
								<p v-if="erreurs.internshipType" class="validForm error-message">
									Veuillez effectuer un choix.
								</p>
							</div>

							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-heures">Nombre d'heures par semaine</label>
								<input
									type="number"
									id="ajout-demande-heures"
									name="ajout-demande-heures"
									v-model.trim="demande.weeklyWorkHours" />
								<p v-if="erreurs.weeklyWorkHours" class="validForm error-message">
									Veuillez remplir ce champs.
								</p>
							</div>

							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-remuneration">Rémunération</label>
								<div>
									<input type="radio" id="ajout-demande-discretion" name="ajout-demande-remuneration"
										   value="discretion" v-model="remunerationType" checked="checked" />
									<label for="ajout-demande-discretion" class="form-fiche__label-radio-input">À la
										discrétion de l'entreprise</label>
								</div>
								<div>
									<input type="radio" id="ajout-demande-remunere" name="ajout-demande-remuneration"
										   value="remunere" v-model="remunerationType" />
									<label for="ajout-demande-remunere"
										   class="form-fiche__label-radio-input">Rémunéré</label>
								</div>
								<div>
									<input type="radio" id="ajout-demande-non-renumere"
										   name="ajout-demande-remuneration" value="non-remunere"
										   v-model="remunerationType" />
									<label for="ajout-demande-non-renumere"
										   class="form-fiche__label-radio-input">Non-rémunéré</label>
								</div>
							</div>
						</div>
						<!-- colonne de droite -->
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-date-debut">Date de début</label>
								<input type="date" id="ajout-demande-date-fin" name="ajout-demande-date-fin"
									   v-model.trim="demande.startDate" />
								<!-- Vaidation -->
								<p v-if="erreurs.endDate" class="validForm error-message">Veuillez effectuer un choix</p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-date-fin">Date de fin</label>
								<input type="date" id="ajout-demande-date-fin" name="ajout-demande-date-fin"
									   v-model.trim="demande.endDate" />
								<!-- Validation -->
								<p v-if="erreurs.endDate" class="validForm error-message">Veuillez effectuer un choix</p>
							</div>
						</div>
					</div>
				</div>
				<!-- Section infos supplémentaires -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<h3>Informations supplémentaires</h3>
					<div>
						<label for="ajout-demande-infos-supp"></label>
						<textarea id="ajout-demande-infos-supp" name="ajout-demande-infos-supp" rows="6"
								  v-model="demande.additionalInformation"></textarea>
						<!-- Validation -->
						<p v-if="erreurs.additionalInformation" class="error-message">Veuillez remplir ce champs.</p>
					</div>
				</div>
				<!-- Section Parcourir -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<div>

						<div class="form-fiche__label-input-horizontal form-fiche__input-parcourir">
							<label hidden for="parcourir"></label>
							<input type="text" id="parcourir" name="parcourir">
							<button disabled>Parcourir</button>
						</div>

					</div>
				</div>
			</div>
			<!-- Boutons annuler et mettre à jour -->
			<BtnAnnulerModifierSauvegarder
				buttonText="Sauvegarder"
				buttonClass="bouton bouton--turquoise">
			</BtnAnnulerModifierSauvegarder>
		</form>
	</div>

</template>

<script setup>
	import { reactive, onMounted, ref } from "vue";
	import { useInternshipRequests } from "../composables/demandes_stages/demandeDeStage.js";
	import { useCandidat } from "../composables/candidats/candidat.js";
	import { useProvinces } from "../composables/provinces/provinces.js";
	import { useInternshipTypes } from "@/composables/types_stage/types_stage.js";
	import { useActivitySectors } from "../composables/secteurs_activites/secteurs_activites.js";
	import { useRouter } from 'vue-router';
	import BtnAnnulerModifierSauvegarder from '../components/BtnAnnulerModifierSauvegarder.vue'

	const {
		addRequest,
		getAllRequests
	} = useInternshipRequests();
	const {
		getAllCandidats
	} = useCandidat();
	const {
		getAllProvinces,
		getProvinceById
	} = useProvinces();
	const {
		getAllInternshipTypes
	} = useInternshipTypes();
	const {
		getAllActivitySectors
	} = useActivitySectors();

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
			erreurs.value.activitySector = (activitySectorInput.value === '' || activitySectorInput.value ===
				undefined),
			erreurs.value.city = demande.value.candidate.city === '',
			erreurs.value.province = (demande.value.province.value === '' || demande.value.province.value ===
				undefined),
			erreurs.value.etablissement = etablissementInput.value === '',
			erreurs.value.startDate = demande.value.startDate === '',
			erreurs.value.endDate = demande.value.endDate === '',
			console.log('demande.value.skills: ', demande.value.skills)
		erreurs.value.skills = ((demande.value.skills === undefined) || (demande.value.skills === '' || demande.value
				.skills[0] === '')),
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
			} else {
				throw new Error("Veuillez remplir tous les champs obligatoires.");
			}

		} catch (error) {
			console.error("Erreur lors de la soumission du formulaire :", error);
		}
	}

	const retour = () => {
		router.push({
			name: "DemandesStages"
		});
	}

	const listerCompetences = () => {
		competences.value = demande.value.skills.toString();
		competences.value = competences.value.replace(/ /g, '');
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