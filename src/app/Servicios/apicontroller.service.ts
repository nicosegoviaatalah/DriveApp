import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIControllerService {

  /* Configuramos URL de nuestra API a consumir */
  apiURL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  /* Cada función que realizamos de la API se liga a una llamada HTTP */
  getUsers(): Observable<any> {
    return this.http.get(this.apiURL + "/users");
  }

  postUser(data: any): Observable<any> {
    return this.http.post(this.apiURL + "/users", data);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(this.apiURL + "/users/" + id, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.apiURL + "/users/" + id);
  }

  /* Recuperación de contraseña */
  postPasswordRecovery(email: string): Observable<any> {
    return this.http.post(this.apiURL + "/password-recovery", { email: email });
  }
}
