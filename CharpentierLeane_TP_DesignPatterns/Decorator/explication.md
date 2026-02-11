Retour au <a href="../../README.md"> sommaire</a>

# 📌 Decorator

## 🎯 Problème qu'il résout

Lorsqu'on veut ajouter des fonctionnalités à un objet de manière flexible, l'héritage classique peut rapidement devenir problématique. Si on crée une sous-classe pour chaque combinaison de fonctionnalités, on se retrouve avec une explosion combinatoire de classes. De plus, on ne peut pas ajouter ou retirer des fonctionnalités dynamiquement à l'exécution.

Le Decorator résout ce problème en permettant d'envelopper un objet avec des "couches" de fonctionnalités supplémentaires, de manière dynamique et flexible, sans modifier la structure de l'objet de base.

## 🧠 Principe de fonctionnement

Le pattern Decorator fonctionne en créant une classe de base (ou interface) commune, puis en créant des classes "décoratrices" qui enveloppent l'objet original. Chaque décorateur implémente la même interface que l'objet qu'il décore, et délègue les appels à l'objet enveloppé tout en ajoutant son propre comportement avant ou après. On peut ainsi empiler plusieurs décorateurs les uns sur les autres, créant une chaîne de fonctionnalités.

## 🏗 Structure (rôles des classes)

Le pattern Decorator implique généralement :

- **Interface/Classe abstraite composant (Component)** : Définit l'interface commune pour les objets qui peuvent être décorés

- **Classe composant concret (Concrete Component)** : L'objet de base qui sera décoré

- **Classe décorateur abstraite (Decorator)** : Maintient une référence vers un objet Component et implémente la même interface. Elle délègue les appels à l'objet enveloppé

- **Classes décorateurs concrets (Concrete Decorators)** : Implémentent des fonctionnalités spécifiques. Chaque décorateur ajoute son comportement avant ou après avoir délégué l'appel à l'objet enveloppé

## 📈 Avantages

Les **avantages** du Decorator :

- **Flexibilité et extensibilité :** On peut ajouter ou retirer des fonctionnalités dynamiquement à l'exécution, sans créer de nouvelles classes pour chaque combinaison

- **Respect du principe Open/Close :** On peut ajouter de nouveaux décorateurs sans modifier le code existant (ni les composants, ni les autres décorateurs)

- **Évite l'explosion combinatoire :** Au lieu de créer une classe pour chaque combinaison de fonctionnalités (N fonctionnalités = 2^N classes), on crée N décorateurs qui peuvent être combinés librement

- **Séparation des responsabilités :** Chaque décorateur a une responsabilité unique et bien définie, ce qui facilite la maintenance

## ⚠️ Inconvénients

Les **inconvénients** du Decorator :

- **Complexité accrue :** Le pattern introduit plusieurs nouvelles classes et peut rendre le code plus difficile à comprendre, surtout avec de nombreux décorateurs empilés

- **Ordre des décorateurs :** L'ordre dans lequel les décorateurs sont appliqués peut avoir un impact sur le résultat final, ce qui peut être source de confusion ou de bugs

- **Difficulté de débogage :** Avec plusieurs couches de décorateurs empilés, il peut être difficile de tracer l'exécution et de comprendre quel décorateur est responsable d'un comportement spécifique

- **Surcharge de petits objets :** Chaque décorateur crée un nouvel objet qui enveloppe le précédent, ce qui peut créer une chaîne d'objets et augmenter légèrement la consommation mémoire

## 🧩 Cas d'usage réel possible

Le Decorator est très utilisé dans les frameworks de streaming (Java I/O), les systèmes de GUI (ajout de bordures, scrollbars, etc.), et les middlewares web (ajout de fonctionnalités comme l'authentification, le logging, la compression).

Pour ce TP, nous allons explorer le cas d'un **système de livraison avec options** :

- **Contexte métier :** Une plateforme e-commerce propose une livraison de base, mais les clients peuvent ajouter des options supplémentaires : livraison express, assurance, suivi en temps réel, emballage cadeau, etc. Ces options peuvent être combinées librement

- **Problématique :** Si on utilise l'héritage classique, il faudrait créer une classe pour chaque combinaison : `LivraisonBase`, `LivraisonExpress`, `LivraisonAssurance`, `LivraisonExpressAssurance`, `LivraisonExpressAssuranceSuivi`, etc. Avec 5 options, cela représente 32 classes différentes !

- **Solution Decorator :** On crée une classe `BasicDelivery` (composant concret) et des décorateurs `ExpressDelivery`, `InsuranceDecorator`, `TrackingDecorator`, `GiftWrapDecorator`. Le client peut alors composer sa livraison en enveloppant l'objet de base avec les décorateurs souhaités : `new GiftWrapDecorator(new TrackingDecorator(new ExpressDelivery(new BasicDelivery())))`. Chaque décorateur ajoute son coût et ses fonctionnalités au calcul final

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`

