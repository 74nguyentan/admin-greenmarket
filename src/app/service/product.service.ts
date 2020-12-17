import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseurl = 'http://localhost:8000/greenmarket/api/admin/mathang';
  private url_tenhang = 'http://localhost:8000/greenmarket/api/admin/mathang1'; 
  private url_report = 'http://localhost:8000/greenmarket/api/admin/mathangreport';
  private url_openreport = 'http://localhost:8000/greenmarket/api/admin/tocao';
  constructor(private http: HttpClient) { }

  getProductList(): Observable<any> {
    return this.http.get(`${this.baseurl}`);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`);
  }

  getProduct1(tenHang: string): Observable<any> {
    return this.http.get(`${this.url_tenhang}/${tenHang}`);
  }

  getreport(): Observable<any> {
    return this.http.get(`${this.url_report}`);
  }

  opnereport(id: number, value: any): Observable<any> {
    return this.http.put(`${this.url_openreport}/${id}`, value);
  }
}
