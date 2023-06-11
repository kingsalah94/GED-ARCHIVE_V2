import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Batiment} from "../../models/Batiment";
import {environment} from "../../../environments/environment";
import {Structures} from "../../models/Structures";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";


@Injectable({
  providedIn: 'root'
})
export class BatimentService {
  private host = environment.backendHost;
  constructor(private http: HttpClient) { }

  public addBatiment(formData: FormData): Observable<any> {
    return this.http.post<Batiment>(`${this.host}/api/archive/batiment/add`,formData)
  }


  public getBatiment(): Observable<Batiment[] | HttpErrorResponse> {
    return this.http.get<Batiment[] >(`${this.host}/api/archive/batiment`)
  }

  public getOneBatiment(id:any): Observable<Batiment> {
    return this.http.get<Batiment>(environment.backendHost + "/batiment/"+id)
  }


  public delete(nomBatiment: string):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/batiment/${nomBatiment}`)
  }

  public updateBatiment(formData: FormData): Observable<Batiment> {
    return this.http.put<Batiment>(`${this.host}/api/archive/batiment/update`,formData);
  }


  public addBatimentToLocalCache(batiment: Batiment[] | HttpErrorResponse): void{
    localStorage.setItem('batiment',JSON.stringify(batiment));
  }

  public getBatimentFromLocalCache(): Batiment[] | null {
    const batiment = localStorage.getItem('batiment');
    if (batiment) {
      return JSON.parse(batiment);
    }
    return null;
  }
  findByNom(keyword: string): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(environment.backendHost+"/batiment/search?keyword="+keyword);
  }

  public createBatimentFormData(currentNomBatiment: string,batiment: Batiment): FormData {
    const formData = new FormData();
    formData.append('currentNomBatiment',currentNomBatiment);
    formData.append('nomBatiment',batiment.nomBatiment);
    formData.append('nbr_Niveau',batiment.nbr_Niveau);
    return formData;
  }
}
