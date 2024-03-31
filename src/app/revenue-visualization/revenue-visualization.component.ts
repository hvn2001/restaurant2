import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// revenue-visualization.component.ts
@Component({
  selector: 'app-revenue-visualization',
  templateUrl: './revenue-visualization.component.html',
  styleUrls: ['./revenue-visualization.component.css']
})
export class RevenueVisualizationComponent {
  lineChartData: any[] = [];
  lineChartLabels: any[] = [];
  lineChartOptions: any = {
    responsive: true
  };
  lineChartColors: any[] = [];
  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private http: HttpClient) { }

  fetchRevenue(type: string) {
    const fromDate = (document.getElementById('from') as HTMLInputElement).value;
    const toDate = (document.getElementById('to') as HTMLInputElement).value;
    const apiUrl = `http://127.0.0.1:5000/api/${type}-revenue?from=${fromDate}&to=${toDate}`;

    this.http.get<any>(apiUrl).subscribe(
      data => {
        const formattedDates = Object.keys(data).map(date => {
          const [year, month, day] = date.split('-');
          if (type == 'daily') {
            return `${month}/${day}/${year}`;
          } else if (type == 'monthly') {
            return `${month}/${year}`;
          }
          return `${month}/${day}/${year}`;
        });

        this.lineChartData = [{ 
          data: Object.values(data), 
          label: 'Revenue',
          backgroundColor: ["red", "green", "blue"],
          hoverBackgroundColor: ["darkred", "darkgreen", "darkblue"],
        }];
        this.lineChartLabels = formattedDates
      },
      error => {
        console.log('Error fetching revenue data:', error);
      }
    );
  }
}
