import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Structures} from "../../models/Structures";
import {Directions} from "../../models/Directions";


@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  constructor(private http: HttpClient) { }


  public getDirection(): Observable<Array<Structures>> {
    return this.http.get<Array<Structures>>(environment.backendHost + "/direction")
  }
  public getAllDirection(): Observable<Directions[]> {
    return this.http.get<Directions[]>(environment.backendHost + "/direction")
  }
  public getOneDirection(id:any): Observable<Directions> {
    return this.http.get<Directions>(environment.backendHost + "/direction/"+id)
  }


  public saveDirection(direction: Directions): Observable<Directions> {
    return this.http.post<Directions>(environment.backendHost + "/direction",direction)
  }
  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/direction",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/direction/"+id)
  }

  public updateDiection(direction: Directions): Observable<Directions> {
    return this.http.put<Directions>(environment.backendHost+"/direction/"+direction.id,direction);
  }
  public updatedirections(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/direction/"+id,data);
  }

  findByNom(keyword: string): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost+"/direction/search?keyword="+keyword);
  }
}
