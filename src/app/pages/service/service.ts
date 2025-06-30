import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceApiService, ServiceEntry } from '../../services/service-api.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.html',
  styleUrl: './service.scss'
})
export class Service implements OnInit {
  serviceList: ServiceEntry[] = [];

  constructor(private serviceApi: ServiceApiService) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.serviceApi.getServices().subscribe(data => {
      this.serviceList = data;
    });
  }

  // Weitere Methoden für Add, Update, Delete können hier ergänzt werden
}
