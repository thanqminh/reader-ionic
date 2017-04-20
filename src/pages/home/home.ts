import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';
import { BookPage } from '../book/book';
import { SongListPage } from '../song/song-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private nav: NavController) {
  }

  goToBook() {
    this.nav.push(BookPage);
  }

  goToSong() {
    this.nav.push(SongListPage);
  }
}
