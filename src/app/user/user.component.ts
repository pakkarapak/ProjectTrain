import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  mode: string = 'ADD';
  id: number = 0;
  userCode: string ;
  userName: string;
  userType: string;
  level: string;
  password: string;
  userData = [];

  ngOnInit() {
    this.activeRoute.params.subscribe(param => {
      if (param['id']) {
        let id = param['id'];
        this.userService.findById(id).subscribe(
          users => {
            this.userCode = users.userCode;
            this.userName = users.userName;
            this.userType = users.userType;
            this.level = users.level;
            this.password = users.password;
          },
          error => {
            console.log(error);
          });

        Materialize.updateTextFields();
        this.mode = "EDIT";
        this.id = id;
      }
    });

    Materialize.updateTextFields();

  }


   onSave() {
    let users = {
      userName: this.userName,
      userCode: this.userCode,
      userType: this.userType,
      level: this.level,
      password: this.password
    }

    let user: Array<any> = [];
    if (localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user'));
    }
    if (this.mode == "EDIT") {
      this.userService.updateItem(users, this.id).subscribe(
        datas => {
          Materialize.toast('update item complete', 1000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        });

    } else {
      this.userService.addItem(users).subscribe(
        datas => {
          Materialize.toast('Add new item complete', 1000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        });
    }

  }

}
