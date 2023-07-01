import {Component, OnDestroy, OnInit} from '@angular/core';
import {Batiment} from "../../../models/Batiment";
import {Subscription} from "rxjs";
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
import {ChambreService} from "../../../GlobaleServices/Chambre/chambre.service";
import {Chambre} from "../../../models/Chambre";
import {NiveauBatiment} from "../../../models/NiveauBatiment";
import {NiveauBatimentService} from "../../../GlobaleServices/NiveauBatiment/niveau-batiment.service";

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css']
})
export class ChambreComponent implements OnInit,OnDestroy{

  public chambre!: Chambre[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedChambre: Chambre = new Chambre();
  private currentNumeroChambre!: string;

  editChambre = new Chambre();
  selectedButton: string = '';

  niveauBatiment: NiveauBatiment[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfChambre?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;


  constructor(private chambreService:ChambreService,
              private niveauBatimentService: NiveauBatimentService,
              private responsableService: ResponsableTraitementService,
              private dossierService: DossierService,
              private etagereService:EtagereService,
              private http:HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    //this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getChambres(true);
    this.getNiveau(true);

  }


  onChangePage(pageOfChambre: Array<any>) {
    // update current page of document
    this.pageOfChambre = pageOfChambre;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.chambre = [...this.chambre.sort((a: any, b: any) => {
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


  public getChambres(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.chambreService.getChambres().subscribe((response: Chambre[] ) => {
        //this.structureService.(response);
        this.chambreService.addChambreToLocalCache(response);
        this.chambre = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Chambre(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }
  public getNiveau(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.niveauBatimentService.getNiveaux().subscribe((response: NiveauBatiment[] ) => {
        //this.structureService.(response);
        this.niveauBatimentService.addNiveauxToLocalCache(response);
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


  public onSelectChambre(selectedChambre: Chambre): void {
    this.selectedChambre = selectedChambre;
    this.clickButton('#openChambreInfo');

  }




  saveNewChambre(): void {
    this.clickButton('#new-chambre-save');
  }

  public onAddNewChambre(chambreForm: NgForm):void{
    // @ts-ignore
    const formData = this.chambreService.createChambreFormData(null,chambreForm.value);
    this.subscription.push(this.chambreService.addChambre(formData).subscribe({
      next: (response: Chambre)=>{
        this.clickButton('#new-chambre-close');
        this.getChambres(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroChambre} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateChambre(): void {
    // @ts-ignore
    const formData = this.chambreService.createChambreFormData(this.currentNumeroChambre, this.editChambre);
    this.subscription.push(this.chambreService.updateChambres(formData).subscribe({
      next: (response: Chambre)=>{
        this.clickButton('#edit-chambre-close');
        this.getChambres(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroChambre} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchChambre(keyword: string): void{
    const results: Chambre[] = [];
    // @ts-ignore
    for (const chambre of  this.chambreService.getChambresFromLocalCache()){
      if (chambre.numeroChambre.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(chambre);
      }
    }
    this.chambre = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.chambre = this.chambreService.getChambresFromLocalCache();
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

  public onEditChambre(editChambre: Chambre): void{
    this.editChambre = editChambre;
    this.currentNumeroChambre = editChambre.numeroChambre;
    this.clickButton('#openChambreEdit');
  }





  public onDeleteChambre(numeroChambre: string): void{

    // @ts-ignore
    this.subscription.push(this.chambreService.deleteChambre(numeroChambre).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getChambres(true);
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
