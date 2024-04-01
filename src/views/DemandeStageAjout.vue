<template>
    <div class="form-fiche formulaire-ajout-demandestages" v-if="demande">
		<div class="form-fiche__wrapper-titre">
			<h1>Ajouter une demande</h1>
		</div>

		<form id="ajout-demandestages" @submit.prevent="soumettreFormulaire">
			<!-- Boutons annuler et mettre à jour -->
			<div class="boutons">
                <button class="bouton bouton--transparent" type="submit">Annuler</button>
                <button class="bouton bouton--turquoise" type="submit">
                    <div class="icone-libelle">
                        <i class="fas fa-save"></i>
                        <span>Sauvegarder</span>
                    </div>
                </button>
            </div>

			<!-- Section titre -->
			<div class="form-fiche__input-hors-encadre">
				<div class="form-fiche__label-input-horizontal">
					<label for="ajout-demande-titre">Titre :</label>
					<input type="text" id="ajout-demande-titre" name="ajout-demande-titre" v-model.trim="demande.title" />
					<!-- Validation -->
					<p v-if="erreurs.title" class="validForm">Veuillez fournir le titre du stage.</p>
				</div>
			</div>

			<!-- Section encadré encadré blanc -->
			<div class="form-fiche__encadre">
				<!-- Section candidat -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<label for="ajout-demande-nom-prenom">Nom et prénom</label>
					<select id="ajout-demande-nom-prenom" name="ajout-demande-nom-prenom" v-model.trim="demande.candidate">
						<option value="">Veuillez effectuer un choix</option>
						<option v-for="candidate in candidates" :key="candidate._id" :value="candidate">
							{{ candidate.firstName }} {{ candidate.lastName }}
						</option>
					</select>
					<!-- Validation -->
					<p v-if="erreurs.candidat" class="validForm">Veuillez fournir votre nom complet.</p>
				</div>
				<!-- Section présentation -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<label for="ajout-demande-presentation">Présentation</label>
					<textarea id="ajout-demande-presentation" name="ajout-demande-presentation" rows="10" v-model.trim="demande.description"></textarea>
					<!-- Validation -->
					<p v-if="erreurs.description" class="validForm"> Veuillez fournir une présentation.</p>
				</div>
				<!-- Section infos -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<div class="form-fiche__colonnes-inputs">
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-programme">Programme de formation</label>
								<input type="text" id="ajout-demande-programme" name="ajout-demande-programme" v-model.trim="formationInput"/>
								<!-- Validation -->
								<p v-if="erreurs.formation" class="error-message">Veuillez fournir un programme de formation.</p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-secteur">Secteur d'activité</label>
								<select id="ajout-demande-secteur" name="ajout-demande-secteur" v-model="activitySectorInput">
									<option value="">Veuillez effectuer un choix</option>
									<option v-for="activitySector in allSecteursDActivites" :key="activitySector" :value="activitySector">
										{{ activitySector.value }}
									</option>
								</select>
								<!-- Validation -->
								<p v-if="erreurs.activitySector" class="error-message">Veuillez fournir un secteur d'activité de formation.</p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-region">Région</label>
								<select id="ajout-demande-region" name="ajout-demande-region" v-model.trim="demande.province">
									<option value="">Veuillez effectuer un choix</option>
									<option v-for="province in provinces" :key="province._id" :value="province">
										{{ province.value }}
									</option>
								</select>
								<!-- Validation -->
								<p v-if="erreurs.province" class="validForm">Veuillez choisir une région.</p>
							</div>					
						</div>
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-etablissement">Établissement scolaire</label>
								<input type="text" id="ajout-demande-etablissement" name="ajout-demande-etablissement" v-model="etablissementInput"/>
								<!-- Validation -->
								<p v-if="erreurs.etablissement" class="error-message">Veuillez fournir un établissement scolaire.</p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-ville">Ville</label>
								<input type="text" id="ajout-demande-ville" name="ajout-demande-ville" v-model.trim="demande.candidate.city"/>
								<!-- Validation -->
								<p v-if="erreurs.city" class="validForm"> Veuillez fournir une ville.</p>
							</div>
						</div>
					</div>
				</div>
				<!-- Section compétences -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<label for="ajout-demande-competences">Compétences</label>
					<textarea id="ajout-demande-competences" name="ajout-demande-competences" rows="10" v-model="competences"></textarea>
					<!-- Validation -->
					<p v-if="erreurs.skills" class="validForm">Veuillez fournir des compétences.</p>
				</div>
				<!-- Section info stage -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<h3>Informations sur le stage recherché</h3>
					<div class="form-fiche__colonnes-inputs">
						<!-- colonne de gauche -->
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-type">Type de stage</label>
								<select id="ajout-demande-type" name="ajout-demande-type" v-model.trim="demande.internshipType">
									<option value="">Veuillez effectuer un choix</option>
									<option v-for="internshipType in internshipTypes" :key="internshipType._id" :value="internshipType">
										{{ internshipType.value }}
									</option>
								</select>
								<!-- Validation -->
								<p v-if="erreurs.internshipType" class="validForm"> Veuillez choisir un type de stage. </p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-heures">Nombre d'heures par semaine</label>
								<input type="number" id="ajout-demande-heures" name="ajout-demande-heures" v-model.trim="demande.weeklyWorkHours" />
								<!-- Validation -->
								<p v-if="erreurs.weeklyWorkHours" class="validForm"> Veuillez inscrire le nombre d'heures par semaine. </p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-remuneration">Rémunération</label>
								<div>
									<input type="radio" id="ajout-demande-discretion" name="ajout-demande-remuneration" value="discretion" v-model="remunerationType" checked="checked" />
									<label for="ajout-demande-discretion" class="form-fiche__label-radio-input">À la discrétion de l'entreprise</label>
								</div>
								<div>
									<input type="radio" id="ajout-demande-remunere" name="ajout-demande-remuneration" value="remunere" v-model="remunerationType" />
									<label for="ajout-demande-remunere" class="form-fiche__label-radio-input">Rémunéré</label>
								</div>
								<div>
									<input type="radio" id="ajout-demande-non-renumere" name="ajout-demande-remuneration" value="non-remunere" v-model="remunerationType" />
									<label for="ajout-demande-non-renumere" class="form-fiche__label-radio-input">Non-rémunéré</label>
								</div>
							</div>
						</div>
						<!-- colonne de droite -->
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-date-debut">Date de début</label>
								<input type="date" id="ajout-demande-date-fin" name="ajout-demande-date-fin" v-model.trim="demande.endDate" />
								<!-- Vaidation -->
								<p v-if="erreurs.endDate" class="validForm">Veuillez fournir une date de fin.</p>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="ajout-demande-date-fin">Date de fin</label>
								<input type="date" id="ajout-demande-date-fin" name="ajout-demande-date-fin" v-model.trim="demande.endDate" />
								<!-- Validation -->
								<p v-if="erreurs.endDate" class="validForm"> Veuillez fournir une date de fin.</p>
							</div>
						</div>
					</div>
				</div>
				<!-- Section infos supplémentaires -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<h3>Informations supplémentaires</h3>
					<div>
						<label for="ajout-demande-infos-supp"></label>
						<textarea id="ajout-demande-infos-supp" name="ajout-demande-infos-supp" rows="10" v-model="demande.additionalInformation"></textarea>
						<!-- Validation -->
						<p v-if="erreurs.additionalInformation" class="error-message">Veuillez fournir des informations supplémentaires.</p>
					</div>
				</div>
				<!-- Section Parcourir -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<div>
						
						<div>
							<label for="parcourir"></label>
							<input type="text" id="parcourir" name="parcourir">
						</div>
						<button class="bouton">Parcourir</button>
					</div>
				</div>
			</div>
		</form>
	</div>

