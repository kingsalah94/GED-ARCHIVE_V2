import {Boite} from "./Boite";
import {ResponsableTraitement} from "./ResponsableTraitement";

export class Dossier {
  public id: any
  public nomDossier: string
  public dateDeCreation: string
  public cote: string
  public dateExtreme: string
  public typeDossier: string
  public etatDossier: string
  public updatedDate:Date
  public description:string
  public responsable:string
  public dateLimiteConservation:Date
  public boiteId: any
  public responsableTraitementId?: any


  constructor() {
    this.id = 0;
    this.nomDossier = '';
    // @ts-ignore
    this.dateDeCreation = null;
    this.cote = '';
    this.dateExtreme = '';
    this.typeDossier = '';
    this.etatDossier = '';
    // @ts-ignore
    this.updatedDate = null;
    this.description = '';
    this.responsable = '';
    // @ts-ignore
    this.dateLimiteConservation = null;
    this.boiteId = 0;
    this.responsableTraitementId = 0;
  }
}

