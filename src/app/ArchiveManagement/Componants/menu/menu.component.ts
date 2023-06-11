import {Component, OnInit} from '@angular/core';
import {Menu} from "./Menu";
import {Router} from "@angular/router";
import {Role} from "../../../Enumerations/role.enum.";
import {AuthenticationService} from "../../../GlobaleServices/authentication.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  public menuProperties:Array<Menu> = [{
    /*===1==============================================================================*/
    id:'1',
    titre:'Tableau de bord',
    icon: 'fas fa-chart-line',
    url: '',
    sousMenu: [
      {
        id:'11',
        titre:'Vue d\'ensemble',
        icon: 'fas fa-chart-pie',
        url: 'dashboard/archives/chartData',
      },
      {
        id:'12',
        titre:'Statistiques',
        icon: 'fas fa-chart-bar',
        url: 'statistiques',
      },
    ]},

    {
      id:'3',
      titre:'Archives',
      icon: 'fas fa-boxes',
      url: '',
      sousMenu:[
        {
          id:'31',
          titre:'Administrative & Comptable',
          icon: 'fas fa-box-open',
          url: 'dashboard/archives/administrativeComptable',
        },

        {
          id:'32',
          titre:'Controle de Conformiter',
          icon: 'fas fa-box-open',
          url: 'dashboard/archives/controleDeConformiter',
        },


      ]
    },
    {
      id:'4',
      titre:'Emprunts',
      icon: 'fas fa-retweet',
      url: '',
      sousMenu:[
        {
          id:'31',
          titre:'Gestion des Emprunts',
          icon: 'fas fa-file',
          url: 'dashboard/archives/emprunts',
        },

      ]
    },

    {
      id:'5',
      titre:'Parametrages',
      icon: 'fas fa-cog',
      url: '',
      sousMenu:[
        {
          id:'51',
          titre:'Account Configuration',
          icon: 'fas fa-user-cog',
          url: 'dashboard/user/management',
        },
        {
          id:'52',
          titre:'Archives Configuration',
          icon: 'fas fa-cogs',
          url: 'dashboard/archives/configurations',
        },
      ]
    },

  ];

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }
  public get isManager(): boolean {
    return this.isAdmin  || this.getUserRole() === Role.ARCHIVE_MANAGER;
  }
  public get isAdminOrArchiveManager(): boolean {
    return this.isAdmin || this.isManager;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }
  ngOnInit(): void {
  }

  navigate(url?: string): void {
    this.router.navigate([url]);
  }
}
