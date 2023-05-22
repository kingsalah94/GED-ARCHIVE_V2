import {Dossier} from "./dossier";

export class Autorisation {
  id?:number
  utilisateur?:string
  lecture?:boolean
  ecriture?:boolean
  DossierDTO?:Dossier
}
