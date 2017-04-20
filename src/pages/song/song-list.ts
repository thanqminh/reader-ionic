import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';
import {SongPage} from "./song";
import { SongService } from '../../services/song';

@Component({
  selector: 'page-song-list',
  templateUrl: 'song-list.html',
  providers: [SongService]
})
export class SongListPage {
  public foundSongs;
  public categoryName;

  constructor(private songService: SongService,
              private nav: NavController) {
    this.songService.getSongList().subscribe(
      data => {
        this.foundSongs = data.json();
      },
      err => console.error(err),
      () => console.log('getSongs completed')
    );
  }

  goToSong(song) {
    this.nav.push(SongPage, { song: song });
  }
}
