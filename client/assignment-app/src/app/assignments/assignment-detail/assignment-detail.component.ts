import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';

import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor(
    private assignmentsService: AssignmentsService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    // On récupère l'id dans l'URL
    const id: number = this.route.snapshot.params['id'];

    console.log('COMPOSANT DETAIL id = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }
  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((reponse) => {
          console.log(reponse.message);
          // Pour cacher l'affichage du détail (ne change pas la
          // valeur de l'assignment dans le tableau)
          this.assignmentTransmis = undefined;

          // On re-affiche la liste
          this.router.navigate(['/home']);
        });
    }
  }

  onDelete() {
    if (this.assignmentTransmis) {
      this.assignmentsService
        .deleteAssignment(this.assignmentTransmis)
        .subscribe((message) => {
          console.log(message);
          // Pour cacher l'affichage du détail (ne change pas la
          // valeur de l'assignment dans le tableau)
          this.assignmentTransmis = undefined;

          // On re-affiche la liste
          this.router.navigate(['/home']);
        });
    }
  }

  onClickEdit() {
    if(this.assignmentTransmis) {
      // Exemple de navigation vers http://.../assignment/3/edit?nom=Devoir_Buffa&date:31_12...#edition
      this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
      {
        queryParams: {
          nom: this.assignmentTransmis.nom,
          date : this.assignmentTransmis.dateDeRendu
        },
        fragment : 'edition'
      });
    }
  }

  isAdmin():boolean {
    return this.authService.loggedIn;
  }
}
