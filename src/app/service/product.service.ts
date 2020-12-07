import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseurl = 'http://localhost:8000/greenmarket/api/mathang';
  constructor(private http: HttpClient) { }

  getProductList(): Observable<any> {
    return this.http.get(`${this.baseurl}`);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`);
  }

}
