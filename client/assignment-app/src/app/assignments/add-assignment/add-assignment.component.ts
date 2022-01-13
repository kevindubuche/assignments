import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  assignmentsForm!: FormGroup;
  nom = ""; // champ du formulaire
  dateDeRendu?:Date;
  auteur = "";
  remarque = "";
  note?: Number;
  matiere = "";
  rendu = false;

  listeDesMatieres: String[] = [
    'Matiere 1', 'Matiere 2', 'Matiere 3', 'Matiere 4'
  ];

  isLinear = false;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.assignmentsForm = this.formBuilder.group({
      nom : ['', Validators.required,],
      dateDeRendu : ['',],
      auteur : ['', Validators.required],
      remarque : ['', ],
      matiere : ['', Validators.required],
      note : [''],
      rendu : ['', ]
    });
  }

  onFormSubmit() {
    console.log("au moins la");
    if (this.assignmentsForm.status == "VALID") {
      console.log(this.assignmentsForm)
      const newAssignment:Assignment = new Assignment();
      newAssignment.nom = this.assignmentsForm.value['nom'];
      newAssignment.dateDeRendu = this.assignmentsForm.value['dateDeRendu'];
      newAssignment.matiere = this.assignmentsForm.value['matiere'];
      newAssignment.auteur = this.assignmentsForm.value['auteur'];
      newAssignment.note = this.assignmentsForm.value['note'];
      newAssignment.remarque = this.assignmentsForm.value['remarque'];
      newAssignment.rendu = this.rendu;
      if(newAssignment.note == undefined)
        newAssignment.rendu = false;


      //this.assignments.push(newAssignment);
      // On envoie le nouvel assignment sous la forme d'un événement
      //this.nouvelAssignment.emit(newAssignment);

      // On utilise directement le service.
      this.assignmentsService.addAssignment(newAssignment)
        .subscribe(reponse => {
          console.log(reponse.message);

          // On re-affiche la liste
          this.router.navigate(['/home']);
        })
    }

  }

  switchRenduStatus(){
      this.rendu = !this.rendu;
      console.log("Rendu is: "+ this.rendu)
  }

}
