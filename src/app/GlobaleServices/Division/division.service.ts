import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Divisions} from "../../models/Divisions";
import {Structures} from "../../models/Structures";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http: HttpClient) { }


  public getDivision(): Observable<Array<Divisions>> {
    return this.http.get<Array<Divisions>>(environment.backendHost + "/divisions")
  }
  public getAllDivision(): Observable<Divisions[]> {
    return this.http.get<Divisions[]>(environment.backendHost + "/divisions")
  }
  public getOneDivision(id:any): Observable<Divisions> {
    return this.http.get<Divisions>(environment.backendHost + "/divisions/"+id)
  }


  public saveDivision(division: Divisions): Observable<Divisions> {
    return this.http.post<Divisions>(environment.backendHost + "/divisions",division)
  }
  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/divisions",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/divisions/"+id)
  }

  public updateDivision(division: Divisions): Observable<Divisions> {
    return this.http.put<Divisions>(environment.backendHost+"/divisions/"+division.id,division);
  }
  public updateDivisions(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/divisions/"+id,data);
  }

  findByNom(keyword: string): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost+"/division/search?keyword="+keyword);
  }
}
