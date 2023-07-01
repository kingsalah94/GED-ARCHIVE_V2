import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Dossier} from "../../models/dossier";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";
import {Documents} from "../../models/documents";


@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private host = environment.backendHost;
  constructor(private http: HttpClient) {

  }

  public addDossier(formData: FormData): Observable<any> {
    return this.http.post<Dossier>(`${this.host}/api/archive/dossier/add`,formData)
  }
  public updateDossier(formData: FormData): Observable<any> {
    return this.http.put<Dossier>(`${this.host}/api/archive/dossier/update`,formData)
  }

  public getDossier(): Observable<Dossier[] | HttpErrorResponse> {
    return this.http.get<Dossier[]>(`${this.host}/api/archive/dossier/list`)
  }

  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/api/archive/dossier",data)
  }

  public deleteDossier(nomDossier: string):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/dossier/delete/${nomDossier}`)
  }

  public addDossierToLocalCache(dossier: Dossier[] | HttpErrorResponse): void{
    localStorage.setItem('dossiers',JSON.stringify(dossier));
  }
  public getDossierFromLocalCache(): Dossier[] | null {
    const dossiers = localStorage.getItem('dossiers');
    if (dossiers) {
      return JSON.parse(dossiers);
    }
    return null;
  }

  public createDossierFormData(currentNomDossier: string, dossier: Dossier): FormData {
    const formData = new FormData();
    formData.append('currentNomDossier',currentNomDossier);
    formData.append('nomDossier',dossier.nomDossier);
    formData.append('etatDossier',dossier.etatDossier);
    formData.append('typeDossier',dossier.typeDossier);
    formData.append('responsable',dossier.responsable);
    formData.append('description',dossier.description);
    formData.append('cote',dossier.cote);
    formData.append('dateExtreme',dossier.dateExtreme);
    formData.append('boiteId',dossier.boiteId);
    formData.append('responsableTraitementId',dossier.responsableTraitementId);

    return formData;
  }
  findByNom(keyword: string): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(environment.backendHost+"/dossier/search?keyword="+keyword);
  }
}
