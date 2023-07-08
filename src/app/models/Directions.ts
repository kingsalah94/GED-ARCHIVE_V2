import { Structures} from "./Structures";


export class Directions{
  public id: any
  public directionName: string
  public description: string
  public dateCreation:Date;
  public updatedDate:Date;
  structureId: any


  constructor() {
    this.id = 0;
    this.directionName = '';
    this.description = '';
    // @ts-ignore
    this.dateCreation = null;
    // @ts-ignore
    this.updatedDate = null;
    this.structureId = 0;
  }
}
