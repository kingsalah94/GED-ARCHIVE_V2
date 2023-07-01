import { Component } from '@angular/core';
import {BoiteService} from "../../../GlobaleServices/Boite/boite.service";
import {DocumentsService} from "../../../GlobaleServices/documents/documents.service";
import {
  ResponsableTraitementService
} from "../../../GlobaleServices/ResponsableTraitement/responsable-traitement.service";
import {DossierService} from "../../../GlobaleServices/dossier/dossier.service";
import {EtagereService} from "../../../GlobaleServices/Etagere/etagere.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {Documents} from "../../../models/documents";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {Dossier} from "../../../models/dossier";
import {NgForm} from "@angular/forms";
import {Role} from "../../../Enumerations/role.enum.";
import {CustomHttpResponse} from "../../../Http-Response/Custom-http-response";
import {BehaviorSubject, Subscription} from "rxjs";
import {ResponsableTraitement} from "../../../models/ResponsableTraitement";
import {Boite} from "../../../models/Boite";
import {Etagere} from "../../../models/Etagere";
import {Structures} from "../../../models/Structures";
import {StructureService} from "../../../GlobaleServices/Structure/structure.service";

@Component({
  selector: 'app-archives-configuration',
  templateUrl: './archives-configuration.component.html',
  styleUrls: ['./archives-configuration.component.css']
})
export class ArchivesConfigurationComponent {

  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$= this.titleSubject.asObservable();
  public structure!: Structures[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public fileName: string | undefined;
  public documentPdf: File | undefined;
  public selectedStructure: Structures = new Structures();
  private currentNomStructure!: string;
  currentUser: any;
  currentDocument: any;
  editStructure = new Structures();
  selectedButton: string = '';
  public dossier!: Dossier[];
  public responsable!: ResponsableTraitement[];
  //public responsabletraitement: ResponsableTraitement = new ResponsableTraitement();
  dossiers: Dossier = new Dossier();
  boite!: Boite[];
  boites: Boite = new Boite();
  etagere: Etagere[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfStructures?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;


  constructor(private boiteService:BoiteService,
              private structureService: StructureService,
              private responsableService: ResponsableTraitementService,
              private dossierService: DossierService,
              private etagereService:EtagereService,
              private http:HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    //this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getStructures(true);
   // this.getDossier(true);
    this.getBoite(true)
 this.getResponsable(true);
  }

  public getResponsable(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.responsableService.getResponsable().subscribe((response: ResponsableTraitement[] ) => {

        this.responsable = response;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Responsable de Traitement(s) Charger.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }
  public getBoite(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.boiteService.getBoites().subscribe((response: Boite[] ) => {

        this.boite = response;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Boite(s) Charger.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }
  public changeTitle(title: string): void{
    this.titleSubject.next(title);
  }

  onChangePage(pageOfStructures: Array<any>) {
    // update current page of document
    this.pageOfStructures = pageOfStructures;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.structure = [...this.structure.sort((a: any, b: any) => {
      // sort comparison function
      let result = 0;
      if (a[property] < b[property]) {
        result = -1;
      }
      if (a[property] > b[property]) {
        result = 1;
      }
      return result * this.sortOrder;
    })];
  }

  sortIcon(property: string) {
    if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '☝️' : '👇';
    }
    return '';
  }
  search() {
    this.http.get<any[]>(`/search/${this.keyword}`).subscribe(
      results => this.results = results,
      error => console.error(error)
    );
  }

  public getStructures(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.structureService.getStructure().subscribe((response: Structures[] ) => {
        //this.structureService.(response);
      this.structureService.addStructuresToLocalCache(response);
        this.structure = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Structure(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }


  public onSelectStructure(selectedStructure: Structures): void {
    this.selectedStructure = selectedStructure;
    this.clickButton('#openStructureInfo');

  }




  saveNewStructure(): void {
    this.clickButton('#new-structure-save');
  }

  public onAddNewStructure(structureForm: NgForm):void{
    // @ts-ignore
    const formData = this.structureService.createStructureFormData(null,structureForm.value);
    this.subscription.push(this.structureService.addStructure(formData).subscribe({
      next: (response: Structures)=>{
        this.clickButton('#new-structure-close');
        this.getStructures(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.nomStructure} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateStructure(): void {
    // @ts-ignore
    const formData = this.structureService.createStructureFormData(this.currentNomStructure, this.editStructure);
    this.subscription.push(this.structureService.updateStructure(formData).subscribe({
      next: (response: Structures)=>{
        this.clickButton('#edit-structure-close');
        this.getStructures(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.nomStructure} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchStructures(keyword: string): void{
    const results: Structures[] = [];
    // @ts-ignore
    for (const structure of  this.structureService.getStructuresFromLocalCache()){
      if (structure.nomStructure.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
        structure.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(structure);
      }
    }
    this.structure = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.structure = this.structureService.getStructuresFromLocalCache();
    }
  }
  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }
  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }
  public get isManager(): boolean {
    return this.isAdmin  || this.getUserRole() === Role.ARCHIVE_MANAGER;
  }
  public get isAdminOrArchiveManager(): boolean {
    return this.isAdmin || this.isManager;
  }

  public onEditDocument(editStructure: Structures): void{
    this.editStructure = editStructure;
    this.currentNomStructure = editStructure.nomStructure;
    this.clickButton('#openStructureEdit');
  }





  public onDeleteStructure(nomStructure: string): void{
   /* let conf = confirm("Etes-Vous sur de continuer ???");
    if (!conf) return;*/
    // @ts-ignore
    this.subscription.push(this.structureService.deleteStructure(nomStructure).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getStructures(true);
        },
        error: err => {
          this.sendNotification(NotificationType.ERROR, err.error.messages);
        }
      })
    );
  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message){
      this.notificationService.notify(notificationType,message);
    }else {
      this.notificationService.notify(notificationType,'An error occurred. please try again.');
    }
  }

  private clickButton(buttonId: string): void {
    const button = document.querySelector(buttonId) as HTMLButtonElement;
    button.click();
  }


  /*=====================Partie Gestions des Dossier*/



}
