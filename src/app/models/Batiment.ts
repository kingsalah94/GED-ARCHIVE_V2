export class Batiment{
  public id: any;
  public nomBatiment: string;
  public nbr_Niveau: any;
  public dateCreation: Date;
  public updatedDate: Date;


  constructor() {
    this.id = 0;
    this.nomBatiment = '';
    this.nbr_Niveau = '';
    // @ts-ignore
    this.dateCreation = null;
    // @ts-ignore
    this.updatedDate = null;
  }
}
