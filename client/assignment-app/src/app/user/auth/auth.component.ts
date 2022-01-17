import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../user.model";
import { UsersService } from "../../shared/users.service";
import { AuthService } from "../../shared/auth.service";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  usersForm!: FormGroup;
  email = "";
  password = "";

  constructor(private usersService:UsersService,
              private authService : AuthService,
              private router:Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      email : ['',Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.minLength(1)])],
      password : ['', Validators.required]
    });
  }

  onFormSubmit() {
    console.log(this.usersForm)
    if (!this.usersForm.invalid) {
      const newUser:User = new User();
      newUser.email = this.email;
      newUser.password = this.password;

      this.authService.logIn(this.usersForm.value)
        .subscribe(response => {
          console.log(response);
          if(response.access_token){
            this.authService.loggedIn;
            localStorage.setItem('access_token', response.access_token);

          }
            localStorage.setItem('access_token', response.access_token);
            console.log(localStorage.getItem('access_token'))
            alert("Succes !")
            this.router.navigate(['/home']);
          },
          error => {
            console.log(error)
            alert(error.statusText)
          })
    }

  }
}
