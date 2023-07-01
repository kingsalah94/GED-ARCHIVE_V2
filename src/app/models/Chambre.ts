import {NiveauBatiment} from "./NiveauBatiment";

export class Chambre {
  public id: any
  public numeroChambre: string
  public nbrRayon: any
  public dateCreation: Date;
  public updatedDate: Date;
  public niveauBatimentId?: any


  constructor() {
    this.id = 0;
    this.numeroChambre = '';
    this.nbrRayon = '';
    // @ts-ignore
    this.dateCreation=null;
    // @ts-ignore
    this.updatedDate = null;
    this.niveauBatimentId = 0;
  }
}

