Retour au <a href="../../README.md"> sommaire</a>

# 📌 State

## 🎯 Problème qu'il résout

Quand un objet peut passer par plusieurs états (avec des comportements différents selon l'état courant), on finit souvent par accumuler des `if`/`switch` dans toutes ses méthodes.

Ce code devient difficile à lire, à tester et à faire évoluer. Ajouter un nouvel état ou une nouvelle transition oblige à modifier de nombreux blocs conditionnels.

Le pattern State résout ce problème en déplaçant la logique dépendante de l'état dans des classes dédiées.

## 🧠 Principe de fonctionnement

L'objet principal (le **contexte**) conserve une référence vers un objet **état** courant.  
Au lieu de gérer la logique lui-même, il délègue les actions à cet objet état.

Chaque état concret implémente le même contrat, mais avec son propre comportement.  
Quand une transition est nécessaire, l'état courant (ou le contexte) remplace l'objet état par un autre.

## 🏗 Structure (rôles des classes)

Le pattern State implique généralement :

- **Contexte (Context)** : Objet principal qui expose les actions métier et délègue au state courant

- **Interface State** : Contrat commun des comportements dépendants de l'état

- **États concrets (Concrete States)** : Implémentent les actions et déclenchent les transitions autorisées

- **Client** : Utilise le contexte sans gérer les détails de transition

## 📈 Avantages

Les **avantages** du State :

- **Code plus lisible :** La logique d'un état est regroupée dans une classe dédiée

- **Réduction des conditionnels :** On évite les gros `switch` dispersés dans le contexte

- **Évolutivité :** Ajouter un nouvel état est plus simple et moins risqué

- **Meilleure séparation des responsabilités :** Le contexte orchestre, les états décident du comportement

## ⚠️ Inconvénients

Les **inconvénients** du State :

- **Nombre de classes plus élevé :** Chaque état concret ajoute une classe

- **Surcoût pour un petit automate :** Si l'objet n'a que 2-3 cas simples, le pattern peut être trop lourd

- **Transitions à bien cadrer :** Sans règles claires, on peut compliquer inutilement le flux métier

## 🧩 Cas d'usage réel possible

Le State est pertinent quand le comportement d'un objet change fortement selon son cycle de vie.

Pour ce TP, nous allons explorer le cas d'un **ticket de support client** :

- **Contexte métier :** Un ticket passe par plusieurs états (`Nouveau`, `EnCours`, `EnAttenteClient`, `Résolu`)

- **Problématique :** Les actions (`assigner`, `repondreClient`, `resoudre`, `reouvrir`) n'ont pas le même effet selon l'état courant

- **Solution State :** `SupportTicket` délègue chaque action à son état courant. Chaque classe d'état gère le comportement autorisé et les transitions valides

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`
