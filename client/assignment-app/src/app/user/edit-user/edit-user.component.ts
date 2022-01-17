import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../user.model";
import {UsersService} from "../../shared/users.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  usersForm!: FormGroup;
  user!: User | undefined;
  email: string | undefined = "";
  password: string | undefined = "";

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.usersForm = this.formBuilder.group({
      email : ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.minLength(1)])],
      password : ['', Validators.required]
    });
  }

  getUser() {
    const id = this.route.snapshot.params['id'];
    this.userService
      .getUser(id)
      .subscribe((user) => {
        this.user = user;
        this.email = user?.email;
        this.password = user?.password;
      });
  }

  onSaveUser() {
    if (!this.user) return;

    if (this.email) {
      this.user.email = this.email;
    }

    if (this.password) {
      this.user.password = this.password;
    }
    this.userService
      .updateUser(this.user)
      .subscribe(reponse => {
        console.log(reponse.message);
        alert("Succes !");
        this.router.navigate(['/user-list']);
      });
  }


}
