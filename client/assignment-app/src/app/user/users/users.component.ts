import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from "../../shared/users.service";
import {User} from "../user.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  titre = 'List of users :';
  userSelectionne?: User;
  users: User[] = [];
  // proprietes de pagination
  page: number = 1;
  limit: number = 10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage!: number;
  hasNextPage?: boolean;
  nextPage!: number;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers(this.page, this.limit);
    console.log(this.getUsers(this.page, this.limit));
    console.log('APPEL à getUsers terminé');
  }
  getUsers(page:number, limit:number) {
    this.usersService
      .getUsersPagine(page, limit)
      .subscribe((data) => {
        this.users = data; // les assignments
        console.log(this.users);
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log('données reçues');
      });
  }

  isAdmin():boolean {
    return localStorage.getItem('access_token') != null ;
  }



}
