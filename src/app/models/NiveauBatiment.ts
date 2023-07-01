import {Batiment} from "./Batiment";

export class NiveauBatiment{
  public id: any
  public numeroNiveau: string
  public nbrChambre: any
  public dateCreation: Date;
  public updatedDate: Date;
  public batimentId: any;


  constructor() {
    this.id = 0;
    this.numeroNiveau = '';
    this.nbrChambre = 0;
    // @ts-ignore
    this.dateCreation = null;
    // @ts-ignore
    this.updatedDate = null;
    this.batimentId = 0;
  }
}
