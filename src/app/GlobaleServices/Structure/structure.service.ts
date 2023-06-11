import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Structures} from "../../models/Structures";
import {CustomHttpResponse} from "../../Http-Response/Custom-http-response";
import {Documents} from "../../models/documents";
import {User} from "../../models/user";


@Injectable({
  providedIn: 'root'
})
export class StructureService {
  data:any;
  private host = environment.backendHost;
  constructor(private http: HttpClient) { }

 public getStructure(): Observable<Structures[] | HttpErrorResponse> {
    return this.http.get<Structures[]>(`${this.host}/api/archive/structures`)
  }

  public addStructure(formData: FormData): Observable<any> {
    return this.http.post<Structures>(`${this.host}/api/archive/structures/add`,formData)
  }

  public deleteStructure(nomStructure: string):Observable<CustomHttpResponse | HttpErrorResponse> {
     return this.http.delete<CustomHttpResponse>(`${this.host}/api/archive/structures/${nomStructure}`)
  }

  public updateStructure(formData: FormData): Observable<any> {
    return this.http.put<Structures>(`${this.host}/api/archive/structures/update`,formData);
  }
  public addStructuresToLocalCache(structure: Structures[] | HttpErrorResponse): void{
    localStorage.setItem('structures',JSON.stringify(structure));
  }

  public getStructuresFromLocalCache(): Structures[] | null {
    const structures = localStorage.getItem('structures');
    if (structures) {
      return JSON.parse(structures);
    }
    return null;
  }

  findByNom(keyword: string): Observable<Structures[]> {
    return this.http.get<Structures[]>(environment.backendHost+"/structures/search?keyword="+keyword);
  }
  public createStructureFormData(currentNomStructure: string,structure: Structures): FormData {
    const formData = new FormData();
    formData.append('currentNomStructure',currentNomStructure);
    formData.append('nomStructure',structure.nomStructure);
    formData.append('description',structure.description);
    return formData;
  }

}
