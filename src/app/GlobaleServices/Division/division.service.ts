import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Divisions} from "../../models/Divisions";
import {Structures} from "../../models/Structures";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http: HttpClient) { }
  private host = environment.backendHost;

  /*public getDivision(): Observable<Array<Divisions>> {
    return this.http.get<Array<Divisions>>(environment.backendHost + "/api/archive/divisions")
  }*/
  public getDivisions(): Observable<Divisions[]>{
    return  this.http.get<Divisions[]>(`${this.host}/api/archive/divisions`);
  }
  public getAllDivision(): Observable<Divisions[]> {
    return this.http.get<Divisions[]>(environment.backendHost + "/api/archive/divisions")
  }
  public getOneDivision(id:any): Observable<Divisions> {
    return this.http.get<Divisions>(environment.backendHost + "/api/archive/divisions/"+id)
  }


  public saveDivision(division: Divisions): Observable<Divisions> {
    return this.http.post<Divisions>(environment.backendHost + "/api/archive/divisions",division)
  }
  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/api/archive/divisions",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/api/archive/divisions/"+id)
  }

  public updateDivision(division: Divisions): Observable<Divisions> {
    return this.http.put<Divisions>(environment.backendHost+"/api/archive/divisions/"+division.id,division);
  }
  public updateDivisions(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/api/archive/divisions/"+id,data);
  }

  findByNom(keyword: string): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost+"/api/archive/division/search?keyword="+keyword);
  }
}
