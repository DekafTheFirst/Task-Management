import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user-request';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  id: number;
  user: User;
  constructor(private userservice: UserService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userservice.getUserById(this.id).subscribe(data => {
      this.user = data
    },
    error => alert(error)
    );
  }

  gotoUser() {
    this.router.navigate(['users']);  
  }

  editUser() {
    this.userservice.updateUser(this.id, this.user).subscribe( data => {
      console.log(data);
      this.gotoUser();
    },
    error => alert(error));
   
  }

  onSubmit(){
    this.editUser();
  }



}
