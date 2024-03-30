<template>
	<section v-if="demande">
		<p>Demande de stage</p>
		<h1> {{ demande.title }}</h1>

		<div>
			<!-- COMPONENT?? Classe pour flex les boutons -->
			<button @click="retour()">Annuler</button>
			<button @click="modifDemande()">Mettre à jour</button>
		</div>

		<form id="edit-demande-stage">
			<div>
				<!-- Classe pour encadré blanc -->

				<div>
					<!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
					<label for="edit-demande-candidat">Candidat</label>
					<select id="edit-demande-candidat"
							name="edit-demande-candidat"
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
                        Veuillez choisir un candidat.
                    </p>
				</div>

				<div>
					<!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
					<label for="edit-demande-presentation">Présentation</label>
					<textarea
						id="edit-demande-presentation"
						name="edit-demande-presentation"
						v-model="demande.description"></textarea>
					<p v-if="erreurs.description" class="error-message">
						Veuillez fournir une présentation.
					</p>
				</div>

				<div>
					<!-- Classe pour groupe de deux inputs qui occupent 50% de l'espace -->
					<div><!-- Classe pour regrouper DEUX INPUTS UN EN DESSOUS DE L'AUTRES-->
						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="edit-demande-programme">Programme de formation</label>
							<input
								type="text"
								id="edit-demande-programme"
								name="edit-demande-programme"
								v-model.trim="formationInput"/>
							<p v-if="erreurs.formation" class="error-message">
								Veuillez fournir un programme de formation.
							</p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="edit-demande-secteur">Secteur d'activité</label>
							<select id="edit-demande-secteur"
									name="edit-demande-secteur"
									v-model="activitySectorInput">
								<option value="">Veuillez effectuer un choix</option>
								<option
									v-for="secteurActivite in secteursActivites"
									:key="secteurActivite._id"
									:value="secteurActivite">
									{{ secteurActivite.value }}
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
							<label for="edit-demande-etablissement">Établissement scolaire</label>
							<input
								type="text"
								id="edit-demande-etablissement"
								name="edit-demande-etablissement"
								value="Cégep de Trois-Rivières"
								v-model="etablissementInput" />
							<p v-if="erreurs.etablissement" class="error-message">
								Veuillez fournir un établissement scolaire.
							</p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="edit-demande-ville">Ville</label>
							<input
								type="text"
								id="edit-demande-ville"
								name="edit-demande-ville"
								v-model="demande.candidate.city" />
							<p v-if="erreurs.city" class="error-message">
								Veuillez fournir une ville.
							</p>
						</div>
					</div>
				</div>

				<div
					><!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 100 % de l'espace-->
					<div
						><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="edit-demande-region">Région</label>
						<select
							id="edit-demande-region"
							name="edit-demande-region"
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
						<label for="edit-demande-competences">Compétences</label>
						<textarea
							id="edit-demande-competences"
							name="edit-demande-competences"
							v-model="demande.skills"></textarea>
						<p v-if="erreurs.skills" class="error-message">
							Veuillez fournir des compétences.
						</p>
					</div>
				</div>

				<fieldset>
					<legend>Informations sur le stage recherché</legend>

					<div>
						<!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 50 % de l'espace-->

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="edit-demande-type">Type de stage</label>
							<select id="edit-demande-type" name="ajout-demande-type" v-model.trim="demande.internshipType">
								<option value="">Veuillez effectuer un choix</option>
								<option
									v-for="internshipType in internshipTypes"
									:key="internshipType._id"
									:value="internshipType">
									{{ internshipType.value }}
								</option></select>
								<p v-if="erreurs.internshipType" class="validForm">
									Veuillez choisir un type de stage.
								</p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="edit-demande-heures">Nombre d'heures par semaine</label>
							<input
								id="edit-demande-heures"
								name="edit-demande-heures"
								type="number"
								v-model.trim="demande.weeklyWorkHours"/>
							<p v-if="erreurs.weeklyWorkHours" class="error-message">
								Veuillez inscrire le nombre d'heures par semaine.
							</p>
						</div>
					</div>

					<div>
						<!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 50 % de l'espace-->
						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="edit-demande-date-debut">Date de début</label>
							<input
								type="date"
								id="edit-demande-date-debut"
								name="edit-demande-date-debut"
								v-model.trim="dateDebut" />
							<p v-if="erreurs.startDate" class="validForm">
								Veuillez fournir une date de début.
							</p>
						</div>

						<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="edit-demande-date-fin">Date de fin</label>
							<input
								type="date"
								id="edit-demande-date-fin"
								name="edit-demande-date-fin"
								v-model.trim="dateFin" />
							<p v-if="erreurs.endDate" class="validForm">
								Veuillez fournir une date de fin.
							</p>
						</div>
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
						<!-- Wrapper case checkbox + label -->
					</div>
				</fieldset>

				<fieldset>
					<legend>Informations supplémentaires</legend>
					<div><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="edit-demande-infos-supp">Informations supplémentaires</label>
						<!-- Classe pour cacher le label -->
						<textarea
							id="edit-demande-infos-supp"
							name="edit-demande-infos-supp"
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

	const {getCandidatById, getAllCandidats} = useCandidat();
	const {getAllProvinces, getProvinceById} = useProvinces();
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
	const candidates = ref([]);
	const competences = ref('');
	const formulaireValide = ref(false);
	const formationInput = ref('Développement Web');
	const activitySectorInput = ref('');
	const etablissementInput = ref('Cégep de Trois-Rivières');
	let ignoreFirstChange = true;

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
		isActive: true
	});

	const erreurs = ref({
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
		erreurs.value.candidat = demande.value.candidate === '',
		erreurs.value.description = ((demande.value.description === undefined) || (demande.value.description === '')),
		erreurs.value.formation = formationInput.value === '',
		erreurs.value.activitySector = activitySectorInput.value === '',
		erreurs.value.city = ((demande.value.candidate.city === undefined) || (demande.value.candidate.city === '')),
		erreurs.value.province = ((demande.value.province === undefined) || (demande.value.province === '')),
		erreurs.value.etablissement = etablissementInput.value === '',
		erreurs.value.startDate = demande.value.startDate === '',
		erreurs.value.endDate = demande.value.endDate === '',
		erreurs.value.skills = ((demande.value.skills === undefined) || (demande.value.skills === '')),
		erreurs.value.internshipType = ((demande.value.internshipType === undefined) || (demande.value.internshipType === '')),
		erreurs.value.weeklyWorkHours = demande.value.weeklyWorkHours === 0,
		erreurs.value.additionalInformation = demande.value.additionalInformation === ''
		
		return Object.values(erreurs.value).some(err => err);
	};

	const candidatChange = async () => {
		demande.value.description = demande.value.candidate.description;
		if(demande.value.candidate) {
			demande.value.province = await getProvinceById(demande.value.candidate.province);
		}
		demande.value.skills = demande.value.candidate.skills;
	}

	const modifDemande = async () => {
		try {
			formulaireValide.value = validerFormulaire();
			
			if (!formulaireValide.value) {
				demande.value.candidate.firstName = nomDuCandidat.value.substring(0, nomDuCandidat.value.indexOf(' '));
				demande.value.candidate.lastName = nomDuCandidat.value.substring(nomDuCandidat.value.indexOf(' ') + 1);
				listerCompetences();
				// console.log("avant - demande.value.candidate.province: ", demande.value.candidate.province)
				// demande.value.candidate.province = await getProvinceById(demande.value.candidate.province);
				// console.log("après - demande.value.candidate.province: ", demande.value.candidate.province)
				await editRequest(id, demande.value);
				console.log("Request edited successfully");
				retour();
			} else {
				throw new Error("Veuillez remplir tous les champs obligatoires.");
			}
		} catch (error) {
			console.error("Erreur lors de la modification de la demande :", error);
		}
	};

	const ajusterDonneesCandidats = () => {
		candidates.value.forEach(candidate => {
			candidate.province = candidate.province._id;
		});
	}

	const listerCompetences = () => {
		competences.value = demande.value.skills.toString();
		competences.value = competences.value.replace(/ /g,'');
		demande.value.skills = competences.value.split(',');
	}

	onMounted(async () => {
		const candidatesData = await getAllCandidats();
		candidates.value = candidatesData.data;
		ajusterDonneesCandidats();
		console.log("candidates.value: ", candidates.value);
		secteursActivites.value = await getAllActivitySectors();
		activitySectorInput.value = secteursActivites.value[Math.floor(Math.random()*secteursActivites.value.length)];
		const provincesData = await getAllProvinces();
		provinces.value = provincesData.data;
		console.log("provinces.value: ", provinces.value);
		const internshipTypesData = await getAllInternshipTypes();
		internshipTypes.value = internshipTypesData.data;
		const demandeData = await getRequestById(id);
		console.log("demandeData: ", demandeData);
		demande.value = demandeData.data;
		demande.value.candidate = demandeData.data.candidate;
		console.log("demande.value: ", demande.value);
		console.log("demande.value.candidate: ", demande.value.candidate);
		console.log("demande.value.province: ", demande.value.province);
		console.log("demande: ", demande.value)
		nomDuCandidat.value = demande.value.candidate.firstName + ' ' + demande.value.candidate.lastName;
		dateDebut.value = demande.value.startDate.substring(0, demande.value.startDate.indexOf('T'));
		dateFin.value = demande.value.endDate.substring(0, demande.value.startDate.indexOf('T'));
	});

	const retour = () => {
		router.push({name: "DemandesStages"});
	}
</script>

<style></style>
