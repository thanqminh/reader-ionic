import { Component } from "@angular/core";
import { BookService } from '../../services/book';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
  providers: [BookService]
})
export class BookPage {
  public foundBooks;
  public categoryName;

  constructor(private bookService: BookService,
              private nav: NavController) {
  }

  goToDetails(book) {
    this.nav.push(DetailsPage, { book: book });
  }

  getBooks() {
    this.bookService.getBooks(this.categoryName).subscribe(
      data => {
        this.foundBooks = data.json();
      },
      err => console.error(err),
      () => console.log('getBooks completed')
    );
  }
}
