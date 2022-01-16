import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignmentsForm!: FormGroup;

  assignment!: Assignment | undefined;
  nom: string | undefined = ""; // champ du formulaire
  dateDeRendu?:Date;
  auteur: string | undefined = "";
  remarque: string | undefined = "";
  note?: number;
  matiere: string | undefined = "";
  rendu: boolean | undefined = false;

  listeDesMatieres: String[] = [
    'Matiere 1', 'Matiere 2', 'Matiere 3', 'Matiere 4'
  ];

  isLinear = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log("-----------")
    // Récupération des queryParams et fragment (ce qui suit le ? et le # dans l'URL)
    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment d'URL (ce qui suit le #) :");
    console.log(this.route.snapshot.fragment);
    console.log("-----------")

    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService
      .getAssignment(id)
      .subscribe((assignment) => {
        this.assignment = assignment;

          this.nom = assignment?.nom;
          this.dateDeRendu = assignment?.dateDeRendu;
          this.auteur = assignment?.auteur;
          this.remarque = assignment?.remarque;
          this.matiere = assignment?.matiere;
          this.note = assignment?.note;
          this.rendu = assignment?.rendu;
      },
        (err)=>console.error(err),
        ()=> {
          this.assignmentsForm = this.formBuilder.group({
            nom: [this.nom, Validators.required,],
            dateDeRendu: [this.dateDeRendu ,],
            auteur: [this.auteur, Validators.required],
            remarque: [this.remarque,],
            matiere: [this.matiere, Validators.required],
            note: [this.note],
            rendu: [this.rendu,]
          });
        });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.nom) {
      this.assignment.nom = this.assignmentsForm.value['nom'];
    }
    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.assignmentsForm.value['dateDeRendu'];
    }
    if (this.matiere) {
      this.assignment.matiere = this.assignmentsForm.value['matiere'];
    }
    if (this.auteur) {
      this.assignment.auteur = this.assignmentsForm.value['auteur'];
    }
    if (this.note) {
      this.assignment.note = this.assignmentsForm.value['note'];
    }
    if (this.remarque) {
      this.assignment.remarque = this.assignmentsForm.value['remarque'];
    }

      this.assignment.rendu = this.rendu;

    if (this.assignmentsForm.value['note'] == undefined) {
      this.assignment.rendu = false;
    }

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe(reponse => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }

  switchRenduStatus(){
    this.rendu = !this.rendu;
    console.log("Rendu is: "+ this.rendu)
  }
}
