import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookService } from '../../services/book';

@Component({
  selector: 'page-reading',
  templateUrl: 'reading.html',
  providers: [BookService]
})
export class ReadingPage {
  public toc = {};
  public book;

  constructor(private bookService: BookService,
              private nav: NavController,
              private navParams: NavParams) {

    this.book = navParams.get('book');

    this.bookService.getToc(this.book).subscribe(
      data => this.toc = data.json(),
      err => {
        if (err.status == 404) {
          this.toc = [];
        } else {
          console.error(err);
        }
      },
      () => console.log('getToc completed')
    );


  }
}
