import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';
import { CompanyService } from '../company.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers: [IssueService, CompanyService, CustomerService]
})
export class IssueComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private issueService: IssueService,
    private companyService: CompanyService,
    private customerService: CustomerService
  ) { }

  mode: string = 'ADD';
  chkStatus: string ;
  id: number = 0;
  issueCode: string;
  issueDetail: string;
  company: string;
  cusName: string;
  userName: String;
  issueDate: string;
  status: string;
  issueData = [];
  companyData = [];
  customerData = [];

  ngOnInit() {
    this.GetCustomer();
    this.GetCompany();
    this.activeRoute.params.subscribe(param => {
      if (param['id']) {
        let id = param['id'];
        this.issueService.findById(id).subscribe(
          issue => {
            this.chkStatus = issue.status;
            this.issueCode = issue.issueCode;
            this.issueDetail = issue.issueDetail;
            this.company = issue.company;
            this.cusName = issue.cusName;
            this.userName = issue.userName;
            this.issueDate = issue.issueDate;
            //this.status = issue.status;
            //this.company = customer.company;
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

      issueCode: this.issueCode,
      issueDetail: this.issueDetail,
      company: this.company,
      cusName: this.cusName,
      userName: this.userName,
      issueDate: this.issueDate,
      status: this.status
    }

    let company: Array<any> = [];
    if (localStorage.getItem('issue')) {
      company = JSON.parse(localStorage.getItem('issue'));
    }
    if (this.mode == "EDIT") {
      this.issueService.updateItem(cus, this.id).subscribe(
        datas => {
          Materialize.toast('update item complete', 1000);
          this.router.navigate(['support', 'issue-list']);
        },
        err => {
          console.log(err);
        });

    } else {
      this.issueService.addItem(cus).subscribe(
        datas => {
          Materialize.toast('Add new item complete', 1000);
          this.router.navigate(['support', 'issue-list']);
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

  GetCustomer() {
    this.customerService.loadItem().subscribe(
      datas => {
        this.customerData = datas;
      },
      err => {
        console.log(err);
      });
  }

  doOnchangeComp(value) {
    console.log(value);
    this.company = value;
  }
  doOnchangeCus(value) {
    console.log(value);
    this.cusName = value;
  }
  onSelectionChange(value){
    console.log(value);
    this.status = value;
  }

}
