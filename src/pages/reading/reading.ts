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
  public tocHeaders = [];
  public book;
  public sectionHash = {};
  public sectionArr = [];

  parseToc(tocArr, parentIndex) {
    for(var i=0;i<tocArr.length;i++){
      console.log(parentIndex);
      let index = JSON.parse(JSON.stringify(parentIndex));
      index.push(i);
      console.log(index);
      if (typeof tocArr[i] == "string") {
        this.tocHeaders.push({"index": index, "name": tocArr[i], "leaf": true});
        this.bookService.getSection(this.book, index).subscribe(
          data => {
            var section = {
              "header": tocArr[i],
              "content": data["_body"]
            };
            this.sectionHash[index.join("-")] = section;
            this.sectionArr.push(section);
          },
          err => {
            if (err.status == 404) {
              var section = {
                "header": tocArr[i],
                "content": ""
              };
            } else {
              console.error(err);
            }
          },
          () => console.log('getSection completed')
        );
      }
      else {
        console.log(Object.keys(tocArr[i])[0] + " is not leaf");
        this.tocHeaders.push({"index": index, "name": Object.keys(tocArr[i])[0], "leaf": false});
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
        console.log(JSON.stringify(this.toc));
        this.parseToc(this.toc,[]);
        console.log(this.tocHeaders);
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
