import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; //ActivatedRoute ใช้ get value ที่ถูกส่งมา
import { CompanyService } from '../company.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private companyService: CompanyService) {

  }

  mode: string = 'ADD';
  id: number = 0;
  compCode: string;
  compName: string;
  companyData = [];

  ngOnInit() {
    this.activeRoute.params.subscribe(param => {
      if (param['id']) {
        let id = param['id'];
        this.companyService.findById(id).subscribe(
          company => {
            this.compCode = company.compCode;
            this.compName = company.compName;
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
    let comp = {
      compCode: this.compCode,
      compName: this.compName
    }

    let company: Array<any> = [];
    if (localStorage.getItem('company')) {
      company = JSON.parse(localStorage.getItem('company'));
    }
    if (this.mode == "EDIT") {
      this.companyService.updateItem(comp, this.id).subscribe(
        datas => {
          Materialize.toast('update item complete', 1000);
          this.router.navigate(['support', 'company-list']);
        },
        err => {
          console.log(err);
        });

    } else {
      this.companyService.addItem(comp).subscribe(
        datas => {
          Materialize.toast('Add new item complete', 1000);
          this.router.navigate(['support', 'company-list']);
        },
        err => {
          console.log(err);
        });
    }

  }



}
