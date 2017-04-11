import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookService } from '../../services/book';
import { ReadingPage} from '../reading/reading';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [BookService]
})
export class DetailsPage {
  public details = {};
  public book;

  constructor(private bookService: BookService,
              private nav: NavController,
              private navParams: NavParams) {

    this.book = navParams.get('book');

    this.bookService.getDetails(this.book).subscribe(
      data => this.details = data.json(),
      err => {
        if (err.status == 404) {
          this.details['description'] = 'Cannot find the selected book :';
        } else {
          console.error(err);
        }
      },
      () => console.log('getDetails completed')
    );
  }

  goToReading(book) {
    this.nav.push(ReadingPage, { book: book });
  }

}
