import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewsApiService, News } from '../../services/news-api.service';
import { ProjectsApiService, Project } from '../../services/projects-api.service';
import { ServiceApiService, ServiceEntry } from '../../services/service-api.service';
import { KontaktApiService, KontaktEntry } from '../../services/kontakt-api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  
  // Loading States
  loading = true;
  skillsLoading = false;
  configSaving = false;
  
  // Error Handling
  error = '';
  
  // User Data
  currentUser: any | null = null;
  userName: string = 'Max Mustermann'; // Hier ggf. dynamisch setzen
  
  // News
  newsList: News[] = [];
  newsCategory: string = '';
  newsText: string = '';
  showNewsForm = false;

  // Projekte
  projects: Project[] = [];
  projectName: string = '';
  projectDescription: string = '';
  projectApplications: string = '';
  projectVersion: string = '';
  projectImageUrl: string = '';
  projectLink: string = '';
  projectGithub: string = '';
  editingProject: Project | null = null;

  // Service
  serviceList: ServiceEntry[] = [];
  serviceName: string = '';
  serviceDescription: string = '';
  serviceImageUrl: string = '';
  serviceCategory: string = '';
  serviceLink: string = '';
  serviceStatus: string = '';
  servicePrice: number | null = null;
  serviceStack: string = '';
  serviceBuyUrl: string = '';
  serviceFeatures: string = '';
  serviceDiscount: number | null = null;
  editingService: ServiceEntry | null = null;

  // Kontakt
  kontaktList: KontaktEntry[] = [];
  kontaktName: string = '';
  kontaktEmail: string = '';
  kontaktMessage: string = '';
  editingKontakt: KontaktEntry | null = null;

  // Tabs
  activeTab: string = 'news';

  // News Editing
  editingNews: News | null = null;
  newsTitle: string = '';
  newsContent: string = '';
  newsImageUrl: string = '';

  // Pricing-Angebote für Service
  pricingTitle: string = '';
  pricingDescription: string = '';
  pricingPrice: number | null = null;
  pricingDiscount: number | null = null;
  pricingFeatures: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private newsApi: NewsApiService,
    private projectsApi: ProjectsApiService,
    private serviceApi: ServiceApiService,
    private kontaktApi: KontaktApiService
  ) {}

  ngOnInit() {
    console.log('🚀 Dashboard Component initialisiert');
    // User Authentication prüfen
    this.authService.currentUser$.subscribe((user: any | null) => {
      this.currentUser = user;
      if (!this.currentUser) {
        this.router.navigate(['/login']);
        return;
      }
      // User-Name dynamisch setzen
      this.userName = this.currentUser.first_name ? `${this.currentUser.first_name} ${this.currentUser.last_name}` : this.currentUser.username;
    });
    this.loadAllData();
  }

  loadAllData() {
    this.loadNews();
    this.loadProjects();
    this.loadServices();
    this.loadKontakte();
  }

  // --- News ---
  loadNews() {
    this.newsApi.getAll().subscribe({
      next: data => this.newsList = data,
      error: err => this.error = 'News: ' + (err.message || err.statusText)
    });
  }
  openNewsModal(news?: News) {
    this.editingNews = news || null;
    this.newsTitle = news ? news.title : '';
    this.newsContent = news ? news.content : '';
    this.newsImageUrl = news && news.imageUrl ? news.imageUrl : '';
    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById('newsModal'));
      modal.show();
    });
  }
  addNews() {
    if (this.newsTitle.trim() && this.newsContent.trim()) {
      this.newsApi.add({ title: this.newsTitle.trim(), content: this.newsContent.trim(), imageUrl: this.newsImageUrl?.trim() }).subscribe(news => {
        this.newsList.unshift(news);
        this.newsTitle = '';
        this.newsContent = '';
        this.newsImageUrl = '';
        const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('newsModal'));
        modal?.hide();
      });
    }
  }
  removeNews(news: News) {
    if (news.id) {
      this.newsApi.delete(news.id).subscribe(() => {
        this.newsList = this.newsList.filter(n => n.id !== news.id);
      });
    }
  }

  // --- Projekte ---
  loadProjects() {
    this.projectsApi.getProjects().subscribe({
      next: data => this.projects = data,
      error: err => this.error = 'Projekte: ' + (err.message || err.statusText)
    });
  }
  openProjectModal(project?: Project) {
    this.editingProject = project || null;
    this.projectName = project ? project.name : '';
    this.projectDescription = project ? project.description : '';
    this.projectApplications = project && project.applications ? project.applications : '';
    this.projectVersion = project && project.version ? project.version : '';
    this.projectImageUrl = project && project.imageUrl ? project.imageUrl : '';
    this.projectLink = project && project.link ? project.link : '';
    this.projectGithub = project && project.github ? project.github : '';
    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById('projectModal'));
      modal.show();
    });
  }
  saveProject() {
    const payload = {
      name: this.projectName.trim(),
      description: this.projectDescription.trim(),
      applications: this.projectApplications?.trim(),
      version: this.projectVersion?.trim(),
      imageUrl: this.projectImageUrl?.trim(),
      link: this.projectLink?.trim(),
      github: this.projectGithub?.trim()
    };
    if (this.editingProject) {
      this.projectsApi.updateProject(this.editingProject.id, payload).subscribe(updated => {
        const idx = this.projects.findIndex(p => p.id === updated.id);
        if (idx > -1) this.projects[idx] = updated;
        this.editingProject = null;
        this.projectName = '';
        this.projectDescription = '';
        this.projectApplications = '';
        this.projectVersion = '';
        this.projectImageUrl = '';
        this.projectLink = '';
        this.projectGithub = '';
        const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('projectModal'));
        modal?.hide();
      });
    } else {
      this.projectsApi.addProject(payload).subscribe(project => {
        this.projects.unshift(project);
        this.projectName = '';
        this.projectDescription = '';
        this.projectApplications = '';
        this.projectVersion = '';
        this.projectImageUrl = '';
        this.projectLink = '';
        this.projectGithub = '';
        const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('projectModal'));
        modal?.hide();
      });
    }
  }
  removeProject(project: Project) {
    if (project.id) {
      this.projectsApi.deleteProject(project.id).subscribe(() => {
        this.projects = this.projects.filter(p => p.id !== project.id);
      });
    }
  }

  // --- Service ---
  loadServices() {
    this.serviceApi.getServices().subscribe({
      next: data => this.serviceList = data,
      error: err => this.error = 'Service: ' + (err.message || err.statusText)
    });
  }
  openServiceModal(service?: ServiceEntry) {
    this.editingService = service || null;
    this.serviceName = service ? service.name : '';
    this.serviceDescription = service ? service.description : '';
    this.serviceImageUrl = service && service.imageUrl ? service.imageUrl : '';
    this.serviceCategory = service && service.category ? service.category : '';
    this.serviceLink = service && service.link ? service.link : '';
    this.serviceStatus = service && service.status ? service.status : '';
    this.servicePrice = service && service.price ? service.price : null;
    this.serviceStack = service && service.stack ? service.stack : '';
    this.serviceBuyUrl = service && service.buyUrl ? service.buyUrl : '';
    this.serviceFeatures = service && service.features ? service.features : '';
    this.serviceDiscount = service && service.discount ? service.discount : null;
    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
      modal.show();
    });
  }
  saveService() {
    const payload = {
      name: this.serviceName.trim(),
      description: this.serviceDescription.trim(),
      imageUrl: this.serviceImageUrl?.trim(),
      category: this.serviceCategory?.trim(),
      link: this.serviceLink?.trim(),
      status: this.serviceStatus?.trim(),
      price: this.servicePrice !== null && this.servicePrice !== undefined ? this.servicePrice : undefined,
      stack: this.serviceStack?.trim(),
      buyUrl: this.serviceBuyUrl?.trim(),
      features: this.serviceFeatures?.trim(),
      discount: this.serviceDiscount !== null && this.serviceDiscount !== undefined ? this.serviceDiscount : undefined
    };
    if (this.editingService) {
      this.serviceApi.updateService(this.editingService.id, payload).subscribe(updated => {
        const idx = this.serviceList.findIndex(s => s.id === updated.id);
        if (idx > -1) this.serviceList[idx] = updated;
        this.editingService = null;
        this.serviceName = '';
        this.serviceDescription = '';
        this.serviceImageUrl = '';
        this.serviceCategory = '';
        this.serviceLink = '';
        this.serviceStatus = '';
        this.servicePrice = null;
        this.serviceStack = '';
        this.serviceBuyUrl = '';
        this.serviceFeatures = '';
        this.serviceDiscount = null;
        const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('serviceModal'));
        modal?.hide();
      });
    } else {
      this.serviceApi.addService(payload).subscribe(service => {
        this.serviceList.unshift(service);
        this.serviceName = '';
        this.serviceDescription = '';
        this.serviceImageUrl = '';
        this.serviceCategory = '';
        this.serviceLink = '';
        this.serviceStatus = '';
        this.servicePrice = null;
        this.serviceStack = '';
        this.serviceBuyUrl = '';
        this.serviceFeatures = '';
        this.serviceDiscount = null;
        const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('serviceModal'));
        modal?.hide();
      });
    }
  }
  removeService(service: ServiceEntry) {
    if (service.id) {
      this.serviceApi.deleteService(service.id).subscribe(() => {
        this.serviceList = this.serviceList.filter(s => s.id !== service.id);
      });
    }
  }

  // --- Kontakt ---
  loadKontakte() {
    this.kontaktApi.getKontakte().subscribe({
      next: data => this.kontaktList = data,
      error: err => this.error = 'Kontakt: ' + (err.message || err.statusText)
    });
  }
  openKontaktModal(kontakt?: KontaktEntry) {
    this.editingKontakt = kontakt || null;
    this.kontaktName = kontakt ? kontakt.name : '';
    this.kontaktEmail = kontakt ? kontakt.email : '';
    this.kontaktMessage = kontakt ? kontakt.message : '';
    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById('kontaktModal'));
      modal.show();
    });
  }
  saveKontakt() {
    if (this.editingKontakt) {
      this.kontaktApi.updateKontakt(this.editingKontakt.id, { name: this.kontaktName.trim(), email: this.kontaktEmail.trim(), message: this.kontaktMessage.trim() }).subscribe(updated => {
        const idx = this.kontaktList.findIndex(k => k.id === updated.id);
        if (idx > -1) this.kontaktList[idx] = updated;
        this.editingKontakt = null;
        this.kontaktName = '';
        this.kontaktEmail = '';
        this.kontaktMessage = '';
        const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('kontaktModal'));
        modal?.hide();
      });
    } else {
      this.kontaktApi.addKontakt({ name: this.kontaktName.trim(), email: this.kontaktEmail.trim(), message: this.kontaktMessage.trim() }).subscribe(kontakt => {
        this.kontaktList.unshift(kontakt);
        this.kontaktName = '';
        this.kontaktEmail = '';
        this.kontaktMessage = '';
        const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('kontaktModal'));
        modal?.hide();
      });
    }
  }
  removeKontakt(kontakt: KontaktEntry) {
    if (kontakt.id) {
      this.kontaktApi.deleteKontakt(kontakt.id).subscribe(() => {
        this.kontaktList = this.kontaktList.filter(k => k.id !== kontakt.id);
      });
    }
  }

  // AUTH MANAGEMENT
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // UTILITY METHODS
  refreshData() {
    this.loadAllData();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  openPricingModal(pricing?: any) {
    this.pricingTitle = pricing ? pricing.title : '';
    this.pricingDescription = pricing ? pricing.description : '';
    this.pricingPrice = pricing ? pricing.price : null;
    this.pricingDiscount = pricing ? pricing.discount : null;
    this.pricingFeatures = pricing ? pricing.features : '';
    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById('pricingModal'));
      modal.show();
    });
  }

  savePricing() {
    // Hier würdest du die Daten an ein Backend senden oder im State speichern
    // Beispiel: this.servicePricingList.push({ ... })
    // Nach dem Speichern Modal schließen
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('pricingModal'));
    modal?.hide();
  }
}
