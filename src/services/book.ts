import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { APP_CONFIG, IAppConfig} from '../app.config';

import { Book } from '../models/book';

@Injectable()
export class BookService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
  }

  removeVNAccent( alias ) {
    var str = alias;
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
    str= str.replace(/^\-+|\-+$/g,"");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
  }

  getBooks(categoryName) {
    let books = this.http.get(`${this.config.apiEndpoint}/categories/${this.removeVNAccent(categoryName)}/books.json`);
    return books;
  }

  getDetails(book) {
    if (!book.url)
      book.url = this.removeVNAccent(book.name);
    return this.http.get(`${this.config.apiEndpoint}/books/${book.url}/details.json`);
  }

  getToc(book) {
    if (!book.url)
      book.url = this.removeVNAccent(book.name);
    return this.http.get(`${this.config.apiEndpoint}/books/${book.url}/toc.json`);
  }

  getSection(book,index){
    if (!book.url)
      book.url = this.removeVNAccent(book.name);
    return this.http.get(`${this.config.apiEndpoint}/books/${book.url}/${index.join("-")}.txt`);
  }
}
