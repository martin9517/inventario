import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marca } from '../models/marca.model';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  protected readonly baseURL = `${environment.API_URL}/marcas`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseURL);
  }

  get(id: any): Observable<Marca> {
    return this.http.get<Marca>(`${this.baseURL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseURL, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
