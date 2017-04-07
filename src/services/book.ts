import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { APP_CONFIG, IAppConfig} from '../app.config';

@Injectable()
export class BookService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
  }

  getBooks(categoryName) {
    let books = this.http.get(`${this.config.apiEndpoint}/categories/${categoryName}/books.json`);
    return books;
  }

  getDetails(book) {
    return this.http.get(`${this.config.apiEndpoint}/books/${book.url}/detail.json`);
  }
}
