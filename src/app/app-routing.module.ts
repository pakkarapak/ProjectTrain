import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PublicZoneComponent } from './public-zone/public-zone.component';
import { SupportZoneComponent } from './support-zone/support-zone.component';
import { CompanyComponent } from './company/company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { IssueComponent } from './issue/issue.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { LoginGuardService } from './login-guard.service'
const routes: Routes = [
  {
    path: '',
    component: PublicZoneComponent,
    children: [{
      path: '', //set defualt
      component: HomeComponent
    }, {
      path: 'home',
      component: HomeComponent
    }, {
      path: 'login',
      component: LoginComponent
    }]
  },

  {
    path: 'support',
    component: SupportZoneComponent,
    canActivate: [LoginGuardService],
    children: [{
      path: '',
      component: IssueListComponent
    }, {
      path: 'company', // เข้า company แบบ add
      component: CompanyComponent
    }, {
      path: 'company/:id', //เข้า company แบบมี parameter เข้าไปด้วย (อันนี้เพื่อการแก้ไข)
      component: CompanyComponent
    }, {
      path: 'company-list',
      component: CompanyListComponent
    }, {
      path: 'customer',
      component: CustomerComponent
    },{
      path: 'customer/:id', //เข้า company แบบมี parameter เข้าไปด้วย (อันนี้เพื่อการแก้ไข)
      component: CustomerComponent
    }, {
      path: 'customer-list',
      component: CustomerListComponent
    }, {
      path: 'user',
      component: UserComponent
    }, {
      path: 'user/:id', //เข้า user แบบมี parameter เข้าไปด้วย (อันนี้เพื่อการแก้ไข)
      component: UserComponent
    }, {
      path: 'user-list',
      component: UserListComponent
    }, {
      path: 'issue',
      component: IssueComponent
    },{
      path: 'issue/:id', //เข้า company แบบมี parameter เข้าไปด้วย (อันนี้เพื่อการแก้ไข)
      component: IssueComponent
    },  {
      path: 'issue-list',
      component: IssueListComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
