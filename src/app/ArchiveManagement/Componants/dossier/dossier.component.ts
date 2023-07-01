import { Component } from '@angular/core';
import {Chambre} from "../../../models/Chambre";
import {Subscription} from "rxjs";
import {Etagere} from "../../../models/Etagere";
import {ChambreService} from "../../../GlobaleServices/Chambre/chambre.service";
import {StructureService} from "../../../GlobaleServices/Structure/structure.service";
import {
  ResponsableTraitementService
} from "../../../GlobaleServices/ResponsableTraitement/responsable-traitement.service";
import {DossierService} from "../../../GlobaleServices/dossier/dossier.service";
import {EtagereService} from "../../../GlobaleServices/Etagere/etagere.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {NgForm} from "@angular/forms";
import {Role} from "../../../Enumerations/role.enum.";
import {CustomHttpResponse} from "../../../Http-Response/Custom-http-response";
import {Dossier} from "../../../models/dossier";
import {Boite} from "../../../models/Boite";
import {BoiteService} from "../../../GlobaleServices/Boite/boite.service";
import {ResponsableTraitement} from "../../../models/ResponsableTraitement";

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css']
})
export class DossierComponent {
  public dossier!: Dossier[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedDossier: Dossier = new Dossier();
  private currentNomDossier!: string;
  public responsable!: ResponsableTraitement[];

  editdossier = new Dossier();
  selectedButton: string = '';

  boite: Boite[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfDossier?: Array<any>;
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
    this.getDossiers(true);
    // this.getDossier(true);
   this.getBoite(true);

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
  onChangePage(pageOfDossier: Array<any>) {
    // update current page of document
    this.pageOfDossier = pageOfDossier;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.dossier = [...this.dossier.sort((a: any, b: any) => {
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


  public getDossiers(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.dossierService.getDossier().subscribe((response: Dossier[] ) => {
        //this.structureService.(response);
        this.dossierService.addDossierToLocalCache(response);
        this.dossier = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Dossier(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }


  public onSelectDossier(selectedDossier: Dossier): void {
    this.selectedDossier = selectedDossier;
    this.clickButton('#openDossierInfo');

  }




  saveNewDossier(): void {
    this.clickButton('#new-dossier-save');
  }

  public onAddNewDossier(dossierForm: NgForm):void{
    // @ts-ignore
    const formData = this.dossierService.createDossierFormData(null,dossierForm.value);
    this.subscription.push(this.dossierService.addDossier(formData).subscribe({
      next: (response: Dossier)=>{
        this.clickButton('#new-dossier-close');
        this.getDossiers(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.nomDossier} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateDossier(): void {
    // @ts-ignore
    const formData = this.dossierService.createDossierFormData(this.currentNomDossier, this.editdossier);
    this.subscription.push(this.dossierService.updateDossier(formData).subscribe({
      next: (response: Dossier)=>{
        this.clickButton('#edit-dossier-close');
        this.getDossiers(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.nomDossier} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchDossier(keyword: string): void{
    const results: Dossier[] = [];
    // @ts-ignore
    for (const dossier of  this.dossierService.getDossierFromLocalCache()){
      if (dossier.nomDossier.toLowerCase().indexOf(keyword.toLowerCase()) !== -1||dossier.cote.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(dossier);
      }
    }
    this.dossier = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.dossier = this.dossierService.getDossierFromLocalCache();
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

  public onEditDossier(editDossier: Dossier): void{
    this.editdossier = editDossier;
    this.currentNomDossier = editDossier.nomDossier;
    this.clickButton('#openDossierEdit');
  }





  public onDeleteDossier(nomDossier: string): void{

    // @ts-ignore
    this.subscription.push(this.dossierService.deleteDossier(nomDossier).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getDossiers(true);
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



}
