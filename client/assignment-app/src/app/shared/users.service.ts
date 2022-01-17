import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { User} from "../user/user.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'text/json',
    'Access-Control-Allow-Origin':'*',
    'Authorization':'Bearer '
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  annonces: User[] = [];

  constructor(private http:HttpClient) { }
  url = "http://localhost:8010/api/users";

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }



  getUsersPagine(page:number, limit:number):Observable<any> {
  return this.http.get<User[]>(`${this.url}`);
  }

  addUser(user:User):Observable<any> {
    console.log("___________ADD USER IS CALLED_______________");
    return this.http.post(this.url, user);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  getUser(id:number):Observable<User|undefined> {
    return this.http.get<User>(this.url + "/" + id)
      .pipe(
        map(a => {
          return a;
        }),
        tap(a => {
          console.log("Tap : reçu user de nom = " + a.email);
        }),
        catchError(this.handleError<any>('### catchError: getUser by id avec id=' + id))
      );
  }
  updateUser(user:User):Observable<any> {
    console.log( user);
    return this.http.put<User>(`${this.url}/${user._id}`, user);
  }

  deleteUser(user:User) :Observable<any>{
    return this.http.delete(this.url + "/" + user._id);
  }


}
