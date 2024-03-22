<template
	><section v-if="demande">
		<h1>Ajouter une demande</h1>

		<form id="ajout-demande-stage" @submit.prevent="soumettreFormulaire">
			<div>
				<!-- COMPONENT?? Classe pour flex les boutons -->
				<button>Annuler</button>
				<button type="submit">Sauvegarder</button>
			</div>

			<div>
				<!-- Classe pour regrouper le input et le label side by side -->
				<label for="ajout-demande-titre">Titre</label>
				<input
					type="text"
					id="ajout-demande-titre"
					name="ajout-demande-titre"
					v-model="demande.title" />
				<p v-if="errors.title" class="error-message">
					Veuillez fournir le titre du stage.
				</p>
			</div>

			<div>
				<!-- Classe pour encadré blanc -->

				<div>
					<!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
					<label for="ajout-demande-nom-prenom">Nom et prénom</label>
					<!-- <input
						type="text"
						id="ajout-demande-nom-prenom"
						name="ajout-demande-nom-prenom" /> -->
					<select id="ajout-demande-nom-prenom" name="ajout-demande-nom-prenom" v-model.trim="demande.candidate">
						<option value="">Veuillez effectuer un choix</option>
						<option
							v-for="candidate in candidates"
							:key="candidate._id"
							:value="candidate">
							{{ candidate.firstName }} {{ candidate.lastName }}
						</option></select>

					<!-- Autres options de l'API -->
					<!-- <p v-if="errors.fullName" class="error-message">
                        Veuillez fournir votre nom complet.
                    </p> -->
				</div>

				<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
					<label for="ajout-demande-presentation">Présentation</label>
					<textarea
						id="ajout-demande-presentation"
						name="ajout-demande-presentation"
						v-model.trim="demande.description"></textarea>
					<p v-if="errors.description" class="error-message">
						Veuillez fournir une présentation.
					</p>
				</div>

				<div>
					<!-- Classe pour groupe de deux inputs qui occupent 50% de l'espace -->
					<div><!-- Classe pour regrouper DEUX INPUTS UN EN DESSOUS DE L'AUTRES-->
						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<!-- <label for="ajout-demande-programme"
								>Programme de formation</label
							>
							<input
								type="text"
								id="ajout-demande-programme"
								name="ajout-demande-programme"
								v-model.trim="demande.program" /> -->
							<!-- <p v-if="errors.activitySector" class="error-message">
                                Veuillez fournir un programme de formation.
                            </p> -->
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<!-- <label for="ajout-demande-secteur">Secteur d'activité</label>
							<select id="ajout-demande-secteur" name="ajout-demande-secteur">
								<option value="">Veuillez effectuer un choix</option>
								<option
									v-for="activitySector in demande.activitySector"
									:key="activitySector"
									:value="activitySector">
									{{ activitySector }}
								</option>
							</select> -->
						</div>
					</div>
				</div>

				<div>
					<!-- Classe pour groupe de deux inputs qui occupent 50% de l'espace -->
					<div><!-- Classe pour regrouper deux inputs side by side-->
						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<!-- <label for="ajout-demande-etablissement"
								>Établissement scolaire</label
							>
							<input
								type="text"
								id="ajout-demande-etablissement"
								name="ajout-demande-etablissement"
								v-model="demande.etablissement" />
							<p v-if="errors.etablissement" class="error-message">
								Veuillez fournir un établissement
							</p> -->
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-ville">Ville</label>
							<input
								type="text"
								id="ajout-demande-ville"
								name="ajout-demande-ville"/>
							<p v-if="errors.city" class="error-message">
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
					</div>

					<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="ajout-demande-competences">Compétences</label>
						<textarea
							id="ajout-demande-competences"
							name="ajout-demande-competences"
							v-model="demande.candidate.skills"></textarea>
						<p v-if="errors.skills" class="error-message">
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
								</option></select>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-heures"
								>Nombre d'heures par semaine</label>

							<input
								type="number"
								id="ajout-demande-heures"
								name="ajout-demande-heures"
								v-model.trim="demande.weeklyWorkHours" />
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
							<p v-if="errors.startDate" class="error-message">
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
							<p v-if="errors.startDate" class="error-message">
								Veuillez fournir une date de fin.
							</p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<!-- <label for="ajout-demande-remuneration">Rémunération</label> -->
							<!-- Remplacer par legend? Faire une recherche. -->

							<!-- <div v-for="(type, index) in demande.remuneration" :key="index">
								<input
									type="checkbox"
									:id="'ajout-demande-' + type"
									name="ajout-demande-remuneration"
									:value="type"
									v-model="remunerationType" />
								<label :for="'ajout-demande-' + type">{{ type }}</label>
							</div> -->
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
						<!-- <p v-if="errors.additionalInformation" class="error-message">
                            Veuillez fournir des informations supplémentaires.
                        </p> -->
					</div>
				</fieldset>
			</div>

			<div>
				<!-- COMPONENT?? Classe pour flex les boutons -->
				<!-- <button>Annuler</button>
				<button type="submit">Sauvegarder</button> -->
			</div>
		</form>
	</section>
</template>

<!-- Il va rester à ajouter la validation pour les champs firstName et lastName (currently: fullName), Établissement scolaire, les champs select, checkbox et date.  -->

<script setup>
	import {reactive, onMounted, ref} from "vue";
	import {useInternshipRequests} from "../composables/demandes_stages/demandeDeStage.js";
	import {useCandidat} from "../composables/candidats/candidat.js";
	import {useProvinces} from "../composables/provinces/provinces.js";
	import {useInternshipTypes} from "@/composables/types_stage/types_stage.js";
	const {addRequest, getAllRequests} = useInternshipRequests();
	const {getAllCandidats} = useCandidat();
	const {getAllProvinces} = useProvinces();
	const {getAllInternshipTypes} = useInternshipTypes();

	const candidates = ref([]);
	const provinces = ref([]);
	const internshipTypes = ref([]);
	const remunerationType = ref([]);

	const demande = reactive({
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
		skills: ["Front-end", "Design"],
		internshipType: {
			_id: "",
			value: "",
		},
		additionalInformation: "",
		isActive: true,

		program: "Design graphique",
		activitySector: ["Design", "Graphisme"],
		etablissement: "Collège de Maisonneuve",
		remuneration: [
			"Rémunéré",
			"Non-rémunéré",
			"À la discrétion de l'entreprise",
		],
	});

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
			console.error(
				"Erreur lors de la récupération des types de stages :",
				error
			);
		}
	};

	initTypes();
	initCandidats();
	initProvinces();

	const soumettreFormulaire = async (e) => {
		try {
			// Prevent default form submission
			e.preventDefault();

			// Validate the form
			await validate(e);

			// If form is valid, proceed with adding request
			if (validForm.value) {
				await ajouterDemande();
			} else {
				console.log(
					"Form validation failed. Please fill in all required fields."
				);
			}
		} catch (error) {
			console.error("Erreur lors de la soumission du formulaire :", error);
		}
	};

	const ajouterDemande = async () => {
		try {
			/* if (!validerFormulaire()) {
						throw new Error("Veuillez remplir tous les champs obligatoires.");
					} */
			console.log("Tentative d'ajout du candidat :", demande);
			await addRequest(demande);
			console.log("Nouvelle demande ajoutée");
			await getAllRequests();
			/* router.push({name: "Candidats"}); */
		} catch (error) {
			console.error("Erreur lors de l'ajout de la demande :", error);
		}
	};

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

	const validForm = ref(false);

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
	};

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
