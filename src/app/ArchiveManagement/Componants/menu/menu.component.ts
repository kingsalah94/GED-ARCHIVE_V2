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

  ngOnInit(): void {
  }

  navigate(url?: string): void {
    this.router.navigate([url]);
  }
}
