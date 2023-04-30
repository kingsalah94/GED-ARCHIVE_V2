import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { NiveauBatiment } from 'src/app/models/NiveauBatiment';


@Injectable({
  providedIn: 'root'
})
export class NiveauBatimentService {

  constructor(private http:HttpClient) { }

  public saveNiveauBatiment(niveauBatiment: NiveauBatiment): Observable<NiveauBatiment> {
    return this.http.post<NiveauBatiment>(environment.backendHost + "/niveauBatiment",niveauBatiment)
  }


  public getNiveau(): Observable<Array<NiveauBatiment>> {
    return this.http.get<Array<NiveauBatiment>>(environment.backendHost + "/niveauBatiment")
  }
  public getAllNiveauxBatiment(): Observable<NiveauBatiment[]> {
    return this.http.get<NiveauBatiment[]>(environment.backendHost + "/niveauBatiment")
  }
  public getOneNiveau(id:any): Observable<NiveauBatiment> {
    return this.http.get<NiveauBatiment>(environment.backendHost + "/niveauBatiment/"+id)
  }

  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/niveauBatiment",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/niveauBatiment/"+id)
  }

  public updateNiveau(niveau: NiveauBatiment): Observable<NiveauBatiment> {
    return this.http.put<NiveauBatiment>(environment.backendHost+"/niveauBatiment/"+niveau.id,niveau);
  }
  public updateNiveaux(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/niveauBatiment/"+id,data);
  }

  findByNom(keyword: string): Observable<NiveauBatiment[]> {
    return this.http.get<NiveauBatiment[]>(environment.backendHost+"/niveauBatiment/search?keyword="+keyword);
  }
}
