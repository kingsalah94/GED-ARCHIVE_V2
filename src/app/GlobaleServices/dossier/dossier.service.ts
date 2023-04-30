import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Dossier} from "../../models/dossier";


@Injectable({
  providedIn: 'root'
})
export class DossierService {

  constructor(private http: HttpClient) {

  }

  public saveDossier(dossier: Dossier): Observable<Dossier> {
    return this.http.post<Dossier>(environment.backendHost + "/dossier",dossier)
  }



  public getDossier(): Observable<Array<Dossier>> {
    return this.http.get<Array<Dossier>>(environment.backendHost + "/dossier")
  }
  public getAllDossier(): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(environment.backendHost + "/dossier")
  }
  public getOneDossier(id:any): Observable<Dossier> {
    return this.http.get<Dossier>(environment.backendHost + "/dossier/"+id)
  }

  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/dossier",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/dossier/"+id)
  }

  public updatedossier(dossier: Dossier): Observable<Dossier> {
    return this.http.put<Dossier>(environment.backendHost+"/dossier/"+dossier.id,dossier);
  }
  public updateDossiers(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/dossier/"+id,data);
  }

  findByNom(keyword: string): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(environment.backendHost+"/dossier/search?keyword="+keyword);
  }
}
