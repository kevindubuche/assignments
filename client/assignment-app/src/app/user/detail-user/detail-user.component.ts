import { Component,  EventEmitter, OnInit, Output  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from "../user.model";
import { UsersService } from "../../shared/users.service";


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  userTransmis?: User;
  @Output() deleteUser = new EventEmitter<User>();


  constructor(
    private usersService: UsersService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    const id: number = this.route.snapshot.params['id'];

    console.log('COMPOSANT DETAIL id = ' + id);

    this.usersService.getUser(id).subscribe((user) => {
      this.userTransmis = user;
    });
  }

  onDelete() {
    if (this.userTransmis) {
      this.usersService
        .deleteUser(this.userTransmis)
        .subscribe((message) => {
          console.log(message);
          this.userTransmis = undefined;

          this.router.navigate(['user-list']);
        });
      alert("This user has been deleted successfully!")
    }
  }

  onClickEdit() {
    console.log(this.userTransmis)
    if(this.userTransmis) {
      this.router.navigate(['/user', this.userTransmis._id, 'edit'],
        {
          queryParams: {
            email: this.userTransmis.email,
            password : this.userTransmis.password,
            _id : this.userTransmis._id
          },
          fragment : 'edition'
        });
    }
  }

  isAdmin():boolean {
    return localStorage.getItem('access_token') != null ;
  }


}
