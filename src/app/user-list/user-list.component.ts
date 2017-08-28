import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService) {

  }

  userData = [];
  searchText = "";
  numPage = 0;
  rowPerPage = 5;
  total = 0;
  paging = [];

  ngOnInit() {
     //this.search();

    this.userService.loadItem().subscribe(
      datas => {
        this.userData = datas;
      },
      err => {
        console.log(err);
      }
    )
  }

  renderPaging() {
    let allPage = Math.ceil(this.total / this.rowPerPage);
    this.paging = [];
    for (let i = 0; i < allPage; i++) {
      this.paging.push(i + 1);
    }
  }
 gotoPage(pId) {
    this.numPage = pId;
    this.search();
  }

  search() {
    let searchBody = {
      searchText: this.searchText,
      rowPerPage: this.rowPerPage,
      numPage: this.numPage

    }
    this.userService.search(searchBody).subscribe(data => {
      this.userData = data.row;
      this.total = data.total;
      this.renderPaging();
    }, error => {
      console.log(error)
    });
  }

  loadItem() {
    this.userService.loadItem().subscribe(
      datas => {
        this.userData = datas;
      },
      err => {
        console.log(err);
      }
    )
  }

  onAddButtonClick() {
    this.router.navigate(['support', 'user']);
  }


  onDeleteButtonClick(id) {
    this.userService.deleteItem(id).subscribe(
      datas => {
        this.userData.splice(id, 1);
        localStorage.setItem('company', JSON.stringify(this.userData));
        Materialize.toast('Delete item complete', 1000);
      },
      err => {
        console.log(err);
      });

    this.loadItem()
  }


  onEditButtonClick(id) {
    this.router.navigate(['support', 'user', id]); //support/user/(id)

  }

}
