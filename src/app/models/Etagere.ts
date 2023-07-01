import {Rayon} from "./Rayon";

export class Etagere {
  public id: any
  public numeroEtagere: string
  public nbrRanger: any
  public description:string
  public dateCreation: Date;
  public updatedDate: Date;
  public rayonId?: any


  constructor() {
    this.id = 0;
    this.numeroEtagere = '';
    this.nbrRanger = 0;
    this.description = '';
    // @ts-ignore
    this.dateCreation = null;
    // @ts-ignore
    this.updatedDate = null;
    this.rayonId = 0;
  }
}

