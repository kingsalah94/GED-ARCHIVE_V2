import any = jasmine.any;

export class Documents {
  id?: any;
  intituleDocument?: string;
  dateCreation?: Date;
  numeroDordre?: any;
  typeDocument?: string;
  nombrPage?: any;
  dossierId?: any;


  constructor() {
    this.id = 0;
    this.intituleDocument = '';
    // @ts-ignore
    this.dateCreation = null;
    this.numeroDordre = '';
    this.typeDocument = '';
    this.nombrPage = 0;
    this.dossierId = 0;
  }
}



