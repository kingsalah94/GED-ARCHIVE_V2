import {Dossier} from "./dossier";
import {User} from "./user";

export class Emprunt {
  public id:number
  public codeEmprunt:string;
  public dateEmprunt:Date
  public dateRetour:Date
  public dossierId:any
  public email:string


  constructor() {
    this.id = 0;
    this.codeEmprunt= '';
    // @ts-ignore
    this.dateEmprunt = null;
    // @ts-ignore
    this.dateRetour = null;
    this.dossierId = 0;
    this.email = '';
  }
}
