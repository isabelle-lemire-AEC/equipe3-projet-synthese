<template>
	<section>
		<h1>Ajouter une demande</h1>

		<div>
			<!-- COMPONENT?? Classe pour flex les boutons -->
			<RouterLink to="/demandes-de-stages">Annuler</RouterLink>
			<button type="submit">Sauvegarder</button>
		</div>

		<form id="ajout-demande-stage" @submit.prevent="validate">
			<div>
				<!-- Classe pour regrouper le input et le label side by side -->
				<label for="ajout-demande-titre">Titre</label>
				<input
					type="text"
					id="ajout-demande-titre"
					name="ajout-demande-titre"
					v-model.trim="demande.title" />
				<p v-if="errors.title" class="error-message">
					Veuillez fournir le titre du stage.
				</p>
			</div>

			<div>
				<!-- Classe pour encadré blanc -->

				<div>
					<!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
					<label for="ajout-demande-nom-prenom">Nom et prénom</label>
					<input
						type="text"
						id="ajout-demande-nom-prenom"
						name="ajout-demande-nom-prenom"
						v-model.trim="demande.fullName" />
					<p v-if="errors.fullName" class="error-message">
						Veuillez fournir votre nom complet.
					</p>
				</div>

				<div
					><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
					<label for="ajout-demande-presentation">Présentation</label>
					<textarea
						id="ajout-demande-presentation"
						name="ajout-demande-presentation"
						v-model="demande.description"></textarea>
					<p v-if="errors.description" class="error-message">
						Veuillez fournir une présentation.
					</p>
				</div>

				<div>
					<!-- Classe pour groupe de deux inputs qui occupent 50% de l'espace -->
					<div
						><!-- Classe pour regrouper DEUX INPUTS UN EN DESSOUS DE L'AUTRES-->
						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-programme">Programme de formation</label>
							<input
								type="text"
								id="ajout-demande-programme"
								name="ajout-demande-programme"
								v-model="demande.activitySector" />
							<p v-if="errors.activitySector" class="error-message">
								Veuillez fournir un programme de formation.
							</p>
						</div>

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-secteur">Secteur d'activité</label>
							<select id="ajout-demande-secteur" name="ajout-demande-secteur">
								<option value="">Veuillez effectuer un choix</option>
								<!-- Autres options de l'API -->
							</select>
						</div>
					</div>
				</div>

				<div>
					<!-- Classe pour groupe de deux inputs qui occupent 50% de l'espace -->
					<div
						><!-- Classe pour regrouper deux inputs side by side-->
						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-etablissement">Établissement scolaire</label>
							<input
								type="text"
								id="ajout-demande-etablissement"
								name="ajout-demande-etablissement" />
							<p v-if="errors.activitySector" class="error-message">
								Veuillez fournir un programme de formation.
							</p>
						</div>

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-ville">Ville</label>
							<input
								type="text"
								id="ajout-demande-ville"
								name="ajout-demande-ville"
								v-model="demande.city" />
							<p v-if="errors.city" class="error-message">
								Veuillez fournir une ville.
							</p>
						</div>
					</div>
				</div>

				<div
					><!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 100 % de l'espace-->
					<div
						><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="ajout-demande-region">Région</label>
						<select id="ajout-demande-region" name="ajout-demande-region">
							<option value="">Veuillez effectuer un choix</option>
							<!-- Autres options de l'API -->
						</select>
					</div>

					<div
						><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="ajout-demande-competences">Compétences</label>
						<textarea
							id="ajout-demande-competences"
							name="ajout-demande-competences"
							v-model="demande.skills"></textarea>
						<p v-if="errors.skills" class="error-message">
							Veuillez fournir des compétences.
						</p>
					</div>
				</div>

				<fieldset>
					<legend>Informations sur le stage recherché</legend>

					<div>
						<!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 50 % de l'espace-->

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-type">Type de stage</label>
							<select id="ajout-demande-type" name="ajout-demande-type">
								<option value="">Veuillez effectuer un choix</option>
								<!-- Autres options de l'API -->
							</select>
						</div>

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-heures">Nombre d'heures par semaine</label>
							<select id="ajout-demande-heures" name="ajout-demande-heures">
								<option value="">Veuillez effectuer un choix</option>
								<!-- Autres options de l'API -->
							</select>
						</div>
					</div>

					<div>
						<!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 50 % de l'espace-->
						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-date-debut">Date de début</label>
							<input
								type="date"
								id="ajout-demande-date-debut"
								name="ajout-demande-date-debut" />
						</div>

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="ajout-demande-date-fin">Date de fin</label>
							<input
								type="date"
								id="ajout-demande-date-fin"
								name="ajout-demande-date-fin" />
						</div>
					</div>

					<div
						><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="ajout-demande-remuneration">Rémunération</label> <!-- Remplacer par legend? Faire une recherche. -->
						<div>
							<input
								type="checkbox"
								id="ajout-demande-discretion"
								name="ajout-demande-remuneration"
								value="discretion"
								v-model="remunerationType" />
							<label for="ajout-demande-discretion"
								>À la discrétion de l'entreprise</label
							>
						</div>
						<!-- Wrapper case checkbox + label -->
						<div>
							<input
								type="checkbox"
								id="ajout-demande-remunere"
								name="ajout-demande-remuneration"
								value="remunere"
								v-model="remunerationType" />
							<label for="ajout-demande-remunere">Rémunéré</label>
						</div>
						<!-- Wrapper case checkbox + label -->
						<div>
							<input
								type="checkbox"
								id="ajout-demande-non-renumere"
								name="ajout-demande-remuneration"
								value="non-remunere"
								v-model="remunerationType" />
							<label for="ajout-demande-non-renumere">Non-rémunéré</label>
						</div>
						<!-- Wrapper case checkbox + label -->
					</div>
				</fieldset>

				<fieldset>
					<legend>Informations supplémentaires</legend>
					<div
						><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="ajout-demande-infos-supp">Présentation</label>
						<!-- Classe pour cacher le label -->
						<textarea
							id="ajout-demande-infos-supp"
							name="ajout-demande-infos-supp"
							v-model="demande.additionalInformation">
						</textarea>
						<p v-if="errors.additionalInformation" class="error-message">
							Veuillez fournir des informations supplémentaires.
						</p>
					</div>
				</fieldset>
			</div>

			<div>
				<!-- COMPONENT?? Classe pour flex les boutons -->
				<RouterLink to="/demandes-de-stages">Annuler</RouterLink>
				<button type="submit">Sauvegarder</button>
			</div>
		</form>
	</section>
</template>

<!-- Il va rester à ajouter la validation pour les champs firstName et lastName (currently: fullName), Établissement scolaire, les champs select, checkbox et date.  -->

<script setup>
	import {reactive, ref} from "vue";

	const remunerationType = ref([]);

	const demande = reactive({
		title: "",
		fullName: "",
		description: "",
		activitySector: "",
		city: "",
		province: "",
		skills: "",
		internshipType: "",
		weeklyWorkHours: "",
		startDate: "",
		endDate: "",
		paid: "",
		additionalInformation: "",
	});

	const errors = reactive({
		title: false,

		fullName: false,
		description: false,
		activitySector: false,

		city: false,
		province: false,
		skills: false,
		internshipType: false,
		weeklyWorkHours: false,
		startDate: false,
		endDate: false,
		paid: false,
		additionalInformation: false,
	});

	const validForm = ref(false);

	const validate = (e) => {
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

		console.log("Form submitted successfully!");
	};
</script>

<style></style>
