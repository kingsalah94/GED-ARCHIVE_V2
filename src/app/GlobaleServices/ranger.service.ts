import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ranger} from "../models/Ranger";
import {CustomHttpResponse} from "../Http-Response/Custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class RangerService {
  private host = environment.backendHost;
  constructor(private http: HttpClient) { }

  public addRanger(formData: FormData): Observable<any> {
    return this.http.post<Ranger>(`${this.host}/api/archive/ranger/add`,formData)
  }
  public updateRanger(formData: FormData): Observable<any> {
    return this.http.put<Ranger>(`${this.host}/api/archive/ranger/update`,formData)
  }

  public getRanger(): Observable<Ranger[] | HttpErrorResponse> {
    return this.http.get<Ranger[]>(`${this.host}/api/archive/ranger/list`)
  }


  public delete(numeroRanger: string):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/ranger/delete/${numeroRanger}`)
  }

  public addRangerToLocalCache(rangers: Ranger[] | HttpErrorResponse): void{
    localStorage.setItem('rangers',JSON.stringify(rangers));
  }
  public getRangerFromLocalCache(): Ranger[] | null {
    const rangers = localStorage.getItem('rangers');
    if (rangers) {
      return JSON.parse(rangers);
    }
    return null;
  }

  public createRangerFormData(currentNumeroRanger: string, ranger: Ranger): FormData {
    const formData = new FormData();
    formData.append('currentNumeroRanger',currentNumeroRanger);
    formData.append('numeroRanger',ranger.numeroRanger);
    formData.append('nombreBoite',ranger.nombreBoite);
    formData.append('etagereId',ranger.etagereId);


    return formData;
  }

  findByNom(keyword: string): Observable<Ranger[]> {
    return this.http.get<Ranger[]>(environment.backendHost+"/api/archive/ranger/search?keyword="+keyword);
  }
}
