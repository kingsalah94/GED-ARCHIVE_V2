import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Structures} from "../../models/Structures";
import {environment} from "../../../environments/environment";
import {ResponsableTraitement} from "../../models/ResponsableTraitement";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";
import {Chambre} from "../../models/Chambre";

@Injectable({
  providedIn: 'root'
})
export class ResponsableTraitementService {
  private host = environment.backendHost;
  constructor(private http: HttpClient) { }

  public getResponsable(): Observable<ResponsableTraitement[] | HttpErrorResponse> {
    return this.http.get<ResponsableTraitement[]>(`${this.host}/api/archive/responsabletraitement/list`)
  }



  public addResponsable(formData: FormData): Observable<any> {
    return this.http.post<ResponsableTraitement>(`${this.host}/api/archive/responsabletraitement/add`,formData);
  }
  public updateResponsable(formData: FormData): Observable<any> {
    return this.http.put<ResponsableTraitement>(`${this.host}/api/archive/responsabletraitement/update`,formData);
  }
  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/responsabletraitement",data);
  }

  public delete(nomRt: String):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/responsabletraitement/delete/${nomRt}`);
  }


  public addResponsableTraitementToLocalCache(responsables: ResponsableTraitement[] | HttpErrorResponse): void{
    localStorage.setItem('responsables',JSON.stringify(responsables));
  }
  public getResponsableTraitementFromLocalCache(): ResponsableTraitement[] | null {
    const responsables = localStorage.getItem('responsables');
    if (responsables) {
      return JSON.parse(responsables);
    }
    return null;
  }



  public createResponsableTraitementFormData(currentNomRt: string, responsable: ResponsableTraitement): FormData {
    const formData = new FormData();
    formData.append('currentNomRt',currentNomRt);
    formData.append('nomRt',responsable.nomRt);
    formData.append('email',responsable.email);
    formData.append('structuresId',responsable.structuresId);
    return formData;
  }

}
