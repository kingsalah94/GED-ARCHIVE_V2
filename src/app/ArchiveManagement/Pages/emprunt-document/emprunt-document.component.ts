import {Component, OnInit} from '@angular/core';
import {Emprunt} from "../../../models/Emprunt";
import {Subscription} from "rxjs";
import {Dossier} from "../../../models/dossier";
import {ResponsableTraitement} from "../../../models/ResponsableTraitement";
import {Etagere} from "../../../models/Etagere";

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
import {EmpruntService} from "../../../GlobaleServices/emprunt.service";
import {SubSink} from "subsink";
import {UserService} from "../../../GlobaleServices/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-emprunt-document',
  templateUrl: './emprunt-document.component.html',
  styleUrls: ['./emprunt-document.component.css']
})
export class EmpruntDocumentComponent implements OnInit{
  private subs = new SubSink();
  public emprunt!: Emprunt[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public selectedEmprunt: Emprunt = new Emprunt();
  public emprunts: Emprunt = new Emprunt();
  private currentCodeEmprunt!: string;
  currentUser: any;
  currentDocument: any;
  editEmprunt = new Emprunt();
  selectedButton: string = '';
  public dossier!: Dossier[];
  public responsable!: ResponsableTraitement[];

  etagere: Etagere[]=[];
  keyword?: string;
  results?: any[];

  items: any[] = [];
  pageOfEmprunt?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;
  public users!: User[];


  constructor(private empruntService:EmpruntService,
              private structureService: StructureService,
              private responsableService: ResponsableTraitementService,
              private dossierService: DossierService,
              private etagereService:EtagereService,
              private userService:UserService,
              private http:HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    //this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getEmprunts(true);
     this.getDossiers(true);
     this.getUsers(true)


  }


  onChangePage(pageOfEmprunt: Array<any>) {
    // update current page of document
    this.pageOfEmprunt = pageOfEmprunt;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.emprunt = [...this.emprunt.sort((a: any, b: any) => {
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

  public getUsers(shwNotification: Boolean): void{
    this.refreshing = true;
    this.subs.add(
      // @ts-ignore
      this.subscription.push(this.userService.getUsers().subscribe((response: User[] ) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (shwNotification) {
            if (!(response instanceof HttpErrorResponse)) {
              this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
            }
          }
        }, (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        })
      ));
  }

  public getEmprunts(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.empruntService.getEmprunt().subscribe((response: Emprunt[] ) => {
        //this.structureService.(response);
        this.empruntService.addEmpruntToLocalCache(response);
        this.emprunt = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Emprunt(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }
  public getDossiers(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.dossierService.getDossier().subscribe((response: Dossier[] ) => {
        //this.structureService.(response);
        this.dossierService.addDossierToLocalCache(response);
        this.dossier = response;
        this.loading= false;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Dossier(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }

  public onSelectEmprunt(selectedEmprunt: Emprunt): void {
    this.selectedEmprunt = selectedEmprunt;
    this.clickButton('#openEmpruntInfo');

  }




  saveNewEmprunt(): void {
    this.clickButton('#new-emprunt-save');
  }

  public onAddNewEmprunt(empruntForm: NgForm):void{
    // @ts-ignore
    const formData = this.empruntService.createEmpruntFormData(null,empruntForm.value);
    this.subscription.push(this.empruntService.addEmprunt(formData).subscribe({
      next: (response: Emprunt)=>{
        this.clickButton('#new-emprunt-close');
        this.getEmprunts(false);
        //structureForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.codeEmprunt} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateEmprunt(): void {
    // @ts-ignore
    const formData = this.empruntService.createBatimentFormData(this.currentCodeEmprunt, this.editEmprunt);
    this.subscription.push(this.empruntService.updateEmprunt(formData).subscribe({
      next: (response: Emprunt)=>{
        this.clickButton('#edit-emprunt-close');
        this.getEmprunts(false);
        this.sendNotification(NotificationType.SUCCESS, `${response.codeEmprunt} Updated Successfully`);
      },
      error: (e: { message: string; })=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchEmprunt(keyword: string): void{
    const results: Emprunt[] = [];
    // @ts-ignore
    for (const emprunt of  this.empruntService.getEFromLocalCache()){
      if (emprunt.nomBatiment.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(emprunt);
      }
    }
    this.emprunt = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.emprunt = this.empruntService.getBatimentFromLocalCache();
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

  public onEditEmprunt(editEmprunt: Emprunt): void{
    this.editEmprunt = editEmprunt;
    this.currentCodeEmprunt = editEmprunt.codeEmprunt;
    this.clickButton('#openEmpruntEdit');
  }





  public onDeleteEmprunt(nomBatiment: string): void{
    /* let conf = confirm("Etes-Vous sur de continuer ???");
     if (!conf) return;*/
    // @ts-ignore
    this.subscription.push(this.empruntService.delete(nomBatiment).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getEmprunts(true);
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
