# 📌 Observer

## 🎯 Problème qu'il résout

Lorsqu'un objet (le sujet) doit notifier plusieurs autres objets (les observateurs) d'un changement d'état, un couplage fort peut se créer. Si le sujet doit connaître directement tous les observateurs et les appeler un par un, toute modification (ajout ou suppression d'observateurs) nécessite de modifier le code du sujet. De plus, le sujet ne devrait pas avoir à connaître les détails d'implémentation de chaque observateur.

Le pattern Observer résout ce problème en établissant une relation de dépendance "un-à-plusieurs" entre objets, où un changement d'état dans un objet (sujet) déclenche automatiquement la notification de tous les objets dépendants (observateurs), sans créer de couplage fort.

## 🧠 Principe de fonctionnement

Le pattern Observer fonctionne en définissant une interface commune pour les observateurs et en permettant au sujet de maintenir une liste d'observateurs. Le sujet expose des méthodes pour ajouter (`attach`) et retirer (`detach`) des observateurs. Lorsqu'un événement se produit, le sujet parcourt sa liste d'observateurs et appelle leur méthode de notification (généralement `update` ou `notify`). Les observateurs peuvent alors réagir au changement selon leur propre logique, sans que le sujet ait besoin de connaître les détails de cette réaction.

## 🏗 Structure (rôles des classes)

Le pattern Observer implique généralement :

- **Interface/Classe abstraite observateur (Observer)** : Définit l'interface commune avec une méthode de notification (ex: `update()`) que tous les observateurs doivent implémenter

- **Classes observateurs concrètes (Concrete Observers)** : Implémentent l'interface Observer et définissent leur propre réaction aux notifications. Chaque observateur peut réagir différemment au même événement

- **Classe sujet abstraite (Subject)** : Maintient une liste d'observateurs et fournit des méthodes pour les ajouter (`attach`) et les retirer (`detach`). Définit également une méthode pour notifier tous les observateurs (`notify`)

- **Classe sujet concret (Concrete Subject)** : Implémente le sujet et stocke l'état qui intéresse les observateurs. Lorsque cet état change, il notifie tous les observateurs enregistrés

## 📈 Avantages

Les **avantages** de l'Observer :

- **Découplage entre sujet et observateurs :** Le sujet n'a pas besoin de connaître les détails d'implémentation des observateurs, seulement leur interface. Cela réduit le couplage et améliore la maintenabilité

- **Ajout/suppression dynamique d'observateurs :** On peut ajouter ou retirer des observateurs à l'exécution sans modifier le code du sujet ou des autres observateurs

- **Respect du principe Open/Close :** On peut ajouter de nouveaux observateurs sans modifier le code existant (ni le sujet, ni les autres observateurs)

- **Communication flexible :** Un même événement peut déclencher des réactions différentes selon les observateurs, chacun gérant sa propre logique

## ⚠️ Inconvénients

Les **inconvénients** de l'Observer :

- **Ordre de notification non garanti :** L'ordre dans lequel les observateurs sont notifiés peut ne pas être prévisible, ce qui peut poser problème si certains observateurs dépendent d'autres

- **Risques de notifications en cascade :** Si un observateur modifie l'état du sujet lors de sa notification, cela peut déclencher une nouvelle série de notifications, créant potentiellement une boucle infinie

- **Performance avec de nombreux observateurs :** Si le sujet a beaucoup d'observateurs, la notification de tous peut être coûteuse en temps d'exécution

- **Pas de garantie de réception :** Le pattern ne garantit pas qu'un observateur recevra toutes les notifications (par exemple, s'il est détaché entre deux notifications)

## 🧩 Cas d'usage réel possible

L'Observer est très utilisé dans les frameworks MVC (Model-View-Controller), les systèmes d'événements GUI, les architectures pub/sub (publish-subscribe), et les systèmes de notifications en temps réel.

Pour ce TP, nous allons explorer le cas d'un **système d'alertes de prix pour produits en ligne** :

- **Contexte métier :** Une plateforme e-commerce permet aux utilisateurs de suivre des produits et de recevoir des notifications lorsque le prix change. Plusieurs utilisateurs peuvent suivre le même produit, et chaque utilisateur peut avoir des préférences différentes (notification par email, SMS, ou les deux)

- **Problématique :** Si le système de gestion des produits doit appeler directement chaque méthode de notification de chaque utilisateur (`user1.sendEmail()`, `user2.sendSMS()`, etc.), le code devient très couplé. Ajouter un nouveau type de notification ou un nouvel utilisateur nécessiterait de modifier le code du système de produits

- **Solution Observer :** Le produit (sujet) maintient une liste d'observateurs (utilisateurs intéressés). Lorsque le prix change, le produit notifie automatiquement tous ses observateurs via leur méthode `update()`. Chaque observateur (utilisateur) décide ensuite comment réagir (envoyer un email, un SMS, ou les deux) selon ses propres préférences, sans que le produit ait besoin de connaître ces détails

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`

