import {Dossier} from "./dossier";
import {User} from "./user";

export class Emprunt {
  id?:number
  dateEmprunt?:Date
  dateRetour?:Date
  dossierDTO?:Dossier
  utilisateur?:User
}
