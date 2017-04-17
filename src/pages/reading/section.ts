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

  toggle(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    if (target.className != "title") {
      var title = target.getElementsByClassName("title");
      if (!title.length) {
        var showing = document.getElementsByClassName("title");
        if (showing.length>0)
          showing[0].parentNode.removeChild(showing[0]);
        title = document.createElement("span");
        title.className = "title";
        title.innerHTML = target.attributes['title'].value;
        target.appendChild(title);
      } else {
        target.removeChild(target.childNodes[1]);
      }
    }
  }
}
