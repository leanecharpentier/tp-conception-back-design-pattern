Retour au <a href="../../README.md"> sommaire</a>

# 📌 Command

## 🎯 Problème qu'il résout

Quand une application déclenche des actions depuis plusieurs points d'entrée (boutons UI, API, jobs planifiés), la logique d'exécution se retrouve souvent dispersée partout.

On duplique du code, on couple fortement l'interface aux traitements métier, et il devient difficile de tracer, rejouer, mettre en file d'attente ou annuler certaines opérations.

Le pattern Command résout ce problème en encapsulant chaque action dans un objet autonome qui contient toutes les informations nécessaires à son exécution.

## 🧠 Principe de fonctionnement

Au lieu d'appeler directement les méthodes métier, le client crée des objets **commande**.  
Chaque commande implémente une interface commune (souvent `execute()`, parfois `undo()`), et délègue le travail à un **récepteur** qui porte la logique métier.

Un **invoker** (demandeur) déclenche ensuite ces commandes sans connaître les détails internes.  
Ce découplage permet de logger, stocker, ordonnancer, rejouer et annuler les actions.

## 🏗 Structure (rôles des classes)

Le pattern Command implique généralement :

- **Command** : Interface commune qui définit la méthode d'exécution (`execute`)

- **Concrete Commands** : Implémentations concrètes d'actions (ex: suspendre un abonnement, changer un plan)

- **Receiver** : Objet métier qui sait réellement exécuter l'action

- **Invoker** : Objet qui déclenche la commande (UI, scheduler, orchestrateur)

- **Client** : Assemble les objets (récepteurs + commandes + invoker) et configure le flux

## 📈 Avantages

Les **avantages** de Command :

- **Découplage fort :** Le code qui déclenche une action ne dépend pas du détail de son exécution

- **Extensibilité :** Ajouter une nouvelle action revient à créer une nouvelle commande

- **Historisation/annulation :** On peut stocker les commandes exécutées pour audit ou undo

- **File d'attente et exécution différée :** Les commandes sont des objets transportables et planifiables

## ⚠️ Inconvénients

Les **inconvénients** de Command :

- **Complexité structurelle :** Plus de classes qu'un appel direct

- **Overhead pour petits cas :** Sur des scénarios très simples, le pattern peut sembler lourd

- **Gestion d'undo parfois complexe :** Certaines opérations sont difficiles à inverser proprement

## 🧩 Cas d'usage réel possible

Le pattern Command est utile quand on veut standardiser la manière de déclencher des actions métier, tout en gardant la possibilité d'auditer et d'annuler.

Pour ce TP, nous allons explorer le cas d'une **plateforme SaaS de gestion d'abonnements** :

- **Contexte métier :** Les équipes support déclenchent des opérations sur les abonnements : suspension, reprise et changement de plan

- **Problématique :** Ces actions peuvent venir de plusieurs canaux (back-office, scripts automatiques, API) et doivent être exécutées de façon homogène avec traçabilité

- **Solution Command :** Chaque action est encapsulée dans une commande (`SuspendSubscriptionCommand`, `ResumeSubscriptionCommand`, `ChangePlanCommand`) exécutée par un invoker `SubscriptionCommandBus`, avec historique pour annulation

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`
