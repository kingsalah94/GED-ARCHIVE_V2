export class Structures {
  public id: number;
  public nomStructure: string;
  public description: string;
  public dateCreation:Date;
  public updateDate:Date;


  constructor() {
    this.id = 0;
    this.nomStructure = '';
    this.description = '';
    // @ts-ignore
    this.dateCreation= null;
    // @ts-ignore
    this.updateDate = null;
  }
}




