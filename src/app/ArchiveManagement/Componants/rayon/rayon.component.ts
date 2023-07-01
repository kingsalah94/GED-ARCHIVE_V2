import { Component } from '@angular/core';
import {Rayon} from "../../../models/Rayon";
import {Subscription} from "rxjs";
import {Chambre} from "../../../models/Chambre";
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
import { NotificationType } from 'src/app/Enumerations/notification-type.enum';
import {NgForm} from "@angular/forms";
import {RayonService} from "../../../GlobaleServices/Rayon/rayon.service";
import { CustomHttpResponse } from 'src/app/Http-Response/Custom-http-response';
import {Role} from "../../../Enumerations/role.enum.";

@Component({
  selector: 'app-rayon',
  templateUrl: './rayon.component.html',
  styleUrls: ['./rayon.component.css']
})
export class RayonComponent {
  public rayon!: Rayon[] ;
  public chambre!: Chambre[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedRayon: Rayon = new Rayon();
  private currentNumeroRayon!: string;

  editRayon = new Rayon();
  selectedButton: string = '';

  cahambre: Chambre[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfRayon?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;


  constructor(private chambreService:ChambreService,
              private structureService: StructureService,
              private rayonService: RayonService,
              private responsableService: ResponsableTraitementService,
              private dossierService: DossierService,
              private etagereService:EtagereService,
              private http:HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    //this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getRayons(true);
     this.getChambres(true);

  }


  onChangePage(pageOfRayon: Array<any>) {
    // update current page of document
    this.pageOfRayon = pageOfRayon;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.rayon = [...this.rayon.sort((a: any, b: any) => {
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

  public getChambres(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.chambreService.getChambres().subscribe((response: Chambre[] ) => {
        //this.structureService.(response);
        this.chambreService.addChambreToLocalCache(response);
        this.chambre = response;
        this.loading= false;
        this.refreshing = false;

      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }


  public onSelectRayon(selectedRayon: Rayon): void {
    this.selectedRayon = selectedRayon;
    this.clickButton('#openRayonInfo');

  }




  saveNewRayon(): void {
    this.clickButton('#new-rayon-save');
  }

  public onAddNewRayon(rayonForm: NgForm):void{
    // @ts-ignore
    const formData = this.rayonService.createRayonFormData(null,rayonForm.value);
    this.subscription.push(this.rayonService.addRayon(formData).subscribe({
      next: (response: Rayon)=>{
        this.clickButton('#new-rayon-close');
        this.getRayons(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroRayon} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateRayon(): void {
    // @ts-ignore
    const formData = this.rayonService.createRayonFormData(this.currentNumeroRayon, this.editRayon);
    this.subscription.push(this.rayonService.updateRayon(formData).subscribe({
      next: (response: Rayon)=>{
        this.clickButton('#edit-rayon-close');
        this.getRayons(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroRayon} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchRayon(keyword: string): void{
    const results: Rayon[] = [];
    // @ts-ignore
    for (const rayon of  this.rayonService.getRayonsFromLocalCache()){
      if (rayon.numeroRayon.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(rayon);
      }
    }
    this.rayon = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.rayon = this.rayonService.getRayonsFromLocalCache();
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

  public onEditRayon(editRayon: Rayon): void{
    this.editRayon = editRayon;
    this.currentNumeroRayon = editRayon.numeroRayon;
    this.clickButton('#openRayonEdit');
  }





  public onDeleteRayon(numeroRayon: string): void{

    // @ts-ignore
    this.subscription.push(this.rayonService.delete(numeroRayon).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getRayons(true);
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
