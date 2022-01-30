# ASSIGNMENTS PROJECT

## [DEMO](https://assigments-dubuche-theodore.herokuapp.com/)
![role](imgs/gif.gif)


## REAISATIONS
1. Auteurs :sunglasses: :computer:

<table>
  <tr>
    <td>
          <strong>Nom</strong> 
    </td>
    <td>
           <strong>Prénom</strong> 
    </td>
  </tr>
  <tr>
    <td>
           DUBUCHE
    </td>
    <td>
           Kevin J.
    </td>
  </tr>
  <tr>
    <td>
           THEODORE
    </td>
    <td>
           Barbara G.
    </td>
  </tr>
</table>



2. **Toutes les contraintes sont respectées** :heavy_check_mark:

- [x] **Au moins 1000 assignments**
- [x] **A rendre sur github ([lien](https://github.com/kevindubuche/assignments)) et hébergé sur Heroku ([lien](https://assigments-dubuche-theodore.herokuapp.com/))**
- [x] **Faire un README**
- [x] **Vidéo sur YouTube ([lien](https://youtu.be/MnEJlDvxPPc))**


- [x] **Ajouter une gestion de login/password**
- - [x] Formulaire + boutons connexion/deconnexion
- - [x] Gérer l'affichage des boutons selon qu'on est connecté/déconnecté
- - [x] Athentification se fera à l'aide de Json Web Tokens
- - [x] Gérer le cas particulier admin (lui seul peut éditer/supprimer)


- [x] **Ajouter de nouvelles propriétés au modèle des Assignments**
- - [x] Auteur (nom de l'élève)
- - [x] Matière
- - -[x] Une image sera associée à chaque matière + une photo du prof
- - [x] Note sur 20
- - [x] On ne peut marquer "rendu" un Assignment qui n'a pas été noté
- - [x] Remarques sur l'assignment
- - - [x] Au moins 1000 assignments


- [x] **Améliorer l'affichage des Assignments**
- - [x] Affichage sous forme de liste via des boutons de pagination
- - [x] Les assignments sont affichés/édités/saisis
- - - [x] fficher dans la liste des Assignments chaque Assignment sous forme d'une Material Card, avec le titre, la date, l'élève, une petite image illustrant la matière, la photo du prof en petit en haut à droite
- - [x] Au moins 1000 assignments
- - [x] Au moins 1000 assignments
- - - [x] Au moins 1000 assignments
- - [x] La vue détails montrera en plus les remarques, la note s'il a été rendu, etc
- - [x] Les formulaires d'ajout et de détails proposeront un choix fixe de matières (et associeront automatiquement le prof et l'image illustrant la matière)


- [x] **Afficher les Assignments sous forme de liste de material cards dans deux onglets séparés ou dans deux panels séparés sur la même page selon qu'ils ont été rendus ou pas encore rendus**
- - [x] Lorsqu'on met une note à un Assignment et il devient rendu et apparaitra dans l'onglet "Rendu"
- - [x] On pourra passer un assignment de non rendu à rendu en passant par la vue de détails, MAIS AUSSI EN LE DRAG'N'DROPPANT d'une liste à l'autre. (ou d'une liste dans l'onglet de l'autre liste)


- [x] **Utiliser un Formulaire de type Stepper pour l'ajout d'Assignments (et pour la modification)**


- [x] **Rendre le tout plus joli**


- [x] **Hébergement sur Heroku.com obligatoire pour le front et pour le back ([lien](https://assigments-dubuche-theodore.herokuapp.com/))**



## INSTALLATION

```css
// Client
git clone https://github.com/kevindubuche/assignments.git
cd client/assignment-app
npm install 
ng serve 

// API
cd api
npm install 
node server.js
```

![role](imgs/q1.png)
![role](imgs/q2.png)
![role](imgs/q3.png)
![role](imgs/q4.png)
![role](imgs/q5.png)
![role](imgs/q6.png)
![role](imgs/q7.png)

## SOURCES
* http://miageprojet2.unice.fr/Intranet_de_Michel_Buffa/M2_MBDS_2021-2022_Technos_Web/
* https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
* https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-angular-app-with-nodejs-e24c40444421
