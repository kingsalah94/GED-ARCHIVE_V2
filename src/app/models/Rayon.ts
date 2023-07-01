import {Chambre} from "./Chambre";

export class Rayon {
  public id: any
  public numeroRayon: string
  public nombreEtagere:any
  public dateCreation: Date;
  public updatedDate: Date;
  public chambreId: any


  constructor() {
    this.id = 0;
    this.numeroRayon = '';
    this.nombreEtagere = 0;
    // @ts-ignore
    this.dateCreation=null;
    // @ts-ignore
    this.updatedDate = null;
    this.chambreId = 0;
  }
}


