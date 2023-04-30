import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Chambre} from "../../models/Chambre";


@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  constructor(private http:HttpClient) { }

  public saveChambre(chambre: Chambre): Observable<Chambre> {
    return this.http.post<Chambre>(environment.backendHost + "/chambre",chambre)
  }

  public getChambre(): Observable<Array<Chambre>> {
    return this.http.get<Array<Chambre>>(environment.backendHost + "/chambre")
  }
  public getAllChambre(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(environment.backendHost + "/chambre")
  }
  public getOneChambre(id:any): Observable<Chambre> {
    return this.http.get<Chambre>(environment.backendHost + "/chambre/"+id)
  }

  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/chambre",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/chambre/"+id)
  }

  public updateChambre(chambre: Chambre): Observable<Chambre> {
    return this.http.put<Chambre>(environment.backendHost+"/chambre/"+chambre.id,chambre);
  }
  public updatechambres(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/chambre/"+id,data);
  }

  findByNom(keyword: string): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(environment.backendHost+"/chambre/search?keyword="+keyword);
  }
}
