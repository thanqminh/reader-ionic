import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { APP_CONFIG, AppConfig } from '../app.config';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookPage } from '../pages/book/book';
import { DetailsPage } from '../pages/details/details';
import { ReadingPage } from '../pages/reading/reading';
import { ReadingSection } from '../pages/reading/section';
import { SongListPage } from '../pages/song/song-list';
import { SongPage } from '../pages/song/song';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LanguageService } from '../services/language';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookPage,
    DetailsPage,
    ReadingPage,
    ReadingSection,
    SongListPage,
    SongPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookPage,
    SongListPage,
    SongPage,
    DetailsPage,
    ReadingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LanguageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: APP_CONFIG, useValue: AppConfig }
  ]
})
export class AppModule {}
