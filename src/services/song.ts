import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { APP_CONFIG, IAppConfig} from '../app.config';

import { Song } from '../models/song';

@Injectable()
export class SongService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
  }

  getSongList() {
    let songs = this.http.get(`${this.config.apiEndpoint}/songs/list.json`);
    return songs;
  }

  getSongLyric(song) {
    return this.http.get(`${this.config.apiEndpoint}/songs/${song.slug}.txt`);
  }
}
