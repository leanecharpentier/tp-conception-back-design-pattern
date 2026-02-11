# 📌 Factory Method

## 🎯 Problème qu'il résout

Lorsqu'une application doit créer des objets dont le type exact n'est connu qu'à l'exécution, utiliser directement `new` avec des classes concrètes crée un couplage fort. Si on veut ajouter de nouveaux types d'objets, il faut modifier le code existant (violation du principe Open/Close).

Le Factory Method résout ce problème en déléguant la création d'objets à une méthode spécialisée. La classe cliente n'a plus besoin de connaître les détails de construction des objets, elle appelle simplement une méthode qui retourne l'objet approprié selon le contexte.

## 🧠 Principe de fonctionnement

Le pattern Factory Method fonctionne en créant une interface (ou classe abstraite) qui définit le contrat commun pour tous les types d'objets à créer. Ensuite, on implémente plusieurs classes concrètes, chacune représentant un type spécifique d'objet. La classe Factory contient la logique de décision : elle reçoit un paramètre (comme un type ou un identifiant) et détermine quelle classe concrète instancier. Au lieu d'utiliser directement `new` avec une classe concrète, le code client passe par la Factory qui retourne l'objet approprié selon le paramètre fourni.

## 🏗 Structure (rôles des classes)

Le pattern Factory Method implique généralement :

- **Interface/Classe abstraite produit (Product)** : Définit le contrat commun (méthodes et propriétés) que tous les types d'objets doivent respecter

- **Classes produits concrètes (Concrete Products)** : Implémentent l'interface produit, chacune représentant un type spécifique d'objet avec son comportement propre

- **Classe Factory** : Contient la méthode de création (ex: `creer(type: string)`) qui reçoit un paramètre, analyse ce paramètre, et retourne une instance de la classe concrète appropriée. C'est ici que se trouve toute la logique de décision sur quel objet créer

## 📈 Avantages

Les **avantages** du Factory Method :

- **Réduction du couplage :** Le code client ne dépend plus des classes concrètes, mais uniquement de l'interface abstraite. Cela rend le code plus flexible et maintenable

- **Respect du principe Ouvert/Fermé :** On peut ajouter de nouveaux types de produits en créant de nouvelles classes concrètes et factories, sans modifier le code existant

- **Centralisation de la logique de création :** Toute la logique complexe de création d'objets est centralisée dans un seul endroit, ce qui facilite la maintenance et les modifications futures

- **Séparation des responsabilités :** La classe cliente n'a plus à connaître les détails d'instanciation, elle se contente d'utiliser les objets créés

## ⚠️ Inconvénients

Les **inconvénients** du Factory Method :

- **Complexité accrue :** Le pattern introduit plusieurs nouvelles classes, ce qui peut rendre le code plus complexe pour des cas simples où une instanciation directe suffirait

- **Surcharge de classes :** Pour chaque nouveau type de produit, il faut créer une nouvelle classe concrète, ce qui peut multiplier le nombre de fichiers dans le projet

- **Nécessité d'une hiérarchie :** Le pattern fonctionne mieux quand il y a une hiérarchie claire de produits. Si les produits n'ont pas de relation commune, le pattern peut être moins adapté

## 🧩 Cas d'usage réel possible

Le Factory Method est très utilisé dans les frameworks et bibliothèques pour créer des objets dont le type dépend de la configuration ou du contexte d'exécution.

Pour ce TP, nous allons explorer le cas d'un **générateur de filtres photo** :

- **Contexte métier :** Une application de retouche photo permet aux utilisateurs d'appliquer différents filtres esthétiques à leurs images : Noir & Blanc, Sépia, Vintage, HDR, etc. Chaque filtre a son propre algorithme de traitement d'image

- **Problématique :** Si le code client crée directement des objets `FiltreNoirBlanc`, `FiltreSepia`, `FiltreVintage` avec `new`, chaque ajout d'un nouveau filtre (par exemple, un filtre "Cinéma" ou "Polaroid") nécessiterait de modifier tous les endroits où ces objets sont créés, notamment dans l'interface utilisateur où l'utilisateur sélectionne un filtre

- **Solution Factory Method :** Une classe `FilterFactory` avec une méthode `createFilter(type: string)` détermine quel type de filtre créer selon le paramètre. Le code client appelle simplement `factory.createFilter("sepia")` sans connaître les détails d'implémentation. Pour ajouter un nouveau filtre, il suffit de créer une nouvelle classe concrète et d'ajouter un cas dans la factory, sans toucher au reste du code existant

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`