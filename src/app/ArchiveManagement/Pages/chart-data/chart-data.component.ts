import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Chart} from "chart.js";
import {ChartData} from "../../../models/ChartData";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.css']
})
export class ChartDataComponent implements OnInit{
  data:any;
  private host = environment.backendHost;

  constructor(private http:HttpClient) {
  }
  ngOnInit(): void {

  }
  chartOptions = {
    title: {
      text: "Archives Chart Data"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }]
  };


}
