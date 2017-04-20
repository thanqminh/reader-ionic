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
  public lyric;
  public textSize;

  constructor(private songService: SongService,
              private nav: NavController,
              private navParams: NavParams) {
    this.textSize = 30;
    this.song = navParams.get('song');
    this.songService.getSongLyric(this.song).subscribe(
      data => {
        this.lyric = data["_body"];
      },
      err => console.error(err),
      () => console.log('getLyric completed')
    );
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
