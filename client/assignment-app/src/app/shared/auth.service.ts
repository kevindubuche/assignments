import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor() { }

  // appelé quand on a rempli le formulaire login/password
  // devrait prendre en params le login et le pass
  logIn() {
    this.loggedIn = true;
  }

  // appelé par bouton de deconnexion
  logOut() {
    this.loggedIn = false;
  }

  // vérification du rôle. Dans cet exemple simple on dit qu'on est admin
  // juste si on est loggué. Dans la vraie vie, il faudrait vérifier que le
  // login est bien égal à admin etc.
  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      // ici typiquement, on pourrait faire une requête
      // et donc ça prendrait du temps... c'est la raison
      // pour laquelle on renvoie une promesse....
        resolve(this.loggedIn);
    });

    return isUserAdmin;
  }

}
