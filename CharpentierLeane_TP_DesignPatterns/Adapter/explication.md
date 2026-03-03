Retour au <a href="../../README.md"> sommaire</a>

# 📌 Adapter

## 🎯 Problème qu'il résout

Dans un projet réel, on doit souvent brancher un composant externe ou hérité dont l'interface ne correspond pas à celle attendue par notre code métier.

Si on modifie tout le code client pour s'adapter à ce composant, on augmente le couplage, on fragilise l'application, et chaque changement de fournisseur devient coûteux.

Le pattern Adapter résout ce problème en introduisant une classe intermédiaire qui traduit les appels entre deux interfaces incompatibles.

## 🧠 Principe de fonctionnement

Le code client continue à utiliser son interface habituelle (cible). L'adaptateur implémente cette interface cible, reçoit les appels du client, puis convertit les données et délègue vers le service existant (adapté), avec le format et les méthodes qu'il comprend.

L'adaptateur agit donc comme un traducteur technique : il protège le code métier des détails d'intégration.

## 🏗 Structure (rôles des classes)

Le pattern Adapter implique généralement :

- **Client** : Le code métier qui consomme un service via une interface attendue

- **Interface cible (Target)** : Le contrat attendu par le client

- **Service existant (Adaptee)** : Le composant externe/hérité que l'on veut réutiliser, mais dont l'interface est incompatible

- **Adaptateur (Adapter)** : La classe qui implémente l'interface cible et encapsule l'adaptee pour convertir les appels

## 📈 Avantages

Les **avantages** de l'Adapter :

- **Réutilisation de composants existants :** Permet d'intégrer du code externe sans le modifier

- **Découplage de la logique métier :** Le client reste stable même si le fournisseur change

- **Évolution facilitée :** On peut ajouter de nouveaux adaptateurs pour d'autres services sans toucher au client

- **Meilleure maintenabilité :** Toute la logique de conversion est centralisée au même endroit

## ⚠️ Inconvénients

Les **inconvénients** de l'Adapter :

- **Complexité supplémentaire :** Ajoute une couche et des classes de plus dans l'architecture

- **Risque de multiplication des adaptateurs :** Si de nombreuses interfaces externes coexistent, le nombre d'adaptateurs peut augmenter rapidement

- **Conversion parfois coûteuse :** Certaines transformations de données peuvent impacter les performances

## 🧩 Cas d'usage réel possible

L'Adapter est particulièrement utile lorsqu'une même fonctionnalité métier doit fonctionner avec plusieurs fournisseurs externes qui n'ont pas les mêmes contrats d'API.

Pour ce TP, nous allons explorer le cas d'une **plateforme de messaging qui envoie des campagnes RCS** :

- **Contexte métier :** L'application génère un message RCS dans un format interne unique (`InternalRcsMessage`) puis doit l'envoyer via différents providers, par exemple Vonage ou CM

- **Problématique :** Même si le contenu métier est identique (expéditeur, destinataire, texte, rich card, CTA), chaque provider attend un payload différent (noms de champs, structure JSON, métadonnées, conventions de priorité)

- **Solution Adapter :** Le client métier s'appuie sur l'interface cible `RcsProvider` et ne connaît pas les détails des APIs externes. `VonageAdapter` et `CmAdapter` transforment le format interne en payload provider-specific, puis délèguent l'envoi au SDK/API correspondant

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`
