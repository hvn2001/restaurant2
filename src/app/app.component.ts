import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'; // Import your ApiService
declare var Chart: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {} // Inject ApiService

  ngOnInit() {

  }

}
