

export class Documents {
  public id: any;
  public intituleDocument: string;
  public documentId: string;
  public dateCreation: Date;
  public numeroDordre: any;
  public documentUrl: string;
  public typeDocument: string;
  public  nomDossier:string;
  public  coteDossier:string;
  public  numeroBoite:string;
  public  numeroRanger:string;
  public  numeroEtagere:string;
  public  numeroRayon:string;
  public  numeroChambre:string;
  public  numeroNiveau:string;
  public  nomBatiment:string;
  public nombrPage: any;
  public dossierId: any;


  constructor() {
    this.id = 0;
    this.intituleDocument = '';
    this.documentId='';
    // @ts-ignore
    this.dateCreation = null;
    this.documentUrl= '';
    this.numeroDordre = '';
    this.typeDocument = '';
    this.nombrPage = 0;
    this.dossierId = 0;
    this.nomDossier='';
    this.coteDossier='';
    this.numeroBoite='';
    this.numeroRanger='';
    this.numeroEtagere='';
    this.numeroRayon='';
    this.numeroChambre='';
    this.numeroNiveau='';
    this.nomBatiment='';

  }
}



