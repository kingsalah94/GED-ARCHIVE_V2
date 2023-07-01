import {Directions} from "./Directions";

export class Divisions {
  public id: any;
  public description: string;
  public divisionName: string;
  public dateCreation: Date;
  public updatedDate: Date;
  public directionId: any;


  constructor() {
    this.id = 0;
    this.description = '';
    this.divisionName = '';
    // @ts-ignore
    this.dateCreation = null;
    // @ts-ignore
    this.updatedDate = null;
    this.directionId = 0;
  }
}
