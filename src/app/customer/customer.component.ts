import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService, CompanyService]
})
export class CustomerComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService,
    private companyService: CompanyService
  ) { }


  mode: string = 'ADD';
  id: number = 0;
  cusCode: string;
  cusName: string;
  phone: string;
  email: string;
  compName: any;
  company: string;
  customerData = [];
  companyData = [];

  ngOnInit() {
    this.GetCompany()
    this.activeRoute.params.subscribe(param => {
      if (param['id']) {
        let id = param['id'];
        this.customerService.findById(id).subscribe(
          customer => {
            this.cusCode = customer.customerCode;
            this.cusName = customer.customerName;
            this.phone = customer.phone;
            this.email = customer.email;
            this.company = customer.company;
            this.compName = customer.company;
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
    let cus = {
      customerCode: this.cusCode,
      customerName: this.cusName,
      phone: this.phone,
      email: this.email,
      company: this.company
    }

    let customer: Array<any> = [];
    if (localStorage.getItem('customer')) {
      customer = JSON.parse(localStorage.getItem('customer'));
    }
    if (this.mode == "EDIT") {
      this.customerService.updateItem(cus, this.id).subscribe(
        datas => {
          Materialize.toast('update item complete', 1000);
          this.router.navigate(['support', 'customer-list']);
        },
        err => {
          console.log(err);
        });

    } else {
      this.customerService.addItem(cus).subscribe(
        datas => {
          Materialize.toast('Add new item complete', 1000);
          this.router.navigate(['support', 'customer-list']);
        },
        err => {
          console.log(err);
        });
    }

  }

  GetCompany() {
    this.companyService.loadItem().subscribe(
      datas => {
        this.companyData = datas;
      },
      err => {
        console.log(err);
      });
  }

  doSomething(value) {
    console.log(value);
    this.company =value;
  }
}
