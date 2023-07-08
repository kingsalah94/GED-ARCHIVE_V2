import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Divisions} from "../../models/Divisions";
import {Structures} from "../../models/Structures";
import {User} from "../../models/user";
import {Dossier} from "../../models/dossier";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http: HttpClient) { }
  private host = environment.backendHost;


  public getDivisions(): Observable<Divisions[] | HttpErrorResponse>{
    return  this.http.get<Divisions[]>(`${this.host}/api/archive/divisions/list`);
  }


  public addDivision(formData: FormData): Observable<any> {
    return this.http.post<Divisions>(`${this.host}/api/archive/divisions/add`,formData)
  }
  public updateDivisions(formData: FormData): Observable<any> {
    return this.http.put<Divisions>(`${this.host}/api/archive/divisions/update`,formData)
  }




  public delete(DivisionName: string):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/divisions/delete/${DivisionName}`)
  }

  public addDivisionToLocalCache(division: Divisions[] | HttpErrorResponse): void{
    localStorage.setItem('divisions',JSON.stringify(division));
  }
  public getDivisionFromLocalCache(): Divisions[] | null {
    const divisions = localStorage.getItem('divisions');
    if (divisions) {
      return JSON.parse(divisions);
    }
    return null;
  }

  public createDivisionFormData(currentDivisionName: string, division: Divisions): FormData {
    const formData = new FormData();
    formData.append('currentDivisionName',currentDivisionName);
    formData.append('divisionName',division.divisionName);
    formData.append('description',division.description);
    formData.append('directionId',division.directionId);


    return formData;
  }
  findByNom(keyword: string): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost+"/api/archive/division/search?keyword="+keyword);
  }
}
