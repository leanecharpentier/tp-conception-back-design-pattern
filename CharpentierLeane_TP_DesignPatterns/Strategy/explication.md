Retour au <a href="../../README.md"> sommaire</a>

# 📌 Strategy

## 🎯 Problème qu'il résout

Dans beaucoup d'applications, une même fonctionnalité peut être réalisée de plusieurs façons selon le contexte (coût, rapidité, priorité, contraintes métier).

Sans structure adaptée, on finit par écrire de gros blocs `if`/`switch` dans une classe unique pour choisir l'algorithme, ce qui rend le code difficile à maintenir.

Le pattern Strategy résout ce problème en isolant chaque algorithme dans une classe dédiée et en les rendant interchangeables.

## 🧠 Principe de fonctionnement

Le **contexte** contient une référence vers une **stratégie** abstraite.  
Il délègue l'exécution de l'algorithme à cette stratégie au lieu de l'implémenter lui-même.

Le client choisit la stratégie concrète (et peut la changer à l'exécution).  
Le contexte reste stable, tandis que les algorithmes évoluent indépendamment.

## 🏗 Structure (rôles des classes)

Le pattern Strategy implique généralement :

- **Contexte (Context)** : Classe qui utilise un algorithme via une interface commune

- **Interface Strategy** : Contrat unique exposé par toutes les variantes d'algorithmes

- **Stratégies concrètes (Concrete Strategies)** : Implémentations différentes du même comportement

- **Client** : Sélectionne la stratégie adaptée et l'injecte dans le contexte

## 📈 Avantages

Les **avantages** de Strategy :

- **Suppression des gros conditionnels :** On remplace des branches complexes par du polymorphisme

- **Interchangeabilité :** Changer d'algorithme devient simple, même à l'exécution

- **Respect du principe Open/Close :** On ajoute de nouvelles stratégies sans modifier le contexte

- **Meilleure testabilité :** Chaque algorithme est isolé et testable indépendamment

## ⚠️ Inconvénients

Les **inconvénients** de Strategy :

- **Multiplication des classes :** Chaque variante d'algorithme devient une classe

- **Choix délégué au client :** Le client doit connaître les différences entre stratégies

- **Overhead pour cas simples :** Si les variantes sont rares, le pattern peut être trop lourd

## 🧩 Cas d'usage réel possible

Le pattern Strategy est idéal quand une décision métier consiste à choisir "comment" faire une même opération.

Pour ce TP, nous allons explorer le cas d'un **moteur de calcul de frais de livraison** :

- **Contexte métier :** Un checkout e-commerce doit calculer des frais selon la politique choisie (économique, express, premium)

- **Problématique :** Les règles de calcul varient (montant fixe, pourcentage, seuil de gratuité), et évoluent souvent selon les offres

- **Solution Strategy :** `ShippingCostCalculator` délègue le calcul à une stratégie (`EconomyShippingStrategy`, `ExpressShippingStrategy`, `PremiumShippingStrategy`) sélectionnée par le client

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`
