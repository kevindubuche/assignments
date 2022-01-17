import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = true;

  constructor(private http:HttpClient) { }

  // appelé quand on a rempli le formulaire login/password
  // devrait prendre en params le login et le pass
  // logIn() {
  //   this.loggedIn = true;
  // }
  url = "http://localhost:8010/api/auth/login";


  logIn(user:User):Observable<any> {
    console.log("TRYING TO LOG IN")
    return this.http.post(this.url, user);
    //return this.http.post(this.url,  JSON.stringify(user),{ headers: this.headers});
  }

  // appelé par bouton de deconnexion
  // logOut() {
  //   this.loggedIn = false;
  // }
  logOut() {
    localStorage.removeItem("access_token");
    this.loggedIn = false;
    alert("Succes !");
  }

  // vérification du rôle. Dans cet exemple simple on dit qu'on est admin
  // juste si on est loggué. Dans la vraie vie, il faudrait vérifier que le
  // login est bien égal à admin etc.
  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      // ici typiquement, on pourrait faire une requête
      // et donc ça prendrait du temps... c'est la raison
      // pour laquelle on renvoie une promesse....

      //  resolve(this.loggedIn);
        resolve(localStorage.getItem('access_token') != null )
    });

    return isUserAdmin;
  }

}
