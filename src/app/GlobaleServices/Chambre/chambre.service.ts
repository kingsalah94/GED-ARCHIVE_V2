import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Chambre} from "../../models/Chambre";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";
import {Documents} from "../../models/documents";


@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  private host = environment.backendHost;
  constructor(private http:HttpClient) { }


  public getChambres(): Observable<Chambre[] | HttpErrorResponse>{
    return this.http.get<Chambre[]>(`${this.host}/api/archive/chambre/list`)
  }

  public addChambre(formData: FormData):Observable<any>{
    return this.http.post<Chambre>(`${this.host}/api/archive/chambre/add`,formData)
  }
  public updateChambres(formData: FormData):Observable<any>{
    return this.http.put<Chambre>(`${this.host}/api/archive/chambre/update`,formData);
  }

  public deleteChambre(numeroChambre: string):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/chambre/delete/${numeroChambre}`);
  }

  public addChambreToLocalCache(chambres: Chambre[] | HttpErrorResponse): void{
    localStorage.setItem('chambres',JSON.stringify(chambres));
  }
  public getChambresFromLocalCache(): Chambre[] | null {
    const chambres = localStorage.getItem('chambres');
    if (chambres) {
      return JSON.parse(chambres);
    }
    return null;
  }


  findByNom(keyword: string): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(environment.backendHost+"/chambre/search?keyword="+keyword);
  }

  public createChambreFormData(currentNumeroChambre: string, chambre: Chambre): FormData {
    const formData = new FormData();
    formData.append('currentNumeroChambre',currentNumeroChambre);
    formData.append('numeroChambre',chambre.numeroChambre);
    formData.append('nbrRayon',chambre.nbrRayon);
    formData.append('niveauBatimentId',chambre.niveauBatimentId);
    return formData;
  }
}
