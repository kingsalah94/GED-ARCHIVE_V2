import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

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
import {ResponsableTraitement} from "../../../models/ResponsableTraitement";
import {Structures} from "../../../models/Structures";

@Component({
  selector: 'app-responsable-traitement',
  templateUrl: './responsable-traitement.component.html',
  styleUrls: ['./responsable-traitement.component.css']
})
export class ResponsableTraitementComponent implements OnInit{

  public responsable!: ResponsableTraitement[] ;
  public responsables: ResponsableTraitement = new ResponsableTraitement();
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedResponsable: ResponsableTraitement = new ResponsableTraitement();
  private currentNomRt!: string;

  editResponsable = new ResponsableTraitement();
  selectedButton: string = '';

  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfResponsable?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;
  public structure: Structures[]=[];


  constructor(private structureService: StructureService,
              private responsableService: ResponsableTraitementService,
              private dossierService: DossierService,
              private etagereService:EtagereService,
              private http:HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    //this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getResponsable(true);
    this.getStructures(true);

  }


  onChangePage(pageOfResponsable: Array<any>) {
    // update current page of document
    this.pageOfResponsable = pageOfResponsable;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.responsable = [...this.responsable.sort((a: any, b: any) => {
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


  public getResponsable(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.responsableService.getResponsable().subscribe((response: ResponsableTraitement[] ) => {
        //this.structureService.(response);
        this.responsableService.addResponsableTraitementToLocalCache(response);
        this.responsable = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Responsable(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
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


  public onSelectResponsable(selectedResponsable: ResponsableTraitement): void {
    this.selectedResponsable = selectedResponsable;
    this.clickButton('#openResponsableInfo');

  }




  saveNewResponsable(): void {
    this.clickButton('#new-responsable-save');
  }

  public onAddNewResponsable(responsableForm: NgForm):void{
    // @ts-ignore
    const formData = this.responsableService.createResponsableTraitementFormData(null,responsableForm.value);
    this.subscription.push(this.responsableService.addResponsable(formData).subscribe({
      next: (response: ResponsableTraitement)=>{
        this.clickButton('#new-responsable-close');
        this.getResponsable(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.nomRt} Ajouter Avec Succer`)
      },
      error: (e: { message: string; })=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateResponsable(): void {
    // @ts-ignore
    const formData = this.responsableService.createResponsableTraitementFormData(this.currentNomRt, this.editResponsable);
    this.subscription.push(this.responsableService.updateResponsable(formData).subscribe({
      next: (response: ResponsableTraitement)=>{
        this.clickButton('#edit-responsable-close');
        this.getResponsable(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.nomRt} Updated Successfully`);
      },
      error: (e: { message: string; })=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchResponsable(keyword: string): void{
    const results: ResponsableTraitement[] = [];
    // @ts-ignore
    for (const responsable of  this.responsableService.getResponsableTraitementFromLocalCache()){
      if (responsable.nomRt.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(responsable);
      }
    }
    this.responsable = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.responsable = this.responsableService.getResponsableFromLocalCache();
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

  public onEditResponsable(editResponsable: ResponsableTraitement): void{
    this.editResponsable = editResponsable;
    this.currentNomRt = editResponsable.nomRt;
    this.clickButton('#openResponsableEdit');
  }





  public onDeleteResponsable(nomRt: string): void{
    // @ts-ignore
    this.subscription.push(this.responsableService.delete(nomRt).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getResponsable(true);
        },
        error: (err: { error: { messages: string; }; }) => {
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

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
