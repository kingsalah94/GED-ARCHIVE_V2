import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Rayon} from "../../models/Rayon";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";
import {Documents} from "../../models/documents";


@Injectable({
  providedIn: 'root'
})
export class RayonService {
  private host = environment.backendHost;
  constructor(private http: HttpClient) { }

  public getRayons(): Observable<Rayon[] | HttpErrorResponse> {
    return this.http.get<Rayon[]>(`${this.host}/api/archive/rayon/list`)
  }

  public addRayon(formData: FormData): Observable<any> {
    return this.http.post<Rayon>(`${this.host}/api/archive/rayon/add`,formData)
  }

 public updateRayon(formData: FormData): Observable<any> {
    return this.http.put<Rayon>(`${this.host}/api/archive/rayon/update`,formData)
  }



  public delete(numeroRayon: string):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/rayon/delete/${numeroRayon}`)
  }
  public addRayonsToLocalCache(rayons: Rayon[] | HttpErrorResponse): void{
    localStorage.setItem('rayons',JSON.stringify(rayons));
  }
  public getRayonsFromLocalCache(): Rayon[] | null {
    const rayons = localStorage.getItem('rayons');
    if (rayons) {
      return JSON.parse(rayons);
    }
    return null;
  }

  public createRayonFormData(currentNumeroRayon: string, rayon: Rayon): FormData {
    const formData = new FormData();
    formData.append('currentNumeroRayon',currentNumeroRayon);
    formData.append('numeroRayon',rayon.numeroRayon);
    formData.append('nombreEtagere',rayon.nombreEtagere);
    formData.append('chambreId',rayon.chambreId);


    return formData;
  }

  findByNom(keyword: string): Observable<Rayon[]> {
    return this.http.get<Rayon[]>(environment.backendHost+"/rayon/search?keyword="+keyword);
  }
}
