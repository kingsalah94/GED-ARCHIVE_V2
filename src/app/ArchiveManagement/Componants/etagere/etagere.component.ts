import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {Rayon} from "../../../models/Rayon";
import {RayonService} from "../../../GlobaleServices/Rayon/rayon.service";

@Component({
  selector: 'app-etagere',
  templateUrl: './etagere.component.html',
  styleUrls: ['./etagere.component.css']
})
export class EtagereComponent implements OnInit,OnDestroy{
  public etagere!: Etagere[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedEtagere: Etagere = new Etagere();
  private currentNumeroEtagere!: string;

  editEtagere = new Etagere();
  selectedButton: string = '';

  rayon: Rayon[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfEtagere?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;


  constructor(private rayonService:RayonService,
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
    this.getEtageres(true);
    // this.getDossier(true);

  }


  onChangePage(pageOfEtagere: Array<any>) {
    // update current page of document
    this.pageOfEtagere = pageOfEtagere;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.etagere = [...this.etagere.sort((a: any, b: any) => {
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


  public getEtageres(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.etagereService.getEtagere().subscribe((response: Etagere[] ) => {
        //this.structureService.(response);
        this.etagereService.addEtagereToLocalCache(response);
        this.etagere = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Etagere(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }

  public getRayons(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.rayonService.getRayons().subscribe((response: Rayon[] ) => {
        //this.structureService.(response);
        this.rayonService.addRayonsToLocalCache(response);
        this.rayon = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Rayon(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }


  public onSelectEtagere(selectedEtagere: Etagere): void {
    this.selectedEtagere = selectedEtagere;
    this.clickButton('#openEtagereInfo');

  }




  saveNewEtagere(): void {
    this.clickButton('#new-etagere-save');
  }

  public onAddNewEtagere(etagereForm: NgForm):void{
    // @ts-ignore
    const formData = this.etagereService.createEtagereFormData(null,etagereForm.value);
    this.subscription.push(this.etagereService.addEtagere(formData).subscribe({
      next: (response: Etagere)=>{
        this.clickButton('#new-etagere-close');
        this.getEtageres(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroEtagere} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateEtagere(): void {
    // @ts-ignore
    const formData = this.etagereService.createEtagereFormData(this.currentNumeroEtagere, this.editEtagere);
    this.subscription.push(this.etagereService.updateEtagere(formData).subscribe({
      next: (response: Etagere)=>{
        this.clickButton('#edit-etagere-close');
        this.getEtageres(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroEtagere} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchEtagere(keyword: string): void{
    const results: Etagere[] = [];
    // @ts-ignore
    for (const etagere of  this.etagereService.getEtagereFromLocalCache()){
      if (etagere.numeroEtagere.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(etagere);
      }
    }
    this.etagere = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.etagere = this.etagereService.getEtagereFromLocalCache();
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

  public onEditEtagere(editEtagere: Etagere): void{
    this.editEtagere = editEtagere;
    this.currentNumeroEtagere = editEtagere.numeroEtagere;
    this.clickButton('#openEtagereEdit');
  }





  public onDeleteEtagere(numeroEtagere: string): void{

    // @ts-ignore
    this.subscription.push(this.etagereService.delete(numeroChambre).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getEtageres(true);
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

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
