import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.model';
import { Count, QueryParams } from '../models/rest.model';
import { Utils } from '../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  protected readonly baseURL = `${environment.API_URL}/productos`;
  constructor(private http: HttpClient) { }

  getAll(queryParams?: QueryParams): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseURL, {params: Utils.buildParams(queryParams)});
  }

  get(id: any): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseURL}/${id}`);
  }

  count(queryParams?: QueryParams): Observable<Count> {
    return this.http.get<Count>(`${this.baseURL}/count`, {params: Utils.buildParams(queryParams)})
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseURL, data);
  }

  import(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/import`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}

