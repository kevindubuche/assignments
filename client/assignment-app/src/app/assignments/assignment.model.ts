import { AssignmentsComponent } from "./assignments.component";

export class Assignment {
  nom!:string;
  dateDeRendu?:Date;
  rendu?:boolean;
  id!:number;
  _id?:string;

  remarque: string | undefined;
  auteur!: string;
  matiere!: number;
  note!: number;

}


