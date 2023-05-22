import {Boite} from "./Boite";
import {ResponsableTraitement} from "./ResponsableTraitement";

export class Dossier {
  id?: any
  nomDossier?: string
  dateDeCreation?: string
  cote?: string
  dateExtreme?: string
  typeDossier?: string
  etatDossier?: string
  description?:string
  responsable?:string
  dateLimiteConservation?:Date
  boiteDTO?: Boite
  responsableTraitementDTO?: ResponsableTraitement
}

