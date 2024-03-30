<template>
	<div class="form-fiche formulaire-edition-demandestages">
		<div class="form-fiche__wrapper-titre" v-if="demande">
			<p class="form-fiche__nom-section">Demande de stage</p>
			<h1>{{ demande.title }}</h1>
		</div>

		<form id="edition-demandestages" @submit.prevent="soumettreFormulaire">
			<!-- Boutons annuler et mettre à jour -->
			<div class="boutons">
				<button class="bouton bouton--transparent" type="submit" @click="retour()">Annuler</button>
				<button class="bouton bouton--turquoise" type="submit" @click="soumettreFormulaire()">
					<div class="icone-libelle">
						<i class="fas fa-save"></i>
						<span>Mettre à jour</span>
					</div>
				</button>
			</div>

			<!-- Section encadré encadré blanc -->
			<div class="form-fiche__encadre">
				<!-- Section candidat -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<label for="edit-demande-candidat">Candidats</label>
					<input type="text" id="edit-demande-candidat" name="edit-demande-candidat" v-model.trim="nomDuCandidat"/>
					<!-- Validation -->
					<!-- <p v-if="errors.fullName" class="error-message">Veuillez fournir le nom du candidat.</p> -->
				</div>
				<!-- Section Présentation -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<label for="edit-demande-presentation">Présentation</label>
					<textarea id="edit-demande-presentation" name="edit-demande-presentation" rows="10" v-model="demande.description"></textarea>
					<!-- Validation -->
					<!-- <p v-if="errors.description" class="error-message">Veuillez fournir une présentation.</p> -->
				</div>
				<!-- Section infos -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<div class="form-fiche__colonnes-inputs">
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-programme">Programme de formation</label>
								<input type="text" id="edit-demande-programme" name="edit-demande-programme" v-model="demande.title" />
								<!-- Validation -->
								<!-- <p v-if="errors.activitySector" class="error-message"> Veuillez fournir un programme de formation.</p> -->
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-secteur">Secteur d'activité</label>
								<select id="edit-demande-secteur" name="edit-demande-secteur">
									<option value="">Veuillez effectuer un choix</option>
									<option v-for="secteurActivite in secteursActivites" :key="secteurActivite._id" :value="secteurActivite" selected>
										{{ secteurActivite.value }}
									</option>
								</select>
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-region">Région</label>
								<select id="edit-demande-region" name="edit-demande-region" v-model.trim="demande.province">
									<option value="">Veuillez effectuer un choix</option>
									<option v-for="province in provinces" :key="province._id" :value="province">
										{{ province.value }}
									</option>
								</select>
							</div>					
						</div>
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-etablissement">Établissement scolaire</label>
								<input type="text" id="edit-demande-etablissement" name="edit-demande-etablissement" value="Cégep de Trois-Rivières" />
								<!-- Validation -->
								<!-- <p v-if="errors.activitySector" class="error-message"> Veuillez fournir un programme de formation. </p> -->
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-ville">Ville</label>
								<input type="text" id="edit-demande-ville" name="edit-demande-ville" v-model="demande.candidate.city" />
								<!-- Validation -->
								<!-- <p v-if="errors.city" class="error-message">Veuillez fournir une ville.</p> -->
							</div>
						</div>
					</div>
				</div>
				<!-- Section compétences -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<label for="edit-demande-competences">Compétences</label>
					<textarea id="edit-demande-competences" name="edit-demande-competences" v-model="demande.skills"></textarea>
					<!-- Validation -->
					<!-- <p v-if="errors.skills" class="error-message">Veuillez fournir des compétences.</p> -->
				</div>
				<!-- Section info stage -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<h3>Informations sur le stage recherché</h3>
					<div class="form-fiche__colonnes-inputs">
						<!-- colonne de gauche -->
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-type">Type de stage</label>
								<select id="edit-demande-type" name="ajout-demande-type" v-model.trim="demande.internshipType">
									<option value="">Veuillez effectuer un choix</option>
									<option v-for="internshipType in internshipTypes" :key="internshipType._id" :value="internshipType">
										{{ internshipType.value }}
									</option></select>
									<!-- Validation -->
									<!-- <p v-if="erreurs.internshipType" class="validForm">Veuillez effectuer un choix.</p> -->
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-heures">Nombre d'heures par semaine</label>
								<input id="edit-demande-heures" name="edit-demande-heures" v-model="demande.weeklyWorkHours" />
								<!-- Validation -->
								<!-- <p v-if="errors.description" class="error-message">Veuillez fournir une présentation.</p> -->
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-remuneration">Rémunération</label>
								<div>
									<input type="radio" id="edit-demande-discretion" name="edit-demande-remuneration" value="discretion" v-model="remunerationType" checked="checked" />
									<label for="edit-demande-discretion">À la discrétion de l'entreprise</label>
								</div>
								<div>
									<input type="radio" id="edit-demande-remunere" name="edit-demande-remuneration" value="remunere" v-model="remunerationType" />
									<label for="edit-demande-remunere">Rémunéré</label>
								</div>
								<div>
									<input type="radio" id="edit-demande-non-renumere" name="edit-demande-remuneration" value="non-remunere" v-model="remunerationType" />
									<label for="edit-demande-non-renumere">Non-rémunéré</label>
								</div>
							</div>
						</div>
						<!-- colonne de droite -->
						<div class="form-fiche__colonne-inputs">
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-date-debut">Date de début</label>
								<input type="date" id="edit-demande-date-debut" name="edit-demande-date-debut" v-model.trim="dateDebut" />
							</div>
							<div class="form-fiche__label-input-vertical">
								<label for="edit-demande-date-fin">Date de fin</label>
								<input type="date" id="edit-demande-date-fin" name="edit-demande-date-fin" v-model.trim="dateFin" />
							</div>
						</div>
					</div>
				</div>
				<!-- Section infos supplémentaires -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<h3>Informations sur le stage recherché</h3>
					<div>
						<label for="edit-demande-infos-supp"></label>
						<textarea id="edit-demande-infos-supp" name="edit-demande-infos-supp" rows="10" v-model="demande.additionalInformation"></textarea>
						<!-- Validation -->
						<!-- <p v-if="errors.additionalInformation" class="error-message"> Veuillez fournir des informations supplémentaires.</p> -->
					</div>
				</div>
				<!-- Section Parcourir et télécharger CV -->
				<div class="form-fiche__wrapper-titre-groupe-inputs">
					<div>
						<div>
							<label for="parcourir"></label>
							<input type="text" id="parcourir" name="parcourir">
						</div>
						<button class="bouton">Parcourir</button>
					</div>
					<btnTelechargerCV></btnTelechargerCV>
				</div>
			</div>
			<!-- fin encadré blanc -->
			
			<!-- Boutons annuler et mettre à jour -->
			<div class="boutons">
				<button class="bouton bouton--transparent" type="submit" @click="retour()">Annuler</button>
				<button class="bouton bouton--turquoise" type="submit" @click="soumettreFormulaire()">
					<div class="icone-libelle">
						<i class="fas fa-save"></i>
						<span>Mettre à jour</span>
					</div>
				</button>
			</div>
		</form>
	</div>
