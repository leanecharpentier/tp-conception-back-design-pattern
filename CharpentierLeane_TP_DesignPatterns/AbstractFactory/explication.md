Retour au <a href="../../README.md"> sommaire</a>

# 📌 Abstract Factory

## 🎯 Problème qu'il résout

Quand une application doit créer plusieurs objets liés entre eux (une "famille" de produits), instancier chaque objet avec `new` dans le code client crée vite des incohérences et un couplage fort.

Exemple typique : si on mélange des objets de variantes différentes (pays, offre, environnement, marque), le système peut fonctionner techniquement, mais produire un résultat métier incohérent.

Le pattern Abstract Factory résout ce problème en centralisant la création d'une famille complète d'objets compatibles, sans exposer les classes concrètes au code client.

## 🧠 Principe de fonctionnement

Le pattern repose sur une interface de fabrique abstraite qui déclare plusieurs méthodes de création (une par type de produit). Chaque fabrique concrète implémente cette interface pour une variante précise, et retourne uniquement des produits compatibles entre eux.

Le code client ne manipule que des interfaces (fabrique abstraite + produits abstraits). Il peut donc changer de variante simplement en changeant la fabrique injectée, sans modifier sa logique métier.

## 🏗 Structure (rôles des classes)

Le pattern Abstract Factory implique généralement :

- **Produits abstraits (Abstract Products)** : Interfaces communes pour chaque type d'objet de la famille (ex: `ContratTravail`, `BulletinPaie`, `DeclarationFiscale`)

- **Produits concrets (Concrete Products)** : Implémentations spécifiques de chaque produit abstrait, regroupées par variante (ex: version France, version Canada)

- **Fabrique abstraite (Abstract Factory)** : Interface qui expose toutes les méthodes de création nécessaires pour fabriquer la famille complète de produits

- **Fabriques concrètes (Concrete Factories)** : Implémentent la fabrique abstraite pour une variante donnée, en garantissant que les produits créés sont cohérents entre eux

- **Client** : Utilise uniquement les abstractions, sans dépendre des classes concrètes

## 📈 Avantages

Les **avantages** de l'Abstract Factory :

- **Cohérence garantie entre objets liés :** Tous les objets créés par la même fabrique appartiennent à la même variante et restent compatibles

- **Découplage fort du code client :** Le client dépend d'interfaces et non des classes concrètes

- **Facilité d'évolution :** On peut ajouter une nouvelle variante complète en ajoutant une nouvelle fabrique concrète et ses produits associés

- **Respect du principe Open/Close :** Le code client reste stable lorsqu'on enrichit le système avec de nouvelles familles

## ⚠️ Inconvénients

Les **inconvénients** de l'Abstract Factory :

- **Complexité structurelle :** Le nombre de classes/interfaces augmente rapidement

- **Effet domino lors d'un nouveau type de produit :** Ajouter un nouveau produit abstrait oblige à modifier l'interface de fabrique et toutes les fabriques concrètes

- **Surdimensionné pour des cas simples :** Si on n'a qu'un seul produit à créer, ce pattern peut être trop lourd

## 🧩 Cas d'usage réel possible

L'Abstract Factory est pertinent quand une application doit gérer plusieurs variantes d'un même domaine métier avec des règles différentes, tout en évitant les mélanges incohérents.

Pour ce TP, nous allons explorer le cas d'une **plateforme de paie internationale** :

- **Contexte métier :** Un logiciel RH génère automatiquement les documents d'embauche et de paie selon le pays de l'employé

- **Problématique :** Les documents d'un même dossier doivent rester cohérents (contrat, bulletin de paie et déclaration fiscale). Sans abstraction, on peut facilement mélanger un contrat d'un pays avec une déclaration fiscale d'un autre

- **Solution Abstract Factory :** Une interface `PayrollFactory` déclare `createContract()`, `createPayslip()` et `createTaxReport()`. Chaque fabrique concrète (`FrancePayrollFactory`, `CanadaPayrollFactory`, etc.) crée la famille complète de documents compatibles pour un pays donné

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`
