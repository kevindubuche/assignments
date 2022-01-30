import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import  { AssignmentsService } from "./shared/assignments.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = "Application de gestion des Assignments";

  constructor(private authService:AuthService,
              private router:Router,
              private assignmentsService: AssignmentsService,) {}

  login() {
    if(!this.authService.loggedIn) {
    //  this.authService.logIn();
    } else {
      this.authService.logOut();
      this.router.navigate(["/home"]);
    }
  }

  peuplerBD() {
    //this.assignmentsService.peuplerBD();

    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      // replaceUrl = true force le refresh de la page même si elle est
      // actuellement affichée
      alert("Success; All data have been saved!");
      window.location.reload();
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }

  isLoggedIn():boolean {
    return localStorage.getItem('access_token') != null ;
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(["/home"]);
  }
}