</template>

<!-- Il va rester à ajouter la validation pour les champs firstName et lastName (currently: fullName), Établissement scolaire, les champs select, checkbox et date.  -->

<script setup>
	import {reactive, ref, onMounted} from "vue";
	import {useCandidat} from "../composables/candidats/candidat";
	import {useProvinces} from "../composables/provinces/provinces";
	import {useInternshipRequests} from "../composables/demandes_stages/demandeDeStage";
	import {useInternshipTypes} from "../composables/types_stage/types_stage";
	import {useActivitySectors} from "../composables/secteurs_activites/secteurs_activites";
	import {useRoute} from "vue-router";
	import {useRouter} from 'vue-router';

	import btnTelechargerCV from '../components/BtnTelechargerCV.vue'

	const {getCandidatById, getAllCandidats} = useCandidat();
	const {getAllProvinces} = useProvinces();
	const {getRequestById, editRequest} = useInternshipRequests();
	const {getAllInternshipTypes} = useInternshipTypes();
	const {getAllActivitySectors} = useActivitySectors();

	const route = useRoute();
	const remunerationType = ref([]);
	const provinces = ref([]);
	const internshipTypes = ref([]);
	const id = route.params.id;
	const demandeResponse = ref([]);
	const nomDuCandidat = ref([]);
	const dateDebut = ref([]);
	const dateFin = ref([]);
	const secteursActivites = ref([]);
    const router = useRouter();

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
		isActive: true,

		program: "Design graphique",
		activitySector: ["Design", "Graphisme"],
		etablissement: "Collège de Maisonneuve",
		remuneration: [
			"Rémunéré",
			"Non-rémunéré",
			"À la discrétion de l'entreprise",
		]
	});

	const modifDemande = async () => {
		try {
			await editRequest(id, demande.value);
			console.log("Request edited successfully");
		} catch (error) {
			console.error("Erreur lors de la modification de la demande :", error);
		}
	};

	onMounted(async () => {
		secteursActivites.value = await getAllActivitySectors();
		const provincesData = await getAllProvinces();
		provinces.value = provincesData.data;
		const internshipTypesData = await getAllInternshipTypes();
		internshipTypes.value = internshipTypesData.data;
		const demandeData = await getRequestById(id);
		demande.value = demandeData.data;
		console.log("demande: ", demande)
		nomDuCandidat.value = demande.value.candidate.firstName + ' ' + demande.value.candidate.lastName;
		dateDebut.value = demande.value.startDate.substring(0, demande.value.startDate.indexOf('T'));
		dateFin.value = demande.value.endDate.substring(0, demande.value.startDate.indexOf('T'));;
	});

	const retour = () => {
		router.push({name: "DemandesStages"});
	}

	/* 	const errors = reactive({
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
	}); */

	/* 	const errors = reactive({
		title: false,
		description: false,
		candidate: {
			_id: false,
			description: false,
			email: false,
			firstName: false,
			lastName: false,
			address: false,
			phone: false,
			city: false,
			skills: false,
			province: {
				_id: false,
				value: false,
			},
			postalCode: false,
		},
		startDate: false,
		endDate: false,
		weeklyWorkHours: false,
		province: {
			_id: false,
			value: false,
		},
		skills: false,
		internshipType: {
			_id: false,
			value: false,
		},
		additionalInformation: false,
		isActive: false,
	}); */

	/* const validForm = ref(false); */

	const soumettreFormulaire = async () => {
		// e.preventDefault();
		// console.log("nomDuCandidat.value: ", nomDuCandidat.value);

		demande.value.candidate.firstName = nomDuCandidat.value.substring(0, nomDuCandidat.value.indexOf(' '));
		demande.value.candidate.lastName = nomDuCandidat.value.substring(nomDuCandidat.value.indexOf(' ') + 1);
		console.log("demande.candidate.firstName: ", demande.value.candidate.firstName);
		console.log("demande.candidate.lastName: ", demande.value.candidate.lastName);

		await modifDemande();

		retour();

		// modifDemande();

		/* if (demande.fullName === "") {
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
		} */

		console.log("Form submitted successfully!");
	};
</script>

<style>

</style>
