import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KontaktApiService, KontaktEntry } from '../../services/kontakt-api.service';

@Component({
  selector: 'app-kontakt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kontakt.html',
  styleUrl: './kontakt.scss'
})
export class Kontakt implements OnInit {
  kontaktList: KontaktEntry[] = [];

  constructor(private kontaktApi: KontaktApiService) {}

  ngOnInit() {
    this.loadKontakte();
  }

  loadKontakte() {
    this.kontaktApi.getKontakte().subscribe(data => {
      this.kontaktList = data;
    });
  }

  // Weitere Methoden für Add, Update, Delete können hier ergänzt werden
}
