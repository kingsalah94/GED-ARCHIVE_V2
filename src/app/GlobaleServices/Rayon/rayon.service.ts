import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Rayon} from "../../models/Rayon";


@Injectable({
  providedIn: 'root'
})
export class RayonService {

  constructor(private http: HttpClient) { }

  public saveRayon(rayon: Rayon): Observable<Rayon> {
    return this.http.post<Rayon>(environment.backendHost + "/rayon",rayon)
  }

  public getRayon(): Observable<Array<Rayon>> {
    return this.http.get<Array<Rayon>>(environment.backendHost + "/rayon")
  }


  public getAllRayon(): Observable<Rayon[]> {
    return this.http.get<Rayon[]>(environment.backendHost + "/rayon")
  }
  public getOneRoyon(id:any): Observable<Rayon> {
    return this.http.get<Rayon>(environment.backendHost + "/rayon/"+id)
  }

  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/rayon",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/rayon/"+id)
  }

  public updateRayon(rayon: Rayon): Observable<Rayon> {
    return this.http.put<Rayon>(environment.backendHost+"/rayon/"+rayon.id,rayon);
  }
  public updateRayons(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/rayon/"+id,data);
  }

  findByNom(keyword: string): Observable<Rayon[]> {
    return this.http.get<Rayon[]>(environment.backendHost+"/rayon/search?keyword="+keyword);
  }
}
