Retour au <a href="../../README.md"> sommaire</a>

# 📌 Composite

## 🎯 Problème qu'il résout

Quand une application manipule des éléments organisés en arborescence (éléments simples + groupes d'éléments), le code client devient vite complexe : il doit distinguer les types, gérer les niveaux d'imbrication, et écrire des parcours spécifiques.

Résultat : beaucoup de conditions, du code dupliqué, et une logique fragile dès qu'on ajoute un nouveau type de nœud.

Le pattern Composite résout ce problème en proposant une interface commune pour les objets simples (feuilles) et les objets composés (conteneurs), afin de les manipuler de façon uniforme.

## 🧠 Principe de fonctionnement

Tous les objets de l'arbre implémentent la même interface (par exemple `getDuration()` ou `display()`).  
Une **feuille** exécute directement l'opération, tandis qu'un **composite** délègue l'opération à ses enfants, agrège les résultats, puis renvoie un résultat global.

Le parcours est naturellement récursif : un composite peut contenir des feuilles et d'autres composites, sans que le client ait à connaître les classes concrètes.

## 🏗 Structure (rôles des classes)

Le pattern Composite implique généralement :

- **Composant (Component)** : Interface commune des objets simples et composés

- **Feuille (Leaf)** : Élément terminal qui ne contient pas d'enfants

- **Composite (Container)** : Élément qui contient une collection de composants (feuilles ou composites) et délègue les traitements

- **Client** : Utilise uniquement l'interface composant pour traiter uniformément tous les nœuds

## 📈 Avantages

Les **avantages** du Composite :

- **Traitement uniforme :** Le client manipule feuilles et groupes de la même manière

- **Code simplifié :** Moins de conditions spécifiques liées aux types concrets

- **Extensibilité :** On peut ajouter de nouveaux types de feuilles/composites sans modifier le code client

- **Parcours naturel des hiérarchies :** Le modèle récursif est adapté aux structures en arbre

## ⚠️ Inconvénients

Les **inconvénients** du Composite :

- **Interface parfois trop générique :** Difficile de définir une API commune parfaite pour tous les nœuds

- **Risque d'abus :** On peut créer des hiérarchies trop profondes ou trop complexes à maintenir

- **Validation plus délicate :** Certaines règles métier (ex: empêcher des cycles) demandent des contrôles supplémentaires

## 🧩 Cas d'usage réel possible

Le Composite est très utile dans les applications qui gèrent des structures hiérarchiques : systèmes de fichiers, menus, organisation d'équipes, nomenclatures produit, etc.

Pour ce TP, nous allons explorer le cas d'une **plateforme de formation en ligne** :

- **Contexte métier :** Une formation contient des modules, sous-modules et leçons. Une leçon est un élément simple, tandis qu'un module peut contenir d'autres éléments

- **Problématique :** On veut calculer la durée totale et afficher la structure complète, quel que soit le niveau d'imbrication

- **Solution Composite :** Une interface `TrainingComponent` est partagée par `Lesson` (feuille) et `Module` (composite). Le client appelle les mêmes méthodes sur tous les nœuds (`getDurationMinutes()`, `print()`), et la récursivité gère l'agrégation

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`
