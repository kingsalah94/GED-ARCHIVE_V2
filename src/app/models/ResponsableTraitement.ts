import {Structures} from "./Structures";

export class ResponsableTraitement{
    public id:number;
    public nomRt:string;
    public email:string;
    public dateCreation: Date;
    public updatedDate: Date;
    public structuresId?: any;


  constructor() {
    this.id = 0;
    this.nomRt = "";
    this.email = "";
    // @ts-ignore
    this.dateCreation = null;
    // @ts-ignore
    this.updatedDate = null;
    this.structuresId = 0;
  }
}
