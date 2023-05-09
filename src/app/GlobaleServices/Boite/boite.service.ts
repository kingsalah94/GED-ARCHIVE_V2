import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Boite} from "../../models/Boite";


@Injectable({
  providedIn: 'root'
})
export class BoiteService {

  constructor(private http: HttpClient) { }

  public saveBoite(boite: Boite): Observable<Boite> {
    return this.http.post<Boite>(environment.backendHost + "/api/archive/boite",boite)
  }

  public getBoite(): Observable<Array<Boite>> {
    return this.http.get<Array<Boite>>(environment.backendHost + "/api/archive/boite")
  }


  public getAllBoite(): Observable<Boite[]> {
    return this.http.get<Boite[]>(environment.backendHost + "/api/archive/boite")
  }
  public getOneBoite(id:any): Observable<Boite> {
    return this.http.get<Boite>(environment.backendHost + "/api/archive/boite/"+id)
  }

  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/api/archive/boite",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/api/archive/boite/"+id)
  }

  public updateBoite(boite: Boite): Observable<Boite> {
    return this.http.put<Boite>(environment.backendHost+"/api/archive/boite/"+boite.id,boite);
  }
  public updateBoites(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/api/archive/boite/"+id,data);
  }

  findByNom(keyword: string): Observable<Boite[]> {
    return this.http.get<Boite[]>(environment.backendHost+"/api/archive/boite/search?keyword="+keyword);
  }
}
