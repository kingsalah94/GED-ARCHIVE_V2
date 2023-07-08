import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Structures} from "../../models/Structures";
import {Directions} from "../../models/Directions";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";
import {Dossier} from "../../models/dossier";


@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  private host = environment.backendHost;
  constructor(private http: HttpClient) { }


  public getDirections(): Observable<Directions[] | HttpErrorResponse> {
    return this.http.get<Directions[]>(`${this.host}/api/archive/direction/list`)
  }


  public addDirection(formdata: FormData): Observable<any> {
    return this.http.post<Directions>(`${this.host}/api/archive/direction/add`,formdata)
  }
  public updateDirection(formdata: FormData): Observable<any> {
    return this.http.put<Directions>(`${this.host}/api/archive/direction/update`,formdata)
  }


  public deleteDirection(directionName: string):Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/direction/delete/${directionName}}`)
  }

  public addDirectionToLocalCache(directions: Directions[] | HttpErrorResponse): void{
    localStorage.setItem('directions',JSON.stringify(directions));
  }
  public getDirectionFromLocalCache(): Directions[] | null {
    const directions = localStorage.getItem('directions');
    if (directions) {
      return JSON.parse(directions);
    }
    return null;
  }

  public createDirectionFormData(currentDirectionName: string, direction: Directions): FormData {
    const formData = new FormData();
    formData.append('currentDirectionName',currentDirectionName);
    formData.append('directionName',direction.directionName);
    formData.append('description',direction.description);
    formData.append('structureId',direction.structureId);


    return formData;
  }

  findByNom(keyword: string): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost+"/direction/search?keyword="+keyword);
  }
}
