import { Component } from '@angular/core';
import { Article } from './article/article.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  articles: Article[];

  constructor() {
    this.articles = [
      new Article('Angular', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1)
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value));

    title.value = '';
    link.value = '';

    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort(
      (articleA: Article, articleB: Article) => articleB.votes - articleA.votes
    );
  }
}
