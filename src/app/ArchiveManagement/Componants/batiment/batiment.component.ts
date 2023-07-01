import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {Dossier} from "../../../models/dossier";
import {ResponsableTraitement} from "../../../models/ResponsableTraitement";
import {Etagere} from "../../../models/Etagere";
import {StructureService} from "../../../GlobaleServices/Structure/structure.service";
import {ResponsableTraitementService} from "../../../GlobaleServices/ResponsableTraitement/responsable-traitement.service";
import {DossierService} from "../../../GlobaleServices/dossier/dossier.service";
import {EtagereService} from "../../../GlobaleServices/Etagere/etagere.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {NgForm} from "@angular/forms";
import {Role} from "../../../Enumerations/role.enum.";
import {CustomHttpResponse} from "../../../Http-Response/Custom-http-response";
import {Batiment} from "../../../models/Batiment";
import {BatimentService} from "../../../GlobaleServices/Batiment/batiment.service";

@Component({
  selector: 'app-batiment',
  templateUrl: './batiment.component.html',
  styleUrls: ['./batiment.component.css']
})
export class BatimentComponent implements OnInit,OnDestroy{

  public batiment!: Batiment[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedBatiment: Batiment = new Batiment();
  private currentNomBatiment!: string;
  currentUser: any;
  currentDocument: any;
  editBatiment = new Batiment();
  selectedButton: string = '';
  public dossier!: Dossier[];
  public responsable!: ResponsableTraitement[];

  etagere: Etagere[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfBatiment?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;


  constructor(private batimentService:BatimentService,
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
    this.getBatiments(true);
    // this.getDossier(true);


  }


  onChangePage(pageOfBatiment: Array<any>) {
    // update current page of document
    this.pageOfBatiment = pageOfBatiment;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.batiment = [...this.batiment.sort((a: any, b: any) => {
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


  public getBatiments(shwNotification: Boolean): void{
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
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Batiment(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }


  public onSelectBatiment(selectedBatiment: Batiment): void {
    this.selectedBatiment = selectedBatiment;
    this.clickButton('#openBatimentInfo');

  }




  saveNewBatiment(): void {
    this.clickButton('#new-batiment-save');
  }

  public onAddNewBatiment(batimentForm: NgForm):void{
    // @ts-ignore
    const formData = this.batimentService.createBatimentFormData(null,batimentForm.value);
    this.subscription.push(this.batimentService.addBatiment(formData).subscribe({
      next: (response: Batiment)=>{
        this.clickButton('#new-batiment-close');
        this.getBatiments(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.nomBatiment} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateBatiment(): void {
    // @ts-ignore
    const formData = this.batimentService.createBatimentFormData(this.currentNomBatiment, this.editBatiment);
    this.subscription.push(this.batimentService.updateBatiment(formData).subscribe({
      next: (response: Batiment)=>{
        this.clickButton('#edit-batiment-close');
        this.getBatiments(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.nomBatiment} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchBatiment(keyword: string): void{
    const results: Batiment[] = [];
    // @ts-ignore
    for (const batiment of  this.batimentService.getBatimentFromLocalCache()){
      if (batiment.nomBatiment.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(batiment);
      }
    }
    this.batiment = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.batiment = this.batimentService.getBatimentFromLocalCache();
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

  public onEditBatiment(editBatiment: Batiment): void{
    this.editBatiment = editBatiment;
    this.currentNomBatiment = editBatiment.nomBatiment;
    this.clickButton('#openBatimentEdit');
  }





  public onDeleteBatiment(nomBatiment: string): void{
    /* let conf = confirm("Etes-Vous sur de continuer ???");
     if (!conf) return;*/
    // @ts-ignore
    this.subscription.push(this.batimentService.delete(nomBatiment).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getBatiments(true);
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
