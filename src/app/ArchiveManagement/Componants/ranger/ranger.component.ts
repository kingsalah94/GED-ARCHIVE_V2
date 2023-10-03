import {Component, OnInit} from '@angular/core';
import {Ranger} from "../../../models/Ranger";
import {Subscription} from "rxjs";
import {Rayon} from "../../../models/Rayon";
import {RayonService} from "../../../GlobaleServices/Rayon/rayon.service";
import {StructureService} from "../../../GlobaleServices/Structure/structure.service";
import {
  ResponsableTraitementService
} from "../../../GlobaleServices/ResponsableTraitement/responsable-traitement.service";
import {DossierService} from "../../../GlobaleServices/dossier/dossier.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../../../GlobaleServices/notification.service";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";
import {NotificationType} from "../../../Enumerations/notification-type.enum";
import {NgForm} from "@angular/forms";
import {Role} from "../../../Enumerations/role.enum.";
import {CustomHttpResponse} from "../../../Http-Response/Custom-http-response";
import {EtagereService} from "../../../GlobaleServices/Etagere/etagere.service";
import {RangerService} from "../../../GlobaleServices/ranger.service";
import {Etagere} from "../../../models/Etagere";

@Component({
  selector: 'app-ranger',
  templateUrl: './ranger.component.html',
  styleUrls: ['./ranger.component.css']
})
export class RangerComponent implements OnInit{
  public ranger!: Ranger[] ;
  public rangers: Ranger = new Ranger();
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedRanger: Ranger = new Ranger();
  private currentNumeroRanger!: string;

  editRanger = new Ranger();
  selectedButton: string = '';

  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfRanger?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;
  public etagere: Etagere[]=[];


  constructor(private rangerService:RangerService,
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
    this.getRangers(true);
     this.getEtageres(true);

  }


  onChangePage(pageOfRanger: Array<any>) {
    // update current page of document
    this.pageOfRanger = pageOfRanger;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.ranger = [...this.ranger.sort((a: any, b: any) => {
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


  public getRangers(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.rangerService.getRanger().subscribe((response: Ranger[] ) => {
        //this.structureService.(response);
        this.rangerService.addRangerToLocalCache(response);
        this.ranger = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Ranger(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
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


  public onSelectRanger(selectedRanger: Ranger): void {
    this.selectedRanger = selectedRanger;
    this.clickButton('#openRangerInfo');

  }




  saveNewRanger(): void {
    this.clickButton('#new-ranger-save');
  }

  public onAddNewRanger(rangerForm: NgForm):void{
    // @ts-ignore
    const formData = this.rangerService.createRangerFormData(null,rangerForm.value);
    this.subscription.push(this.rangerService.addRanger(formData).subscribe({
      next: (response: Ranger)=>{
        this.clickButton('#new-ranger-close');
        this.getRangers(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroRanger} Ajouter Avec Succer`)
      },
      error: (e: { message: string; })=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateRanger(): void {
    // @ts-ignore
    const formData = this.rangerService.createRangerFormData(this.currentNumeroRanger, this.editRanger);
    this.subscription.push(this.rangerService.updateRanger(formData).subscribe({
      next: (response: Ranger)=>{
        this.clickButton('#edit-ranger-close');
        this.getRangers(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroRanger} Updated Successfully`);
      },
      error: (e: { message: string; })=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchRanger(keyword: string): void{
    const results: Ranger[] = [];
    // @ts-ignore
    for (const ranger of  this.rangerService.getRangerFromLocalCache()){
      if (ranger.numeroRanger.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(ranger);
      }
    }
    this.ranger = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.ranger = this.rangerService.getRangerFromLocalCache();
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

  public onEditRanger(editRanger: Ranger): void{
    this.editRanger = editRanger;
    this.currentNumeroRanger = editRanger.numeroRanger;
    this.clickButton('#openRangerEdit');
  }





  public onDeleteRanger(numeroRanger: string): void{

    // @ts-ignore
    this.subscription.push(this.rangerService.delete(numeroChambre).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getRangers(true);
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
