import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Dossier} from "../../models/dossier";
import {Documents} from "../../models/documents";


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
data:any;
  constructor(private http: HttpClient) {

  }

  public getDossier(): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(environment.backendHost + "/dossier")
  }
  public saveDocument(document: Documents): Observable<Documents > {
    return this.http.post<Documents>(environment.backendHost + "/document",document)
  }



  public getDocument(): Observable<Array<Documents>> {
    return this.http.get<Array<Documents>>(environment.backendHost + "/document")
  }
  public getAllDocument(): Observable<Documents[]> {
    return this.http.get<Documents[]>(environment.backendHost + "/document")
  }
  public getOneDocument(id:any): Observable<Documents> {
    return this.http.get<Documents>(environment.backendHost + "/document/"+id)
  }

  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/document",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/document/"+id)
  }

  public updatedocument(document: Documents): Observable<Documents> {
    return this.http.put<Documents>(environment.backendHost+"/document/"+document.id,document);
  }
  public updateDocuments(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/document/"+id,data);
  }

  findByNom(keyword: string): Observable<Documents[]> {
    return this.http.get<Documents[]>(environment.backendHost+"/document/search?keyword="+keyword);
  }

}
