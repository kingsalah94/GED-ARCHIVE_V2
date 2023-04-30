import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Structures} from "../../models/Structures";


@Injectable({
  providedIn: 'root'
})
export class StructureService {

  constructor(private http: HttpClient) { }

 public getStructure(): Observable<Array<Structures>> {
    return this.http.get<Array<Structures>>(environment.backendHost + "/structures")
  }
  public getAllStructure(): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost + "/structures")
  }
  public getOneStructure(id:any): Observable<Structures> {
    return this.http.get<Structures>(environment.backendHost + "/structures/"+id)
  }


  public saveStructure(structure: Structures): Observable<Structures> {
    return this.http.post<Structures>(environment.backendHost + "/structures",structure)
  }
  public create(data: any): Observable<any> {
    return this.http.post(environment.backendHost + "/structures",data)
  }

  public delete(id: any):Observable<any> {
     return this.http.delete(environment.backendHost + "/structures/"+id)
  }

  public updateStructure(structures: Structures): Observable<Structures> {
    return this.http.put<Structures>(environment.backendHost+"/structures/"+structures.id,structures);
  }
 public updateStructures(id: any,data:any): Observable<any> {
    return this.http.put(environment.backendHost+"/structures/"+id,data);
  }

  findByNom(keyword: string): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost+"/structures/search?keyword="+keyword);
  }


}
