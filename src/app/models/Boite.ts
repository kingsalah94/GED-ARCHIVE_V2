import {Etagere} from "./Etagere";
import {Ranger} from "./Ranger";

export class Boite {
  id?: any
  numeroBoite?: any
  dateCreation?:Date
  description?:string
  responsable?:string
  dateLimiteConservation?:Date
  emplacement?:string
  nombreDossiers?:number
  capacite?:number
  rangerDTO?:Ranger
 

}
