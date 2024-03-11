<template>
	<section>
		<h1>Ajouter une demande</h1>

		<div>
			<!-- COMPONENT?? Classe pour flex les boutons -->
			<button>Annuler</button>
			<button>Sauvegarder</button>
		</div>

		<form>
			<div>
				<!-- Classe pour regrouper le input et le label side by side -->
				<label for="demande-titre">Titre</label>
				<input type="text" id="demande-titre" name="demande-titre" required />
			</div>

			<div>
				<!-- Classe pour encadré blanc -->

				<div>
					<!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
					<label for="demande-nom-prenom">Nom et prénom</label>
					<input
						type="text"
						id="demande-nom-prenom"
						name="demande-nom-prenom"
						required />
				</div>

				<div
					><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
					<label for="demande-presentation">Présentation</label>
					<textarea
						id="demande-presentation"
						name="demande-presentation"
						required></textarea>
				</div>

				<div>
					<!-- Classe pour groupe de deux inputs qui occupent 50% de l'espace -->
					<div
						><!-- Classe pour regrouper DEUX INPUTS UN EN DESSOUS DE L'AUTRES-->
						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="demande-programme">Programme de formation</label>
							<input
								type="text"
								id="demande-programme"
								name="demande-programme"
								required />
						</div>

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="demande-secteur">Secteur d'activité</label>
							<select id="demande-secteur" name="demande-secteur" required>
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
							<label for="demande-etablissement">Établissement scolaire</label>
							<input
								type="text"
								id="demande-etablissement"
								name="demande-etablissement"
								required />
						</div>

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="demande-ville">Ville</label>
							<input
								type="text"
								id="demande-ville"
								name="demande-ville"
								required />
						</div>
					</div>
				</div>

				<div
					><!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 100 % de l'espace-->
					<div
						><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="demande-region">Région</label>
						<select id="demande-region" name="demande-region" required>
							<option value="">Veuillez effectuer un choix</option>
							<!-- Autres options de l'API -->
						</select>
					</div>

					<div
						><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="demande-competences">Compétences</label>
						<textarea
							id="demande-competences"
							name="demande-competences"
							required></textarea>
					</div>
				</div>

				<fieldset>
					<legend>Informations sur le stage recherché</legend>

					<div>
						<!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 50 % de l'espace-->

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="demande-type">Type de stage</label>
							<select id="demande-type" name="demande-type" required>
								<option value="">Veuillez effectuer un choix</option>
								<!-- Autres options de l'API -->
							</select>
						</div>

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="demande-heures">Nombre d'heures par semaine</label>
							<select id="demande-heures" name="demande-heures" required>
								<option value="">Veuillez effectuer un choix</option>
								<!-- Autres options de l'API -->
							</select>
						</div>
					</div>

					<div>
						<!-- Classe pour regrouper deux inputs un en dessous de l'autre qui occupent 50 % de l'espace-->
						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="demande-date-debut">Date de début</label>
							<input
								type="date"
								id="demande-date-debut"
								name="demande-date-debut"
								required />
						</div>

						<div
							><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
							<label for="demande-date-fin">Date de fin</label>
							<input
								type="date"
								id="demande-date-fin"
								name="demande-date-fin"
								required />
						</div>
					</div>

					<div
						><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="demande-remuneration">Rémunération</label>
						<input
							type="date"
							id="demande-date-fin"
							name="demande-date-fin"
							required />
					</div>
				</fieldset>

				<fieldset>
					<legend>Informations supplémentaires</legend>
					<div
						><!-- Classe pour regrouper le input et le label un en dessous de l'autre-->
						<label for="demande-infos-supp">Présentation</label>
						<!-- Classe pour cacher le label -->
						<textarea
							id="demande-infos-supp"
							name="demande-infos-supp"
							required></textarea>
					</div>
				</fieldset>
			</div>

			<div>
				<!-- COMPONENT?? Classe pour flex les boutons -->
				<button>Annuler</button>
				<button>Sauvegarder</button>
			</div>
		</form>
	</section>
</template>

<script setup></script>

<style></style>
