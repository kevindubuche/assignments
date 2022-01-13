import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

  url = "http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]> {
    // typiquement, on ferait une requête GET sur un web
    // service distant, pour récupérer les assignments
    // et cela pourrait prendre quelques secondes...
   //return of(this.assignments);

   return this.http.get<Assignment[]>(this.url);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    // typiquement, on ferait une requête GET sur un web
    // service distant, pour récupérer les assignments
    // et cela pourrait prendre quelques secondes...
   //return of(this.assignments);

   return this.http.get<Assignment[]>(`${this.url}?page=${page}&limit=${limit}`);
  }
  getAssignment(id:number):Observable<Assignment|undefined> {

    //const a:Assignment|undefined = this.assignments.find(elem => elem.id == id);

    //return of(a);
    return this.http.get<Assignment>(this.url + "/" + id)
    .pipe(
      map(a => {
        // a.nom += " MODIFIE PAR UN MAP";
        return a;
      }),
      tap(a => {
        console.log("Tap : reçu assignment de nom = " + a.nom);
      }),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
 };

  addAssignment(assignment:Assignment):Observable<any> {
    // typiquement, plus tard, au lieu de faire un push, on fera une requête
    // vers un service distant
    assignment.id = Math.floor(10000000 * Math.random());

    //this.assignments.push(assignment);

    //console.log("Assignment ajouté");
    this.loggingService.log(assignment.nom, "AJOUTE")

    //return of("Assignment " + assignment.nom + " ajouté");

    return this.http.post(this.url, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // Ici plus tard requête distante sur web service en PUT

    // avec le tableau, comme l'assignment est un pointeur sur une case, on a rien besoin
    // de faire....
    //return of("Assignment " + assignment.nom + " modifié");

    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment) :Observable<any>{
    // on supprime cet assignment
    //const pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    //return of("Assignment " + assignment.nom + " supprimé");

    return this.http.delete(this.url + "/" + assignment._id);
  }

  peuplerBD() {
    bdInitialAssignments.forEach(a => {
        let nouvelAssignment = new Assignment();
        nouvelAssignment.nom = a.nom;
        nouvelAssignment.id = a.id;
        nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
        nouvelAssignment.rendu = a.rendu;
        nouvelAssignment.auteur = a.auteur;
        nouvelAssignment.matiere = a.matiere;
        nouvelAssignment.note = a.note;
        nouvelAssignment.remarque = a.remarque;

        this.addAssignment(nouvelAssignment)
        .subscribe(reponse => {
          console.log(reponse.message);
        })
      })
    }

    // permet de renvoyer un Observable quand tout est fini
    peuplerBDAvecForkJoin(): Observable<any> {
      const appelsVersAddAssignment:any = [];

      bdInitialAssignments.forEach((a) => {
        const nouvelAssignment = new Assignment();

        nouvelAssignment.id = a.id;
        nouvelAssignment.nom = a.nom;
        nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
        nouvelAssignment.rendu = a.rendu;
        nouvelAssignment.auteur = a.auteur;
        nouvelAssignment.matiere = a.matiere;
        nouvelAssignment.note = a.note;
        nouvelAssignment.remarque = a.remarque;

        appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
      });
      return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
    }

}
