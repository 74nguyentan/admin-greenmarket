import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThongkeService {
  private baseurl = 'http://localhost:8000/greenmarket/api/thongke';
  constructor(private http: HttpClient) { }

  getthongke(): Observable<any> {
    return this.http.get(`${this.baseurl}`);
  }
}
