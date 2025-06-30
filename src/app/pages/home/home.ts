import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsApiService, News } from '../../services/news-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  newsList: News[] = [];
  expandedNews: boolean[] = [];

  constructor(private newsApi: NewsApiService) {}

  ngOnInit() {
    this.newsApi.getAll().subscribe(news => {
      this.newsList = news;
      this.expandedNews = new Array(news.length).fill(false);
    });
  }

  toggleExpand(i: number) {
    this.expandedNews[i] = !this.expandedNews[i];
  }
}
