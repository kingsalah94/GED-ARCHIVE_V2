import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Dossier} from "../../models/dossier";
import {Documents} from "../../models/documents";
import {User} from "../../models/user";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
data:any;
  private host = environment.backendHost;
  constructor(private http: HttpClient) {

  }

  public getDossier(): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(`${this.host}/api/archive/dossier`)
  }



  public getDocuments(): Observable<Documents[] | HttpErrorResponse>{
    return  this.http.get<Documents[]>(`${this.host}/api/archive/document/list`);
  }
  public addDocument(formData: FormData): Observable<any>{
    return  this.http.post<Documents>(`${this.host}/api/archive/document/add`,formData);
  }
  public updateDocument(formData: FormData): Observable<any>{
    return  this.http.put<Documents>(`${this.host}/api/archive/document/update`,formData);
  }


  public updateDocumentPdf(formData: FormData): Observable<HttpEvent<Documents> | HttpErrorResponse>{
    return  this.http.post<Documents>(`${this.host}/api/archive/document/updateDocumentPdf`,formData,
      {reportProgress: true,
        observe: 'events'
      });
  }
  public deletedocument(intituleDocument: string): Observable<CustomHttpResponse | HttpErrorResponse>{
    return  this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/document/delete/${intituleDocument}`);
  }
  public addDocumentsToLocalCache(documents: Documents[] | HttpErrorResponse): void{
    localStorage.setItem('documents',JSON.stringify(documents));
  }
  public getDocumentsFromLocalCache(): Documents[] | null {
    const documents = localStorage.getItem('documents');
    if (documents) {
      return JSON.parse(documents);
    }
    return null;
  }

  public createDocumentFormData(loggedInUsername: string, document: Documents, documentPdf: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername',loggedInUsername);
    formData.append('intituleDocument',document.intituleDocument);
    formData.append('numeroDordre',document.numeroDordre);
    formData.append('typeDocument',document.typeDocument);
    formData.append('nombrPage',document.nombrPage);
    formData.append('dossierId',document.dossierId);
    formData.append('documentpdf',documentPdf);

    return formData;
  }



}
