Retour au <a href="../../README.md"> sommaire</a>

# 📌 Facade

## 🎯 Problème qu'il résout

Dans une application métier, une action "simple" côté utilisateur peut en réalité nécessiter plusieurs sous-systèmes : validation de données, contrôle de conformité, calcul de score, génération de documents, notifications, etc.

Si le code client appelle directement tous ces composants, il devient couplé à beaucoup de classes, doit connaître l'ordre exact des appels, et devient difficile à maintenir.

Le pattern Facade résout ce problème en fournissant un point d'entrée unique, plus simple, qui encapsule la complexité du sous-système.

## 🧠 Principe de fonctionnement

On crée une classe façade qui expose des méthodes de haut niveau (orientées métier) et orchestre en interne les appels aux différentes classes techniques.

Le client parle à la façade, pas aux sous-systèmes directement.  
La façade centralise les enchaînements, la gestion de l'ordre des étapes, et simplifie l'utilisation du système.

## 🏗 Structure (rôles des classes)

Le pattern Facade implique généralement :

- **Client** : La couche qui veut exécuter un cas métier sans gérer les détails techniques

- **Façade (Facade)** : L'interface simplifiée qui orchestre plusieurs classes du sous-système

- **Sous-systèmes** : Les classes spécialisées qui réalisent le travail réel (validation, calcul, stockage, notifications, etc.)

- **Façades spécialisées (optionnel)** : D'autres façades plus ciblées si une seule façade devient trop volumineuse

## 📈 Avantages

Les **avantages** de Facade :

- **Réduction de la complexité côté client :** Le client appelle une méthode métier unique au lieu de coordonner plusieurs services

- **Découplage :** Le client dépend moins des classes techniques et de leurs changements internes

- **Lisibilité :** Les scénarios métier deviennent plus clairs et plus faciles à comprendre

- **Maintenabilité :** Les modifications d'orchestration sont concentrées dans la façade

## ⚠️ Inconvénients

Les **inconvénients** de Facade :

- **Risque de classe "fourre-tout" :** Une façade peut grossir et concentrer trop de responsabilités

- **Fonctionnalités parfois limitées :** La façade simplifie, mais n'expose pas toujours toutes les options avancées des sous-systèmes

- **Couche supplémentaire :** Ajoute une abstraction qui peut sembler inutile pour des besoins très simples

## 🧩 Cas d'usage réel possible

Le pattern Facade est adapté quand on veut proposer des opérations métier simples au-dessus d'un ensemble de services techniques.

Pour ce TP, nous allons explorer le cas d'une **réservation de voyage** :

- **Contexte métier :** Pour réserver un séjour, il faut coordonner plusieurs systèmes : vol, hôtel, paiement et envoi de confirmation

- **Problématique :** Sans façade, le code client doit instancier et appeler tous les services dans le bon ordre, ce qui le rend verbeux et fragile

- **Solution Facade :** `TravelBookingFacade` expose une méthode unique `bookTrip(...)` qui orchestre le sous-système complet et renvoie un résultat lisible pour le métier

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`
