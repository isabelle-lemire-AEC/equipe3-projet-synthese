# Présentation du Projet

## Résumé
Le projet, réalisé par une équipe de 7 personnes, est une interface d’administration pour la gestion d’offres et de demandes de stage. Les administrateurs, qui doivent s’authentifier au préalable, peuvent consulter, ajouter, modifier et supprimer des entreprises, des candidats ainsi que des demandes et des offres de stage. L’application comprend un tableau de bord ainsi que des pages dédiées à la gestion de chaque section.

## Technologies utilisées
L’équipe a utilisé Vue.js, un framework JavaScript progressif, pour développer l’interface utilisateur. GitHub a été utilisé pour le contrôle de versions et la collaboration en équipe. L’API fournie (via Swagger) a été utilisée pour interagir avec la base de données. Finalement, pour l’intégration, nous avons utilisé Sass (avec la syntaxe SCSS).

## Fonctionnalités
- Gestion des Entreprises : Ajout, modification et suppression des entreprises.
- Gestion des Candidats : Ajout, modification et suppression des candidats.
- Gestion des Offres et Demandes de stage : Ajout, modification et suppression des offres et demandes de stage.
- Tableau de bord : Résumé des données obtenues lors de nos requêtes à l’API.

Pour l’ajout et la modification de fiches, nous avons conçu des formulaires et avons instauré un processus de validation pour rendre tous les champs obligatoires. Des expressions régulières (regex) ont également été utilisées pour approfondir ce dernier.

## Élaboration du projet
Pour l’élaboration du projet, nous avons adopté une approche par sprints. La première semaine a été consacrée au développement du squelette de l’interface, avec une répartition des sections du site entre des groupes de deux personnes, tandis qu’une personne s’est familiarisée avec l’API. La deuxième semaine a marqué le début de l’intégration de l’API et le développement des fonctionnalités. La troisième semaine a été dédiée à l’intégration HTML/CSS. Notre équipe a mis en œuvre la sémantique appropriée du HTML dans le cadre du framework Vue.js, et trois membres de l’équipe ont utilisé le préprocesseur Sass pour standardiser et harmoniser le CSS de chaque composant et de chaque vue. Les éléments répétitifs, comme les boutons et les fenêtres modales, ont été créés sous forme de composants avec leurs styles respectifs pour limiter la duplication de code. La dernière semaine a été consacrée à l’uniformisation du code et des pages, aux tests de l’API, au contrôle qualité et à la rédaction de la documentation.

## Défis rencontrés
L’équipe a rencontré plusieurs défis lors de la réalisation du projet :
- **1.	GitHub à 7 personnes :** Travailler à 7 sur GitHub a été un défi majeur. Il était difficile de ne pas empiéter sur le travail des autres ou de le ralentir. Avec plusieurs personnes travaillant sur le même code, il y a parfois eu des conflits de versions. L’utilisation d’un outil de contrôle de versions comme GitHub et l’habitude de faire des « Pull requests » régulièrement ont toutefois aidé à gérer ce problème.
- **2.	Manque de temps :** Le manque de temps a été un défi pour l’équipe. Il était essentiel de respecter les délais et de s’assurer que tout le monde soit capable de terminer son travail à temps.
- **3.	Travailler avec l’API :** L’intégration de l’API avec l’interface utilisateur a nécessité une compréhension approfondie de Vue.js. Cela a été un défi pour l’équipe. De plus, les nombreuses différences entre les données reçues et les données figurant dans les maquettes nous ont menés à nous poser de très nombreuses questions.
- **4.	Travailler avec une grande équipe :** Travailler au sein d’une équipe nombreuse a représenté plusieurs défis, notamment au niveau de la communication, la coordination des tâches et la gestion du temps.
- **5.	Partage des tâches :** Certaines personnes ont évoqué le manque de temps et ont ainsi fourni moins d’efforts au niveau du travail. Cela a entraîné une répartition inégale des tâches et a ralenti la progression du projet.

## Équipe 3 :
- Cadieux, Caroline (Contribution : Section Offres de stage, Sass, contrôle qualité, Tableau de bord)
- Lemire, Isabelle (Contribution : Gestion de GitHub, gestion du projet, section Candidats, Sass, Tableau de bord)
- Massicotte, Anne (Contribution : Responsable du Sass, section Demandes de stage, responsive du site, Tableau de bord)
- Mouterfi, Nacer (Contribution : Section Entreprises, validation de formulaires, documentation)
- Pereira, Donaria (Contribution : Section Candidats, Section Entreprises, documentation, page d’accueil)
- Thivierge, Jonathan (Contribution : Responsable des requêtes CRUD à travers le site, contrôle qualité, réglage de bogues divers, section Demandes de stage, Tableau de bord)
- Villeneuve, Raphaël (Contribution : Appels à l’API, section Offres de stage, validation des formulaires)
