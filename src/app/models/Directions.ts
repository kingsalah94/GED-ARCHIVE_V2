import { Structures} from "./Structures";


export class Directions{
  public id: any
  public directionName: string
  public description: string
  public dateCreation:Date;
  public updatedDate:Date;
  structuresId: any


  constructor() {
    this.id = 0;
    this.directionName = '';
    this.description = '';
    // @ts-ignore
    this.dateCreation = null;
    // @ts-ignore
    this.updatedDate = null;
    this.structuresId = 0;
  }
}
