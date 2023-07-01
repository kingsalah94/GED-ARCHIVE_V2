import {Etagere} from "./Etagere";
import {Ranger} from "./Ranger";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import animation = _default.defaults.animation;

export class Boite {
  public id: any;
  public numeroBoite: any;
  public dateCreation:Date;
  public updatedDate:Date;
  public description:string;
  public responsable:string;
  public dateLimiteConservation:Date;
  public emplacement:string;
  public nombreDossiers:any;
  public capacite:any;
  public Empty: boolean;
  public notFull: boolean;
  private _ranger!: Ranger
  rangerId?:any;


  get ranger(): Ranger {
    return this._ranger;
  }

  set ranger(value: Ranger) {
    this._ranger = value;
  }


  constructor() {
    this.id = 0;
    this.numeroBoite = '';
    // @ts-ignore
    this.dateCreation = null;
    // @ts-ignore
    this.updatedDate = null;
    this.description = '';
    this.responsable = '';
    // @ts-ignore
    this.dateLimiteConservation = null;
    this.emplacement = '';
    this.nombreDossiers = 0;
    this.capacite = 0;
    this.Empty = true;
    this.notFull = true;
    this._ranger = this.ranger;
    this.rangerId = 0;
  }
}
