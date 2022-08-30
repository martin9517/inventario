import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bonificacion } from '../models/bonificacion.model';


@Injectable({
  providedIn: 'root'
})
export class BonificacionService {

  protected readonly baseURL = `${environment.API_URL}/bonificaciones`;
  constructor(private http: HttpClient) { }

  getOne(): Observable<Bonificacion> {
    return this.http.get<Bonificacion>(`${this.baseURL}/getOne`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseURL, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, data);
  }
}
