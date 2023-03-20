import {Component, OnInit} from '@angular/core';
import {Menu} from "./Menu";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  constructor(
    private router: Router
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
        url: 'Vue',
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
      titre:'Creation',
      icon: 'fas fa-plus',
      url: '',
      sousMenu:[
        {
          id:'31',
          titre:'Boite',
          icon: 'bis bi-boxes',
          url: 'dashboard/nouvelBoite',
        },

        {
          id:'32',
          titre:'Dossier',
          icon: 'fas fa-folder-plus',
          url: 'dashboard/saveDossier',
        },

        {
          id:'33',
          titre:'Document',
          icon: 'bis bi-file-plus',
          url: 'dashboard/nouveauDocument',
        },

      ]
    },
    {
      id:'4',
      titre:'Consultation',
      icon: 'fas fa-eye',
      url: '',
      sousMenu:[
        {
          id:'31',
          titre:'Boite',
          icon: 'bis bi-boxes',
          url: 'dashboard/Boite',
        },
        {
          id:'31',
          titre:'Dossier',
          icon: 'fas fa-folder-open',
          url: '/dashboard/listDossier',
        },

        {
          id:'32',
          titre:'Documents',
          icon: 'fas fa-file',
          url: '/dashboard/gestionDocument',
        },
      ]
    },
    {
      id:'5',
      titre:'Parametrages',
      icon: 'fas fa-cogs',
      url: '',
      sousMenu:[
        {
          id:'51',
          titre:'Configuration',
          icon: 'fas fa-cog',
          url: 'dashboard/user/management',
        },
        {
          id:'52',
          titre:'Consultation',
          icon: 'fas fa-eye',
          url: 'dashboard/gest-batiment',
        },
      ]
    },

  ];

  ngOnInit(): void {
  }

  navigate(url?: string): void {
    this.router.navigate([url]);
  }
}
