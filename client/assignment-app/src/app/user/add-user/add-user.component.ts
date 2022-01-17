import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../user.model";
import { UsersService } from "../../shared/users.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  usersForm!: FormGroup;
  email = "";
  password = "";

  constructor(private usersService:UsersService,
              private router:Router,
              private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      email : ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.minLength(1)])],
      password : ['', Validators.required]
    });
  }

  onFormSubmit() {
    console.log(this.usersForm)
    if (!this.usersForm.invalid) {
      const newUser:User = new User();
      newUser.email = this.usersForm.value['email'];
      newUser.password = this.usersForm.value['password'];

      this.usersService.addUser(this.usersForm.value)
        .subscribe(response => {
          console.log(response.message);
          this.router.navigate(['/user-list']);
        })
      alert("This user has been added successfully!");
    }
  }
}
