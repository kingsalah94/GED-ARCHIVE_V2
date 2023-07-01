import {Structures} from "./Structures";

export class ResponsableTraitement{
    public id:number;
    public nomRt:string;
    public email:string;
    public structuresId?: any;


  constructor() {
    this.id = 0;
    this.nomRt = "";
    this.email = "";
    this.structuresId = 0;
  }
}
