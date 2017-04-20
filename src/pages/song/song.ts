import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { SongService } from '../../services/song';

@Component({
  selector: 'page-song',
  templateUrl: 'song.html',
  providers: [SongService]
})
export class SongPage {
  public song;
  public textSize;
  public primaryLocale;

  constructor(private songService: SongService,
              private nav: NavController,
              private navParams: NavParams) {
    this.textSize = 30;
    this.primaryLocale = "tw";
    this.song = navParams.get('song');
  }

  decreaseTextSize(textSize) {
    if (this.textSize > 1)
      this.textSize = this.textSize - 1;
  }

  increaseTextSize(textSize) {
    if (this.textSize < 100)
      this.textSize = this.textSize + 1;
  }
}
