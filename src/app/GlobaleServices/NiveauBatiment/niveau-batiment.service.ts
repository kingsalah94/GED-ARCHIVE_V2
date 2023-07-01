import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { NiveauBatiment } from 'src/app/models/NiveauBatiment';
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";
import {Documents} from "../../models/documents";


@Injectable({
  providedIn: 'root'
})
export class NiveauBatimentService {
  private host = environment.backendHost;
  constructor(private http:HttpClient) { }

  public addNiveaux(formData: FormData): Observable<any> {
    return this.http.post<NiveauBatiment>(`${this.host}/api/archive/niveauBatiment/add`,formData)
  }
  public updateNiveaux(formData: FormData): Observable<any> {
    return this.http.put<NiveauBatiment>(`${this.host}/api/archive/niveauBatiment/update`,formData)
  }

  public getNiveaux(): Observable<NiveauBatiment[] | HttpErrorResponse> {
    return this.http.get<NiveauBatiment[]>(`${this.host}/api/archive/niveauBatiment/list`)
  }

  public delete(numeroNiveau: string):Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/niveauBatiment/delete/${numeroNiveau}`)
  }



  public addNiveauxToLocalCache(niveaux: NiveauBatiment[] | HttpErrorResponse): void{
    localStorage.setItem('niveaux',JSON.stringify(niveaux));
  }
  public getNiveauxFromLocalCache(): NiveauBatiment[] | null {
    const niveaux = localStorage.getItem('niveaux');
    if (niveaux) {
      return JSON.parse(niveaux);
    }
    return null;
  }

  public createNiveauxFormDate(currentNumeroNiveau:string,niveaux:NiveauBatiment):FormData{
    const formData = new FormData();
    formData.append('currentNumeroNiveau',currentNumeroNiveau);
    formData.append('numeroNiveau',niveaux.numeroNiveau);
    formData.append('nbrChambre',niveaux.nbrChambre);
    formData.append('batimentId',niveaux.batimentId);
    return formData;
  }
  findByNom(keyword: string): Observable<NiveauBatiment[]> {
    return this.http.get<NiveauBatiment[]>(environment.backendHost+"/niveauBatiment/search?keyword="+keyword);
  }
}
