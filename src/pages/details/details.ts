import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookService } from '../../services/book';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [BookService]
})
export class DetailsPage {
  public readme = '';
  public book;

  constructor(private bookService: BookService,
              private nav: NavController,
              private navParams: NavParams) {

    this.book = navParams.get('book');

    this.bookService.getDetails(this.book).subscribe(
      data => this.readme = data.text(),
      err => {
        if (err.status == 404) {
          this.readme = 'This repo does not have a README. :(';
        } else {
          console.error(err);
        }
      },
      () => console.log('getDetails completed')
    );
  }
}
