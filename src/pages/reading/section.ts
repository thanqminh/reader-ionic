import { Component, Input, OnChanges } from '@angular/core';
import { BookService } from '../../services/book';

@Component({
  selector: 'reading-section',
  templateUrl: 'section.html',
  providers: [BookService]
})

export class ReadingSection implements OnChanges {
  @Input() section;
  @Input() book;

  constructor(private bookService: BookService) {
  }

  ngOnChanges() {
    if (this.section && this.book && !this.section.content) {
      this.bookService.getSection(this.book, this.section.index).subscribe(
        data => {
          this.section["content"] = data["_body"];
        },
        err => {
          if (err.status == 404) {
            console.error(`no content found for ${this.section.index.join('-')}`);
          } else {
            console.error(err);
          }
        },
        () => console.log('getSection completed')
      );
    }
  }
}
