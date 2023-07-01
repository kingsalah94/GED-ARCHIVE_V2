import {Component, OnDestroy, OnInit} from '@angular/core';
import {Batiment} from "../../../models/Batiment";
import {Subscription} from "rxjs";
import {Dossier} from "../../../models/dossier";
import {ResponsableTraitement} from "../../../models/ResponsableTraitement";
import {Etagere} from "../../../models/Etagere";
import {BatimentService} from "../../../GlobaleServices/Batiment/batiment.service";
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
import {Boite} from "../../../models/Boite";
import {Ranger} from "../../../models/Ranger";
import {BoiteService} from "../../../GlobaleServices/Boite/boite.service";
import {RangerService} from "../../../GlobaleServices/ranger.service";

@Component({
  selector: 'app-boite',
  templateUrl: './boite.component.html',
  styleUrls: ['./boite.component.css']
})
export class BoiteComponent implements OnInit,OnDestroy{
  public boite!: Boite[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedBoite: Boite = new Boite();
  private currentNumeroBoite!: string;
  currentUser: any;
  currentBoite: any;
  rangers!: Ranger;
  editBoite = new Boite();
  selectedButton: string = '';
  public ranger!: Ranger[] ;
  public responsable!: ResponsableTraitement[];

  etagere: Etagere[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfBoite?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;


  constructor(private boiteService:BoiteService,
              private rangerService: RangerService,
              private responsableService: ResponsableTraitementService,
              private dossierService: DossierService,
              private etagereService:EtagereService,
              private http:HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    //this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getBoites(true);
    // this.getDossier(true);
    this.getResponsable(true);
    this.getRanger(true);

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
  public getRanger(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.rangerService.getRanger().subscribe((response: Ranger[] ) => {
      this.rangerService.addRangerToLocalCache(response);
        this.ranger = response;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Ranger(s) Charger.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }
  onChangePage(pageOfBoite: Array<any>) {
    // update current page of document
    this.pageOfBoite = pageOfBoite;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.boite = [...this.boite.sort((a: any, b: any) => {
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


  public getBoites(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.boiteService.getBoites().subscribe((response: Boite[] ) => {
        //this.structureService.(response);
        this.boiteService.addBoiteToLocalCache(response);
        this.boite = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Boite(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }


  public onSelectBoite(selectedBoite: Boite): void {
    this.selectedBoite = selectedBoite;
    this.clickButton('#openBoiteInfo');

  }




  saveNewBoite(): void {
    this.clickButton('#new-boite-save');
  }

  public onAddNewBoite(boiteForm: NgForm):void{
    // @ts-ignore
    const formData = this.boiteService.createBoiteFormData(null,boiteForm.value);
    this.subscription.push(this.boiteService.addBoite(formData).subscribe({
      next: (response: Boite)=>{
        this.clickButton('#new-boite-close');
        this.getBoites(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroBoite} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateBoite(): void {
    // @ts-ignore
    this.editBoite = this.rangerService.getRangerFromLocalCache()?.forEach(x=> x.id == x._boite);

    // @ts-ignore
    const formData = this.boiteService.createBoiteFormData(this.currentNumeroBoite, this.editBoite);
    this.subscription.push(this.boiteService.updateBoite(formData).subscribe({
      next: (response: Boite)=>{
        this.clickButton('#edit-boite-close');
        this.getBoites(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroBoite} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchBoite(keyword: string): void{
    const results: Boite[] = [];
    // @ts-ignore
    for (const boites of  this.boiteService.getBoiteFromLocalCache()){
      if (boites.numeroBoite.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(boites);
      }
    }
    this.boite = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.boite = this.boiteService.getBoiteFromLocalCache();
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

  public onEditBoite(editBoite: Boite): void{
    this.editBoite = editBoite;
    this.currentNumeroBoite = editBoite.numeroBoite;
    this.clickButton('#openBoiteEdit');
  }





  public onDeleteBoite(numeroBoite: string): void{
    /* let conf = confirm("Etes-Vous sur de continuer ???");
     if (!conf) return;*/
    // @ts-ignore
    this.subscription.push(this.boiteService.deleteBoite(numeroBoite).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getBoites(true);
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
