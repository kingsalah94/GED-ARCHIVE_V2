import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Structures} from "../../models/Structures";
import {environment} from "../../../environments/environment";
import {ResponsableTraitement} from "../../models/ResponsableTraitement";

@Injectable({
  providedIn: 'root'
})
export class ResponsableTraitementService {

  constructor(private http: HttpClient) { }

  public getStructure(): Observable<Array<ResponsableTraitement>> {
    return this.http.get<Array<ResponsableTraitement>>(environment.backendHost + "/api/archive/responsabletraitement")
  }
  public getAllStructure(): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost + "/responsabletraitement")
  }
  public getOneStructure(id:any): Observable<Structures> {
    return this.http.get<Structures>(environment.backendHost + "/responsabletraitement/"+id)
  }


  public saveStructure(structure: Structures): Observable<Structures> {
    return this.http.post<Structures>(environment.backendHost + "/responsabletraitement",structure)
  }
  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/responsabletraitement",data)
  }

  public delete(id: any):Observable<any> {
    return this.http.delete(environment.backendHost + "/responsabletraitement/"+id)
  }

  public updateStructure(structures: Structures): Observable<Structures> {
    return this.http.put<Structures>(environment.backendHost+"/responsabletraitement/"+structures.id,structures);
  }
  public updateStructures(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/responsabletraitement/"+id,data);
  }

  findByNom(keyword: string): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost+"/structures/responsabletraitement?keyword="+keyword);
  }

}
