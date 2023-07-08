

export class Ranger {
  public id:any
  public numeroRanger:string
  public nombreBoite:any
  public numeroEtagere:string
  public dateCreation:Date
  public updatedDate:Date
  public etagereId: any;



  constructor() {
    this.id = 0;
    this.numeroRanger = "";
    this.nombreBoite = 0;
    this.numeroEtagere='';
    // @ts-ignore
    this.dateCreation=null;
    // @ts-ignore
    this.updatedDate=null;
    this.etagereId = 0;
  }
}
