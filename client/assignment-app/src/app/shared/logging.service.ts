import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignmentName:string, action:string) {
    // par ex "Nouveau devoir Angular de Buffa AJOUTE"
    console.log("LOGGIN SERVICE : " + assignmentName + " " + action);
  }
}
