Retour au <a href="../../README.md"> sommaire</a>

# 📌 Singleton

## 🎯 Problème qu’il résout

Il arrive qu'une application ait besoin d'une ressource unique qui doit être partagée partout sans être dupliquée. Si on laisse la possibilité de créer plusieurs instances, on gaspille des ressources système (mémoire, processeur) et on risque des incohérences de données (plusieurs objets essayant de modifier la même chose en même temps).

Le singleton résoud donc deux problème : 
- Unicité d'une instance pour une clase
- Un accès globale à cette instance dans toute l'application

## 🧠 Principe de fonctionnement

Pour mettre en place un Singleton, il faut verrouiller l'accès à la création de l'objet. La classe devient la seule entité capable de s'instancier elle-même. Pour cela, il faut mettre en place une méthode qui vérifie si une instance existe déjà : si oui, elle donne l'accès à celle-ci, si non, elle la crée une seule et unique fois et la stocke.

## 🏗 Structure (rôles des classes)

On crée une classe qui contient (au minimum) :
- Un constructeur privé : qui permet d'interdir l'usage du mot-clé new en dehors de la classe
- Un attribut statique privé : qui stocke l'instance unique de la classe
- Une méthode statique publique (ex: getInstance()) : qui sert de point d'entrée unique pour récupérer l'instance

## 📈 Avantages

Les **avantages** du Singleton : 

- **Contrôle de l'accès à l'instance unique :** Comme la classe encapsule son instance, elle a un contrôle total sur comment et quand les clients y accèdent. Cela garantit qu'aucune autre partie du code ne peut contourner la règle d'unicité

- **Optimisation des ressources (mémoire) :** En évitant la duplication d'objets potentiellement lourds, on réduit l'empreinte mémoire de l'application

- **Initialisation tardive (Lazy Initialization) :** L'objet n'est pas créé au démarrage de l'application, mais seulement lors de son premier appel réel. Cela permet d'économiser du temps processeur si la ressource n'est finalement jamais utilisée durant une session

## ⚠️ Inconvénients

Les **incovénients** du Singleton : 

- **Violation du principe de Responsabilité Unique (SRP) :** Le Singleton s'occupe à la fois de sa logique métier propre et de la gestion de son cycle de vie (s'assurer qu'il est unique). C'est un couplage fort qui peut rendre la classe plus complexe à maintenir.

- **Difficultés pour les tests unitaires :** Le Singleton introduit un "état global". Comme il est difficile de réinitialiser l'instance entre deux tests, les tests peuvent devenir dépendants les uns des autres (un test peut échouer à cause d'une modification faite par le test précédent), ce qui casse l'isolation nécessaire aux tests unitaires.

- **Risques en environnement Multi-thread :** Si le code de getInstance() n'est pas "Thread-Safe" (utilisation de verrous ou locks), deux fils d'exécution simultanés pourraient passer la condition if (instance == null) en même temps, créant ainsi deux instances distinctes et brisant le pattern.

## 🧩 Cas d’usage réel possible

Le Singleton est très fréquemment utilisé pour gérer une **connexion à une base de données**.

En effet, ouvrir une connexion est une opération "coûteuse" en ressources et en temps. Si chaque composant de l'application créait sa propre connexion, le serveur de base de données serait vite saturé. En utilisant un Singleton, on garantit qu'une seule connexion est ouverte et réutilisée par toute l'application, ce qui stabilise les performances.

Cependant, ce pattern s'applique à n'importe quelle ressource matérielle ou logicielle unique. Pour ce TP, nous allons explorer le cas d'une **Imprimante de bureau partagée** :

- **Contexte métier :** Dans une petite agence, dix employés partagent une seule imprimante physique

- **Problématique :** Si deux employés cliquent sur "Imprimer" au même instant, l'imprimante ne peut pas traiter les deux flux de données simultanément de manière brute, au risque de mélanger les pages

- **Solution Singleton :** L'unique instance de notre classe ImprimanteBureau sert de "chef d'orchestre". Elle reçoit toutes les demandes et les place dans une file d'attente (queue) ordonnée. Comme il est impossible de créer une deuxième instance de la classe, on évite qu'un autre processus ne vienne court-circuiter cette file d'attente

➡️ Consulter l'exemple <a href="./example.ts">ici</a> ou lancer la commande suivante `node example.ts`
