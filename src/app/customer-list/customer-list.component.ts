import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {

  constructor(
    private router: Router,
    private customerService: CustomerService) {

  }

  customerData = [];
  searchText = "";
  numPage = 0;
  rowPerPage = 5;
  total = 0;
  paging = [];

  ngOnInit() {
    this.search();

    // this.customerService.loadItem().subscribe(
    //   datas => {
    //     this.customerData = datas;
    //   },
    //   err => {
    //     console.log(err);
    //   });
  }

  loadItem() {
    this.customerService.loadItem().subscribe(
      datas => {
        this.customerData = datas;
      },
      err => {
        console.log(err);
      });
  }

    onEditButtonClick(id) {

    this.router.navigate(['support', 'customer', id]); //support/company/1

  }


  onAddButtonClick() {
    this.router.navigate(['support', 'customer']);
  }


  onDeleteButtonClick(id) {
    this.customerService.deleteItem(id).subscribe(
      datas => {
        this.customerData.splice(id, 1);
        localStorage.setItem('customer', JSON.stringify(this.customerData));
        Materialize.toast('Delete item complete', 1000);
      },
      err => {
        console.log(err);
      });

    this.loadItem()
  }

  search() {
    let searchBody = {
      searchText: this.searchText,
      rowPerPage: this.rowPerPage,
      numPage: this.numPage
    }
    this.customerService.search(searchBody).subscribe(data => {
      this.customerData = data.rows;
      this.total = data.total;
      this.renderPaging();
    }, error => {
      console.log(error)
    });
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

}
