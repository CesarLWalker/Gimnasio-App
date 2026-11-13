import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rutina } from "../models/rutina.model";

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  private readonly apiUrl = '/api/rutinas'; // 'http://localhost:8083/api/rutinas'

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Obtener todas las rutinas
  listar(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.apiUrl);
  }

  // Obtener una rutina por ID
  buscarPorId(id: number): Observable<Rutina> {
    return this.http.get<Rutina>(`${this.apiUrl}/${id}`);
  }

  // Crear una rutina
  crear(rutina: Rutina): Observable<Rutina> {
    return this.http.post<Rutina>(this.apiUrl, rutina);
  }

  // Actualizar una rutina
  actualizar(id: number, rutina: Rutina): Observable<Rutina> {
    return this.http.put<Rutina>(`${this.apiUrl}/${id}`, rutina);
  }

  // Eliminar una rutina
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
