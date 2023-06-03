import { Component } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {Documents} from "../../../models/documents";
import {Dossier} from "../../../models/dossier";
import {ResponsableTraitement} from "../../../models/ResponsableTraitement";
import {Boite} from "../../../models/Boite";
import {Etagere} from "../../../models/Etagere";
import {BoiteService} from "../../../GlobaleServices/Boite/boite.service";
import {DocumentsService} from "../../../GlobaleServices/documents/documents.service";
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

@Component({
  selector: 'app-controle-conformiter',
  templateUrl: './controle-conformiter.component.html',
  styleUrls: ['./controle-conformiter.component.css']
})
export class ControleConformiterComponent {
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$= this.titleSubject.asObservable();
  public document!: Documents[] ;
  public refreshing: boolean | undefined;
  private subscription : Subscription[] = [];
  public fileName: string | undefined;
  public documentPdf: File | undefined;
  public selectedDocument: Documents = new Documents();
  private currentIntituleDocument!: string;
  currentUser: any;
  currentDocument: any;
  editDocument = new Documents();
  selectedButton: string = '';
  public dossier!: Dossier[];
  public responsable!: ResponsableTraitement[];
  //public responsabletraitement: ResponsableTraitement = new ResponsableTraitement();
  dossiers: Dossier = new Dossier();
  boite!: Boite[];
  boites: Boite = new Boite();
  etagere: Etagere[]=[];
  keyword?: string;
  results?: any[];


  constructor(private boiteService:BoiteService,
              private documentService: DocumentsService,
              private responsableService: ResponsableTraitementService,
              private dossierService: DossierService,
              private etagereService:EtagereService,
              private http:HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.getDocuments(true);
    this.getDossier(true);
    this.boiteService.getBoite()
      .subscribe(response =>this.boite=response);
    this.responsableService.getResponsable()
      .subscribe(response =>this.responsable=response);
    this.etagereService.getEtagere()
      .subscribe(response =>this.etagere=response)
  }
  public changeTitle(title: string): void{
    this.titleSubject.next(title);
  }

  showContent(id: string) {
    let content = document.getElementById(id + 'Content');
    if (content) {
      content.style.display = 'block';
    }
  }

  search() {
    this.http.get<any[]>(`/search/${this.keyword}`).subscribe(
      results => this.results = results,
      error => console.error(error)
    );
  }

  public getDocuments(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.documentService.getDocuments().subscribe((response: Documents[] ) => {
        this.documentService.addDocumentsToLocalCache(response);
        this.document = response;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} document(s) Charger avec succer.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }
  public getDossier(shwNotification: Boolean): void{
    this.refreshing = true;
    // @ts-ignore
    this.subscription.push(this.documentService.getDossier().subscribe((response: Dossier[] ) => {

        this.dossier = response;
        this.refreshing = false;
        if (shwNotification) {
          if (!(response instanceof HttpErrorResponse)) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} dossier(s) Charger.`);
          }
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      })
    );
  }

  public onSelectDocument(selectedDocument: Documents): void {
    this.selectedDocument = selectedDocument;
    this.clickButton('#openDocumentInfo');

  }

  public onDocumentPdfChange(fileName: string, documentPdf: File): void{
    this.fileName = fileName;
    this.documentPdf = documentPdf;

  }

  handleDocumentPdfChange(event: any): void {
    const fileName: string = event.target.files[0].name;
    const documentPdf: File = event.target.files[0];
    this.onDocumentPdfChange(fileName, documentPdf);
    console.log(fileName, documentPdf,)
  }

  saveNewDocument(): void {
    this.clickButton('#new-document-save');
  }

  public onAddNewDocument(documentForm: NgForm):void{
    // @ts-ignore
    const formData = this.documentService.createDocumentFormData(null, documentForm.value, this.documentPdf);
    this.subscription.push(this.documentService.addDocument(formData).subscribe({
      next: (response: Documents)=>{
        this.clickButton('#new-document-close');
        this.getDocuments(false);
        // @ts-ignore
        this.fileName = "";
        // @ts-ignore
        this.documentPdf = "";
        documentForm.reset();
        this.sendNotification(NotificationType.SUCCESS, `${response.intituleDocument} ${response.numeroDordre} Ajouter Avec Succer`)
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public onUpdateDocument(): void {
    // @ts-ignore
    const formData = this.documentService.createDocumentFormData(this.currentIntituleDocument, this.editDocument, this.documentPdf);
    this.subscription.push(this.documentService.updateDocument(formData).subscribe({
      next: (response: Documents)=>{
        this.clickButton('#edit-document-close');
        this.getDocuments(false);
        // @ts-ignore
        this.fileName = "";
        // @ts-ignore
        this.documentPdf = "";
        this.sendNotification(NotificationType.SUCCESS, `${response.intituleDocument} ${response.numeroDordre} A ete mis a jours correctement`);
      },
      error: (e)=> {
        console.error(e);
        this.sendNotification(NotificationType.ERROR, e.message);
      }
    }));
  }

  public searchDocuments(keyword: string): void{
    const results: Documents[] = [];
    // @ts-ignore
    for (const documen of  this.documentService.getDocumentsFromLocalCache()){
      if (documen.intituleDocument.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
        documen.numeroDordre.toLowerCase().indexOf(keyword.toLowerCase()) !== -1||
        documen.typeDocument.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
        documen.nombrPage.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        results.push(documen);
      }
    }
    this.document = results;
    if (results.length === 0 || !keyword){
      // @ts-ignore
      this.document = this.documentService.getDocumentsFromLocalCache();
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

  public onEditDocument(editDocument: Documents): void{
    this.editDocument = editDocument;
    this.currentIntituleDocument = editDocument.intituleDocument;
    this.clickButton('#openDocumentEdit');
  }





  public onDeletedocument(intituleDocument: string): void{
    let conf = confirm("Etes-Vous sur de continuer ???");
    if (!conf) return;
    // @ts-ignore
    this.subscription.push(this.documentService.deletedocument(intituleDocument).subscribe({
        next: (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getDocuments(true);
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


  /*=====================Partie Gestions des Dossier*/


  handleSaveDossier() {
    this.dossierService.create(this.dossiers).subscribe({
      next :data=>{
        alert("Le Dossier est Creer Avec Succer");
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  /*==================Partie Gest Boite==============*/

  handleSaveBoite(){
    this.boiteService.create(this.boites).subscribe({
      next : data=>{
        alert("Boite Creer Avec Succer");
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }
}
