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
import {Divisions} from "../../../models/Divisions";
import {DivisionService} from "../../../GlobaleServices/Division/division.service";
import {DirectionService} from "../../../GlobaleServices/Direction/direction.service";
import {Directions} from "../../../models/Directions";
import {ResponsableTraitement} from "../../../models/ResponsableTraitement";

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent {
  public division!: Divisions[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedDivision: Divisions = new Divisions();
  private currentDivisionName!: string;

  editDivision = new Divisions();
  selectedButton: string = '';

  public direction!: Directions[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfDivision?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;


  constructor(private divisionService:DivisionService,
              private directionService: DirectionService,
              private responsableService: ResponsableTraitementService,
              private dossierService: DossierService,
              private etagereService:EtagereService,
              private http:HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    //this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getDivisions(true);
    this.getDirections(true);
    // this.getDossier(true);

  }


  onChangePage(pageOfDivision: Array<any>) {
    // update current page of document
    this.pageOfDivision = pageOfDivision;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.division = [...this.division.sort((a: any, b: any) => {
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


  public getDivisions(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.divisionService.getDivisions().subscribe((response: Divisions[] ) => {
        //this.structureService.(response);
        this.divisionService.addDivisionToLocalCache(response);
        this.division = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Division(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }

  public getDirections(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.directionService.getDirections().subscribe((response: Directions[] ) => {
        //this.structureService.(response);
        this.directionService.addDirectionToLocalCache(response);
        this.direction = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Division(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }

  public onSelectDivision(selectedDivision: Divisions): void {
    this.selectedDivision = selectedDivision;
    this.clickButton('#openDivisionInfo');

  }




  saveNewDivision(): void {
    this.clickButton('#new-division-save');
  }

  public onAddNewDivision(divisionForm: NgForm):void{
    // @ts-ignore
    const formData = this.divisionService.createDivisionFormData(null,divisionForm.value);
    this.subscription.push(this.divisionService.addDivision(formData).subscribe({
      next: (response: Divisions)=>{
        this.clickButton('#new-division-close');
        this.getDivisions(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.divisionName} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateDivisions(): void {
    // @ts-ignore
    const formData = this.divisionService.createDivisionFormData(this.currentDivisionName, this.editDivision);
    this.subscription.push(this.divisionService.updateDivisions(formData).subscribe({
      next: (response: Chambre)=>{
        this.clickButton('#edit-division-close');
        this.getDivisions(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.numeroChambre} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchDivision(keyword: string): void{
    const results: Divisions[] = [];
    // @ts-ignore
    for (const divisions of  this.divisionService.getDivisionFromLocalCache()){
      if (divisions.divisionName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(divisions);
      }
    }
    this.division = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.division = this.divisionService.getDivisionFromLocalCache();
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

  public onEditDivision(editDivision: Divisions): void{
    this.editDivision = editDivision;
    this.currentDivisionName = editDivision.divisionName;
    this.clickButton('#openDivisionEdit');
  }





  public onDeleteDivision(divisionName: string): void{

    // @ts-ignore
    this.subscription.push(this.divisionService.delete(divisionName).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getDivisions(true);
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
