import { Component, Inject } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { SongService } from '../../services/song';
import { APP_CONFIG, IAppConfig} from '../../app.config';

@Component({
  selector: 'page-song',
  templateUrl: 'song.html',
  providers: [SongService]
})
export class SongPage {
  public song;
  public textSize;
  public primaryLocale;
  public showTranslation;
  public musicFileUrl;

  constructor(private songService: SongService,
              private nav: NavController,
              private navParams: NavParams,
              @Inject(APP_CONFIG) private config: IAppConfig) {
    this.textSize = this.config.defaultTextSize;
    this.showTranslation = false;
    this.primaryLocale = "tw";
    this.song = navParams.get('song');
    this.musicFileUrl = this.songService.getMusicFileUrl(this.song);
  }

  decreaseTextSize(textSize) {
    if (this.textSize > this.config.textSizeDifference + 1)
      this.textSize = this.textSize - 1;
  }

  increaseTextSize(textSize) {
    if (this.textSize < this.config.maxTextSize)
      this.textSize = this.textSize + 1;
  }

  switchLocale() {
    if (this.primaryLocale == "tw")
      this.primaryLocale = "cn";
    else
      this.primaryLocale = "tw";
  }

  toggleTranslation() {
    this.showTranslation = !this.showTranslation;
  }
}
