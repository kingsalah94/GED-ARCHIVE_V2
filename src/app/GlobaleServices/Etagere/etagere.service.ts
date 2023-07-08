import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Etagere} from "../../models/Etagere";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";
import {Documents} from "../../models/documents";


@Injectable({
  providedIn: 'root'
})
export class EtagereService {
  private host = environment.backendHost;
  constructor(private http: HttpClient) { }

  public addEtagere(formData: FormData): Observable<any> {
    return this.http.post<Etagere>(`${this.host}/api/archive/etagere/add`,formData)
  }
  public updateEtagere(formData: FormData): Observable<any> {
    return this.http.put<Etagere>(`${this.host}/api/archive/etagere/update`,formData)
  }

  public getEtagere(): Observable<Etagere[] | HttpErrorResponse> {
    return this.http.get<Etagere[]>(`${this.host}/api/archive/etagere/list`)
  }


  public delete(numeroEtagere: string):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/etagere/delete/${numeroEtagere}`)
  }

  public addEtagereToLocalCache(etageres: Etagere[] | HttpErrorResponse): void{
    localStorage.setItem('etageres',JSON.stringify(etageres));
  }
  public getEtagereFromLocalCache(): Etagere[] | null {
    const etageres = localStorage.getItem('etageres');
    if (etageres) {
      return JSON.parse(etageres);
    }
    return null;
  }

  public createEtagereFormData(currentNumeroEtagere: string, etagere: Etagere): FormData {
    const formData = new FormData();
    formData.append('currentNumeroEtagere',currentNumeroEtagere);
    formData.append('numeroEtagere',etagere.numeroEtagere);
    formData.append('description',etagere.description);
    formData.append('nbrRanger',etagere.nbrRanger);
    formData.append('rayonId',etagere.rayonId);

    return formData;
  }

  findByNom(keyword: string): Observable<Etagere[]> {
    return this.http.get<Etagere[]>(environment.backendHost+"/api/archive/etagere/search?keyword="+keyword);
  }
}
