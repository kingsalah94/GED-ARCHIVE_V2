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
      id:'2',
      titre:'Archives',
      icon: 'fas fa-boxes',
      url: '',
      sousMenu:[
        {
          id:'21',
          titre:'Administrative & Comptable',
          icon: 'fas fa-box-open',
          url: 'dashboard/archives/administrativeComptable',
        },

        {
          id:'22',
          titre:'Controle de Conformiter',
          icon: 'fas fa-box-open',
          url: 'dashboard/archives/controleDeConformiter',
        },


      ]
    },
    {
      id:'3',
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
      id:'4',
      titre:'Parametrages',
      icon: 'fas fa-cog',
      url: '',
      sousMenu:[
        {
          id:'41',
          titre:'Account Configuration',
          icon: 'fas fa-user-cog',
          url: 'dashboard/user/management',
        },
        {
          id:'42',
          titre:'Archives Configuration',
          icon: 'fas fa-cogs',
          url: 'dashboard/archives/configurations',
        },
      ]
    },

  ];

  isMenuVisible(menu: Menu): boolean {
    if (menu.id === '1') {
      // Vérification spécifique pour le menu 'Tableau de bord'
      return true; // Afficher toujours le menu 'Tableau de bord'
    } else if (menu.id === '2') {
      // Vérification spécifique pour le menu 'Archives'
      return this.isAdminOrArchiveManager; // Afficher si l'utilisateur est administrateur ou gestionnaire d'archives
    } else if (menu.id === '3') {
      // Vérification spécifique pour le menu 'Emprunts'
      return this.isAdmin; // Afficher si l'utilisateur est administrateur
    } else if (menu.id === '4') {
      // Vérification spécifique pour le menu 'Paramétrages'
      return this.isAdmin; // Afficher si l'utilisateur est administrateur
    } else {
      return false; // Masquer tous les autres menus
    }
  }


  isSubMenuVisible(sousMenu: Menu): boolean {
    // Ajoutez les vérifications spécifiques pour chaque sous-menu en fonction des rôles de l'utilisateur
    if (sousMenu.id === '11') {
      // Vérification spécifique pour le sous-menu 'Vue d'ensemble' du menu 'Tableau de bord'
      return true; // Afficher toujours le sous-menu 'Vue d'ensemble'
    } else if (sousMenu.id === '12') {
      // Vérification spécifique pour le sous-menu 'Statistiques' du menu 'Tableau de bord'
      return this.isAdminOrArchiveManager; // Afficher si l'utilisateur est administrateur ou gestionnaire d'archives
    } else if (sousMenu.id === '21') {
      // Vérification spécifique pour le sous-menu 'Administrative & Comptable' du menu 'Archives'
      return this.isAdminOrArchiveManager; // Afficher si l'utilisateur est administrateur ou gestionnaire d'archives
    } else if (sousMenu.id === '22') {
      // Vérification spécifique pour le sous-menu 'Controle de Conformiter' du menu 'Archives'
      return this.isAdminOrArchiveManager; // Afficher si l'utilisateur est administrateur ou gestionnaire d'archives
    } else if (sousMenu.id === '31') {
      // Vérification spécifique pour le sous-menu 'Gestion des Emprunts' du menu 'Emprunts'
      return this.isAdmin; // Afficher si l'utilisateur est administrateur
    } else if (sousMenu.id === '41') {
      // Vérification spécifique pour le sous-menu 'Account Configuration' du menu 'Parametrages'
      return this.isAdmin; // Afficher si l'utilisateur est administrateur
    } else if (sousMenu.id === '42') {
      // Vérification spécifique pour le sous-menu 'Archives Configuration' du menu 'Parametrages'
      return this.isAdmin; // Afficher si l'utilisateur est administrateur
    } else {
      return false; // Masquer tous les autres sous-menus
    }
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

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }
  ngOnInit(): void {
  }

  navigate(url?: string): void {
    this.router.navigate([url]);
  }
}
