import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class CustomerService {

  constructor(private http : Http) { }

  loadItem(): Observable<any[]> { // environment.apiUrl + '/company'  สามารถเขียนแบบนี้แทนได้ เป็นการต่อ string
    return this.http.get(`${environment.apiUrl}/customer`) //set urlไว้ที environment.ts 
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  findById(id): Observable<any> {

    return this.http.get(
      `${environment.apiUrl}/customer/findById/${id}`)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  updateItem(body, id): Observable<any> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(
      `${environment.apiUrl}/customer/${id}`, bodyString, options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  addItem(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      `${environment.apiUrl}/customer`, bodyString, options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));

  }

    deleteItem(id): Observable<any> {

    return this.http.delete(
      `${environment.apiUrl}/customer/${id}`)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }


   search(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      `${environment.apiUrl}/customer/search`, bodyString, options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));

  }


}
