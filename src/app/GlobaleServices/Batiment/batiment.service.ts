import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Batiment} from "../../models/Batiment";
import {environment} from "../../../environments/environment";
import {Structures} from "../../models/Structures";


@Injectable({
  providedIn: 'root'
})
export class BatimentService {

  constructor(private http: HttpClient) { }

  public saveBatiment(batiment: Batiment): Observable<Batiment> {
    return this.http.post<Batiment>(environment.backendHost + "/batiment",batiment)
  }


  public getBatiment(): Observable<Array<Batiment>> {
    return this.http.get<Array<Batiment>>(environment.backendHost + "/batiment")
  }
  public getAllBatiment(): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(environment.backendHost + "/batiment")
  }
  public getOneBatiment(id:any): Observable<Batiment> {
    return this.http.get<Batiment>(environment.backendHost + "/batiment/"+id)
  }

  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/batiment",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/batiment/"+id)
  }

  public updateBatiment(batiment: Batiment): Observable<Batiment> {
    return this.http.put<Structures>(environment.backendHost+"/batiment/"+batiment.id,batiment);
  }
  public updateBatiments(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/batiment/"+id,data);
  }

  findByNom(keyword: string): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(environment.backendHost+"/batiment/search?keyword="+keyword);
  }
}
