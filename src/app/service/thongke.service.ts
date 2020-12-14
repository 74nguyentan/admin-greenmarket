import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThongkeService {
  private baseurl = 'http://localhost:8000/greenmarket/api/admin/thongke';
  private baseurl1 = 'http://localhost:8000/greenmarket/api/admin/thongkelichsu';
  private baseurl2 = 'http://localhost:8000/greenmarket/favourite/admin/thongkeyeuthich';
  constructor(private http: HttpClient) { }

  getthongke(): Observable<any> {
    return this.http.get(`${this.baseurl}`);
  }

  getthongkelichsu(): Observable<any> {
    return this.http.get(`${this.baseurl1}`);
  }

  getthongkeyeuthich(): Observable<any> {
    return this.http.get(`${this.baseurl2}`);
  }
}
