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
import {Directions} from "../../../models/Directions";
import {Structures} from "../../../models/Structures";
import {DirectionService} from "../../../GlobaleServices/Direction/direction.service";

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit,OnDestroy{
  public direction!: Directions[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedDirection: Directions = new Directions();
  private currentDirectionName!: string;

  editDirection = new Directions();
  selectedButton: string = '';

  structure: Structures[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfDirection?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;


  constructor(private directionService:DirectionService,
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
    this.getDirections(true);
     this.getStructure(true);

  }


  onChangePage(pageOfDirection: Array<any>) {
    // update current page of document
    this.pageOfDirection = pageOfDirection;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.direction = [...this.direction.sort((a: any, b: any) => {
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
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Direction(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  } public getStructure(shwNotification: Boolean): void{
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
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Direction(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }


  public onSelectDirection(selectedDirection: Directions): void {
    this.selectedDirection = selectedDirection;
    this.clickButton('#openDirectionInfo');

  }




  saveNewDirection(): void {
    this.clickButton('#new-direction-save');
  }

  public onAddNewDirection(directionForm: NgForm):void{
    // @ts-ignore
    const formData = this.directionService.createDirectionFormData(null,directionForm.value);
    this.subscription.push(this.directionService.addDirection(formData).subscribe({
      next: (response: Directions)=>{
        this.clickButton('#new-direction-close');
        this.getDirections(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.directionName} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateDirection(): void {
    // @ts-ignore
    const formData = this.directionService.createDirectionFormData(this.currentDirectionName, this.editDirection);
    this.subscription.push(this.directionService.updateDirection(formData).subscribe({
      next: (response: Directions)=>{
        this.clickButton('#edit-direction-close');
        this.getDirections(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.directionName} Updated Successfully`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchDirection(keyword: string): void{
    const results: Directions[] = [];
    // @ts-ignore
    for (const directions of  this.directionService.getDirectionFromLocalCache()){
      if (directions.directionName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(directions);
      }
    }
    this.direction = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.direction = this.directionService.getDirectionFromLocalCache();
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

  public onEditDirection(editDirection: Directions): void{
    this.editDirection = editDirection;
    this.currentDirectionName = editDirection.directionName;
    this.clickButton('#openDirectionEdit');
  }





  public onDeleteDirection(directionName: string): void{

    // @ts-ignore
    this.subscription.push(this.directionService.deleteDirection(directionName).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getDirections(true);
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
