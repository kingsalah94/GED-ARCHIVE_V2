import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Boite} from "../../models/Boite";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";
import {Dossier} from "../../models/dossier";


@Injectable({
  providedIn: 'root'
})
export class BoiteService {
  private host = environment.backendHost;
  constructor(private http: HttpClient) { }

  public addBoite(formData: FormData): Observable<any> {
    return this.http.post<Boite>(`${this.host}/api/archive/boite/add`,formData)
  }
  public updateBoite(formData: FormData): Observable<any> {
    return this.http.put<Boite>(`${this.host}/api/archive/boite/update`,formData)
  }

  public getBoites(): Observable<Boite[] | HttpErrorResponse> {
    return this.http.get<Boite[]>(`${this.host}/api/archive/boite/list`)
  }






  public deleteBoite(numeroBoite: any):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/boite/delete/${numeroBoite}`)
  }


  public addBoiteToLocalCache(boite: Boite[] | HttpErrorResponse): void{
    localStorage.setItem('boites',JSON.stringify(boite));
  }
  public getBoiteFromLocalCache(): Boite[] | null {
    const boites = localStorage.getItem('boites');
    if (boites) {
      return JSON.parse(boites);
    }
    return null;
  }

  public createBoiteFormData(currentNumeroBoite: string, boite: Boite): FormData {
    const formData = new FormData();
    formData.append('currentNumeroBoite',currentNumeroBoite);
    formData.append('numeroBoite',boite.numeroBoite);
    formData.append('responsable',boite.responsable);
    formData.append('description',boite.description);
    formData.append('capacite',boite.capacite);
    formData.append('emplacement',boite.emplacement);
    formData.append('isEmpty',JSON.stringify(boite.Empty));
    formData.append('isNotFull',JSON.stringify(boite.notFull));
    formData.append('rangerId',boite.rangerId);


    return formData;
  }
  findByNom(keyword: string): Observable<Boite[]> {
    return this.http.get<Boite[]>(environment.backendHost+"/api/archive/boite/search?keyword="+keyword);
  }
}
