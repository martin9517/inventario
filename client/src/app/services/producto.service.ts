import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  protected readonly baseURL = `${environment.API_URL}/productos`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseURL);
  }

  get(id: any): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseURL}/${id}`);
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
  findByProducto(nombre?: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.findByProducto}?nombre=${nombre}`);
  }
}