</template>

<!-- Il va rester à ajouter la validation pour les champs firstName et lastName (currently: fullName), Établissement scolaire, les champs select, checkbox et date.  -->

<script setup>
	import {reactive, onMounted, ref} from "vue";
	import {useInternshipRequests} from "../composables/demandes_stages/demandeDeStage.js";
	import {useCandidat} from "../composables/candidats/candidat.js";
	import {useProvinces} from "../composables/provinces/provinces.js";
	import {useInternshipTypes} from "@/composables/types_stage/types_stage.js";
	import {useActivitySectors} from "../composables/secteurs_activites/secteurs_activites.js";
	import {useRouter} from 'vue-router';

	const {addRequest, } = useInternshipRequests();
	const {getAllCandidats} = useCandidat();
	const {getAllProvinces} = useProvinces();
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

	// validation formulaire
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
		erreurs.value.skills = competences.value === '',
		erreurs.value.internshipType = demande.value.internshipType.value === '',
		erreurs.value.weeklyWorkHours = demande.value.weeklyWorkHours === 0,
		erreurs.value.additionalInformation = demande.value.additionalInformation === ''
		
		// Vérifie s'il y a des erreurs dans le formulaire
		return Object.values(erreurs.value).some(err => err);
	};

	const formulaireValide = ref(false);

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
		competences.value = competences.value.replace(/ /g,'');
		demande.value.skills = competences.value.split(',');
	}

	const ajouterDemande = async () => {
		try {
			listerCompetences();
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

	

	/* const validerFormulaire = () => {
				if (
					demande.title === "" ||
					demande.description === "" ||
					demande.candidate._id === "" ||
					demande.program === "" ||
					demande.activitySector === "" ||
					demande.etablissement === "" ||
					demande.province._id === "" ||
					demande.candidate.skills === "" ||
					demande.internshipType._id === "" ||
					demande.weeklyWorkHours === "" ||
					demande.startDate === "" ||
					demande.endDate === "" ||
					demande.paid === "" ||
					demande.additionalInformation === "" ||
					demande.isActive === "" ||
					demande.candidate.city === "" ||

				) {
					return false;
				}
				return true;
			}; */

	/* const annulerAjout = () => {
				console.log("Annuler l'ajout du candidat");
				router.push({name: "Candidats"});
			}; */

	const errors = reactive({
		title: false,
		candidate: false,
		description: false,
		program: false,
		activitySector: false,
		etablissement: false,
		city: false,
		province: false,
		skills: false,
		internshipType: false,
		weeklyWorkHours: false,
		startDate: false,
		endDate: false,
		remuneration: false,
		additionalInformation: false,
	});

	/*const validForm = ref(false);

	const validate = async (e) => {
		e.preventDefault();

		if (demande.title === "") {
			errors.title = true;
		} else {
			errors.title = false;
		}

		if (demande.candidate._id === "") {
			errors.candidate = true;
		} else {
			errors.candidate = false;
		}

		if (demande.description === "") {
			errors.description = true;
		} else {
			errors.description = false;
		}

		if (demande.program === "") {
			errors.program = true;
		} else {
			errors.program = false;
		}

		if (demande.activitySector === "") {
			errors.activitySector = true;
		} else {
			errors.activitySector = false;
		}

		if (demande.etablissement === "") {
			errors.etablissement = true;
		} else {
			errors.etablissement = false;
		}

		if (demande.candidate.city === "") {
			errors.city = true;
		} else {
			errors.city = false;
		}

		if (demande.province._id === "") {
			errors.province = true;
		} else {
			errors.province = false;
		}

		if (demande.skills === "") {
			errors.skills = true;
		} else {
			errors.skills = false;
		}

		if (demande.internshipType._id === "") {
			errors.internshipType = true;
		} else {
			errors.internshipType = false;
		}

		if (demande.weeklyWorkHours === "") {
			errors.weeklyWorkHours = true;
		} else {
			errors.weeklyWorkHours = false;
		}

		if (demande.startDate === "") {
			errors.startDate = true;
		} else {
			errors.startDate = false;
		}

		if (demande.endDate === "") {
			errors.endDate = true;
		} else {
			errors.endDate = false;
		}

		if (remunerationType.value === "") {
			errors.remuneration = true;
		} else {
			errors.remuneration = false;
		}

		if (demande.additionalInformation === "") {
			errors.additionalInformation = true;
		} else {
			errors.additionalInformation = false;
		}


		console.log(errors.title)
		console.log(errors.candidate)
		console.log(errors.description)
		console.log(errors.program)
		console.log(errors.activitySector)
		console.log(errors.etablissement)
		console.log(errors.city)
		console.log(errors.province)
		console.log(errors.skills)
		console.log(errors.internshipType)
		console.log(errors.weeklyWorkHours)
		console.log(errors.startDate)
		console.log(errors.endDate)
		console.log(errors.remuneration)
		console.log(errors.additionalInformation)

		if (
			errors.title === false &&
			errors.candidate === false &&
			errors.description === false &&
			errors.program === false &&
			errors.activitySector === false &&
			errors.etablissement === false &&
			errors.city === false &&
			errors.province === false &&
			errors.skills === false &&
			errors.internshipType === false &&
			errors.weeklyWorkHours === false &&
			errors.startDate === false &&
			errors.endDate === false &&
			errors.remuneration === false &&
			errors.additionalInformation === false
		) {
			validForm.value = true;
		} else {
			validForm.value = false;
		}
	};*/

	/* const validate = async (e) => {
					e.preventDefault();

					if (demande.title === "") {
						errors.title = true;
					} else {
						errors.title = false;
					}

					if (demande.fullName === "") {
						errors.fullName = true;
					} else {
						errors.fullName = false;
					}

					if (demande.description === "") {
						errors.description = true;
					} else {
						errors.description = false;
					}

					if (demande.activitySector === "") {
						errors.activitySector = true;
					} else {
						errors.activitySector = false;
					}

					if (demande.city === "") {
						errors.city = true;
					} else {
						errors.city = false;
					}

					if (demande.province === "") {
						errors.province = true;
					} else {
						errors.province = false;
					}

					if (demande.skills === "") {
						errors.skills = true;
					} else {
						errors.skills = false;
					}

					if (demande.internshipType === "") {
						errors.internshipType = true;
					} else {
						errors.internshipType = false;
					}

					if (demande.weeklyWorkHours === "") {
						errors.weeklyWorkHours = true;
					} else {
						errors.weeklyWorkHours = false;
					}

					if (demande.startDate === "") {
						errors.startDate = true;
					} else {
						errors.startDate = false;
					}

					if (demande.endDate === "") {
						errors.endDate = true;
					} else {
						errors.endDate = false;
					}

					if (demande.paid === "") {
						errors.paid = true;
					} else {
						errors.paid = false;
					}

					if (demande.additionalInformation === "") {
						errors.additionalInformation = true;
					} else {
						errors.additionalInformation = false;
					}

					if (
						errors.title === false &&
						errors.fullName === false &&
						errors.description === false &&
						errors.activitySector === false &&
						errors.city === false &&
						errors.province === false &&
						errors.skills === false &&
						errors.internshipType === false &&
						errors.weeklyWorkHours === false &&
						errors.startDate === false &&
						errors.endDate === false &&
						errors.paid === false &&
						errors.additionalInformation === false
					) {
						validForm.value = true;
					} else {
						validForm.value = false;
					}

					try {
						await addRequest(demande);
						console.log("Request added successfully");
					} catch (error) {
						console.error("Error adding request:", error);
					}

					console.log("Form submitted successfully!"); */
</script>

<style></style>
