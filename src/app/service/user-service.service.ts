import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  static getUserByEmail(email_user: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrlUse = 'http://localhost:8000/greenmarket/users/users';
  // private baseurlPro = 'http://localhost:8000/greenmarket/api/mathang';

  constructor(private http: HttpClient) { }

  createUser(Users: Object): Observable<Object> {
    return this.http.post(`${this.baseUrlUse}`, Users);
  }
  // getProductList(): Observable<any> {
  //   return this.http.get(`${this.baseurlPro}`);
  // }
  getUsList(link): Observable<any> {
    return this.http.get(`${link}`);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrlUse}/${id}`);
  }

  getUserByEmail(email: String): Observable<any> {
    return this.http.get(`${this.baseUrlUse}/email/${email}`);
  }
  updateUser(id: any, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrlUse}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrlUse}/${id}`, { responseType: 'text' });
  }


}
