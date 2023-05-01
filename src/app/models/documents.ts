

export class Documents {
  public id: any;
  public intituleDocument: string;
  public dateCreation: Date;
  public numeroDordre: any;
  public typeDocument: string;
  public nombrPage: any;
  public dossierId: any;


  constructor() {
    this.id = 0;
    this.intituleDocument = '';
    // @ts-ignore
    this.dateCreation = null;
    this.numeroDordre = '';
    this.typeDocument = '';
    this.nombrPage = 0;
    this.dossierId = 0;
  }
}



