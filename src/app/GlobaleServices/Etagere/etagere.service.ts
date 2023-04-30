import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Etagere} from "../../models/Etagere";


@Injectable({
  providedIn: 'root'
})
export class EtagereService {

  constructor(private http: HttpClient) { }

  public saveEtagere(etagere: Etagere): Observable<Etagere> {
    return this.http.post<Etagere>(environment.backendHost + "/etagere",etagere)
  }

  public getEtagere(): Observable<Array<Etagere>> {
    return this.http.get<Array<Etagere>>(environment.backendHost + "/etagere")
  }

  public getBatiment(): Observable<Array<Etagere>> {
    return this.http.get<Array<Etagere>>(environment.backendHost + "/etagere")
  }
  public getAllEtagere(): Observable<Etagere[]> {
    return this.http.get<Etagere[]>(environment.backendHost + "/etagere")
  }
  public getOneEtagere(id:any): Observable<Etagere> {
    return this.http.get<Etagere>(environment.backendHost + "/etagere/"+id)
  }

  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/etagere",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/etagere/"+id)
  }

  public updateEtagere(etagere: Etagere): Observable<Etagere> {
    return this.http.put<Etagere>(environment.backendHost+"/etagere/"+etagere.id,etagere);
  }
  public updateEtageres(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/etagere/"+id,data);
  }

  findByNom(keyword: string): Observable<Etagere[]> {
    return this.http.get<Etagere[]>(environment.backendHost+"/etagere/search?keyword="+keyword);
  }
}
