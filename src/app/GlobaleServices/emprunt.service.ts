import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Batiment} from "../models/Batiment";
import {CustomHttpResponse} from "../Http-Response/Custom-http-response";
import {Emprunt} from "../models/Emprunt";

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {
  private host = environment.backendHost;
  constructor(private http: HttpClient) { }

  public addEmprunt(formData: FormData): Observable<any> {
    return this.http.post<Emprunt>(`${this.host}/api/archive/emprunt/add`,formData)
  }


  public getEmprunt(): Observable<Emprunt[] | HttpErrorResponse> {
    return this.http.get<Emprunt[] >(`${this.host}/api/archive/emprunt/list`)
  }



  public delete(codeEmprunt: string):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/emprunt/${codeEmprunt}`)
  }

  public updateEmprunt(formData: FormData): Observable<Emprunt> {
    return this.http.put<Emprunt>(`${this.host}/api/archive/emprunt/update`,formData);
  }


  public addEmpruntToLocalCache(batiment: Emprunt[] | HttpErrorResponse): void{
    localStorage.setItem('emprunts',JSON.stringify(batiment));
  }

  public getEmpruntFromLocalCache(): Emprunt[] | null {
    const emprunts = localStorage.getItem('emprunts');
    if (emprunts) {
      return JSON.parse(emprunts);
    }
    return null;
  }


  public createEmpruntFormData(currentCodeEmprunt: string,emprunt: Emprunt): FormData {
    const formData = new FormData();
    formData.append('currentCodeEmprunt',currentCodeEmprunt);
    formData.append('codeEmprunt',emprunt.codeEmprunt);
    formData.append('dossierId',emprunt.dossierId);
    // @ts-ignore
    formData.append('dateRetour',emprunt.dateRetour);
    formData.append('email',emprunt.email);
    return formData;
  }
}
