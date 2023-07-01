import {Etagere} from "./Etagere";
import {Boite} from "./Boite";

export class Ranger {
  public id:any
 public numeroRanger:string
  public etagereId: any;
  public _boite!: Boite[]


  constructor() {
    this.id = 0;
    this.numeroRanger = "";
    this.etagereId = 0;
  }
}
