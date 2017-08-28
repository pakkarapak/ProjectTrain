import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  price = 123456789.223; //ใส่ format ให้ด้วยคำสั่ง | number ที่ html
  currentDate = new Date(); 
  title: string = "This is a Title";
  show: boolean = false;
  list = ["one", "two", "three"];
  isActive: boolean = true;
  conditionExpression = "A";
  case1Exp = "B";


  ngOnInit() {
  }

  onClick() {
    this.title = "Click..."
    this.show = !this.show;
    this.isActive = !this.isActive
  }

}
