import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookService } from '../../services/book';

@Component({
  selector: 'page-reading',
  templateUrl: 'reading.html',
  providers: [BookService]
})
export class ReadingPage {
  public toc = [];
  public headerArr = [];
  public headerHash = {};
  public book;
  public sectionHash = {};
  public sectionArr = [];

  parseToc(tocArr, parentIndex) {
    for(var i=0;i<tocArr.length;i++){
      let index = JSON.parse(JSON.stringify(parentIndex));
      index.push(i);
      if (typeof tocArr[i] == "string") {
        this.headerArr.push({"index": index, "name": tocArr[i], "leaf": true});
        this.headerHash[index.join('-')] = tocArr[i];
        var section = {
          "index": index,
          "header": this.headerHash[index.join('-')]
        };
        this.sectionHash[index.join("-")] = section;
        this.sectionArr.push(section);
      }
      else {
        this.headerArr.push({"index": index, "name": Object.keys(tocArr[i])[0], "leaf": false});
        this.headerHash[index.join('-')] = {"name": Object.keys(tocArr[i])[0]};
        this.parseToc(tocArr[i][Object.keys(tocArr[i])[0]],index);
      }
    }
  }

  constructor(private bookService: BookService,
            private nav: NavController,
            private navParams: NavParams) {

  this.book = navParams.get('book');

  this.bookService.getToc(this.book).subscribe(
    data => {
      this.toc = data.json();
      this.parseToc(this.toc,[]);
    },
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
