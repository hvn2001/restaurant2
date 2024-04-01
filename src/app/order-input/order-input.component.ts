import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Import your ApiService
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
// declare var Chart: any;

@Component({
  selector: 'app-order-input',
  templateUrl: './order-input.component.html',
  styleUrls: ['./order-input.component.css'],
})
export class OrderInputComponent {

  numberItem: number = 3;
  orderNumber: number = 16114;
  chart1: any;
  chart2: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchOrder('http://127.0.0.1:5000/api/items/' + this.numberItem, 'pieChart1');
    this.fetchOrder('http://127.0.0.1:5000/api/orders/' + this.orderNumber, 'pieChart2');
  }

  fetchOrder(apiUrl: string, canvasId: string) {
    if (this.orderNumber) {
      // const apiUrl = `http://127.0.0.1:5000/api/orders/${this.orderNumber}`;
      this.apiService.getOrders(apiUrl).subscribe(
        (data: any) => {
          // Handle the fetched data (e.g., display it or pass it to another component)
          // console.log('Fetched order data:', data);
          const labels = data.map((item: any) => item[0]);
          const values = data.map((item: any) => parseFloat(item[1]));
          // console.log('labels', labels);
          // console.log('values', values);
          // Generate background colors dynamically
          const backgroundColors = this.generateBackgroundColors(data.length);
          this.createPieChart(labels, values, backgroundColors, canvasId);
        },
        (error) => {
          console.error('Error fetching order:', error);
        }
      );
    }
  }

  createPieChart(labels: string[], values: number[], backgroundColors: string[], canvasId: string) {
    if (canvasId === 'pieChart1') {
      if (this.chart1) {
        this.chart1.destroy();
      }
    } else if (canvasId === 'pieChart2') {
      if (this.chart2) {
        this.chart2.destroy();
      }
    }
    const chart = new Chart(canvasId, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true
      },
    });
    if (canvasId === 'pieChart1') {
      this.chart1 = chart;
    } else if (canvasId === 'pieChart2') {
      this.chart2 = chart;
    }
  }

  generateBackgroundColors(numItems: number): string[] {
    // You can customize this logic to generate colors as needed
    const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
    return colors.slice(0, numItems);
  }

}
