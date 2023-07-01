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
import {NiveauBatiment} from "../../../models/NiveauBatiment";
import {BatimentService} from "../../../GlobaleServices/Batiment/batiment.service";
import {NiveauBatimentService} from "../../../GlobaleServices/NiveauBatiment/niveau-batiment.service";
import {Batiment} from "../../../models/Batiment";

@Component({
  selector: 'app-niveau-batiment',
  templateUrl: './niveau-batiment.component.html',
  styleUrls: ['./niveau-batiment.component.css']
})
export class NiveauBatimentComponent {
  public niveauBatiment!: NiveauBatiment[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedNiveauBatiment: NiveauBatiment = new NiveauBatiment();
  private currentNumeroNiveau!: string;

  editNiveau = new NiveauBatiment();
  selectedButton: string = '';

  etagere: Etagere[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfNiveau?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;
  batiment: Batiment[]= [];


  constructor(private batimentService:BatimentService,
              private niveauService: NiveauBatimentService,
              private responsableService: ResponsableTraitementService,
              private dossierService: DossierService,
              private etagereService:EtagereService,
              private http:HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    //this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getNiveaux(true);
     this.getBatiment(true);

  }


  onChangePage(pageOfNiveau: Array<any>) {
    // update current page of document
    this.pageOfNiveau = pageOfNiveau;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.niveauBatiment = [...this.niveauBatiment.sort((a: any, b: any) => {
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


  public getNiveaux(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.niveauService.getNiveaux().subscribe((response: NiveauBatiment[] ) => {
        //this.structureService.(response);
        this.niveauService.addNiveauxToLocalCache(response);
        this.niveauBatiment = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Niveaux Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }

  public getBatiment(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.batimentService.getBatiment().subscribe((response: Batiment[] ) => {
        //this.structureService.(response);
        this.batimentService.addBatimentToLocalCache(response);
        this.batiment = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Batiment Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }


  public onSelectNiveau(selectedNiveau: NiveauBatiment): void {
    this.selectedNiveauBatiment = selectedNiveau;
    this.clickButton('#openNiveauxInfo');

  }

  saveNewNiveaux(): void {
    this.clickButton('#new-niveaux-save');
  }

  public onAddNewNiveaux(niveauxForm: NgForm):void{
    // @ts-ignore
    const formData = this.niveauService.createNiveauxFormDate(null,niveauxForm.value);
    this.subscription.push(this.niveauService.addNiveaux(formData).subscribe({
      next: (response: NiveauBatiment)=>{
        this.clickButton('#new-niveaux-close');
        this.getNiveaux(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroNiveau} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateNiveaux(): void {
    // @ts-ignore
    const formData = this.niveauService.createNiveauxFormDate(this.currentNumeroNiveau, this.editNiveau);
    this.subscription.push(this.niveauService.updateNiveaux(formData).subscribe({
      next: (response: NiveauBatiment)=>{
        this.clickButton('#edit-niveaux-close');
        this.getNiveaux(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroNiveau} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchNiveaux(keyword: string): void{
    const results: NiveauBatiment[] = [];
    // @ts-ignore
    for (const niveaux of  this.niveauService.getNiveauxFromLocalCache()){
      if (niveaux.numeroNiveau.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(niveaux);
      }
    }
    this.niveauBatiment = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.niveauBatiment = this.niveauService.getNiveauxFromLocalCache();
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

  public onEditNiveaux(editNiveau: NiveauBatiment): void{
    this.editNiveau = editNiveau;
    this.currentNumeroNiveau = editNiveau.numeroNiveau;
    this.clickButton('#openNiveauxEdit');
  }





  public onDeleteNiveaux(numeroNiveau: string): void{

    // @ts-ignore
    this.subscription.push(this.niveauService.delete(numeroNiveau).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getNiveaux(true);
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
