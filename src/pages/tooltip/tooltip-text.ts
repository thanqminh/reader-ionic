import {Component, Inject, Input} from "@angular/core";
import { LanguageService } from '../../services/language';
import { SongService } from '../../services/song';
import { APP_CONFIG, IAppConfig} from '../../app.config';

@Component({
  selector: 'tooltip-text',
  templateUrl: 'tooltip-text.html',
  providers: [LanguageService, SongService]
})
export class TooltipText {
  @Input() primaryLocale;
  @Input() textSize;
  public charArr = [];
  public lyrics;
  public translation;
  @Input() showTranslation;
  private counter    = [0,0,0,0];

  constructor(private languageService: LanguageService, private songService: SongService, @Inject(APP_CONFIG) private config: IAppConfig) {
    this.translation = false;
  }

  private _song = null;
  @Input()
  set song(song) {
    this._song = song;
    this.getLyric();
    if (this._song.translations) {
      this.songService.getTranslationText(this._song, this._song.translations[0]).subscribe(
        data => {
          this.translation = data["_body"];
          this.render();
        },
        err => console.error(err),
        () => console.log('getTranslationText completed')
      )
    }
  }

  public getLyric() {
    this.lyrics = {"tw":"","cn":"","vi":"","py":""};
    for (let locale in this.lyrics) {
      if (this.lyrics.hasOwnProperty(locale)) {
        this.songService.getLyricText(this._song, locale).subscribe(
          data => {
            this.lyrics[locale] = data["_body"];
            this.render();
          },
          err => console.error(err),
          () => console.log('getLyricText ' + locale + ' completed')
        );
      }
    }
  }

  public checkAllLyricRetrieved() {
    if (this._song && this.lyrics) {
      if (this.lyrics["tw"] != "" &&
        this.lyrics["cn"] != "" &&
        this.lyrics["vi"] != "" &&
        this.lyrics["py"] != "" && this.counter[0] == 0) {
          if (this._song.translations) {
            if (this.translation)
              return true;
          } else {
            return true;
          }
      }
    }
    return false;
  }

  public render() {
    if (this.checkAllLyricRetrieved()) {
      var tw = this.lyrics["tw"]; var cn = this.lyrics["cn"]; var vi = this.lyrics["vi"]; var py = this.lyrics["py"];
      while (this.counter[0]<this.lyrics["tw"].length) {
        var counter = this.counter;
        var nextCounter = [counter[0] + 1,counter[1] + 1,counter[2] + 1,counter[3] + 1];
        var nextWord = {
          "tw": tw[counter[0]],
          "cn": cn[counter[1]]
        }

        //check for special character
        if (tw[this.counter[0]] != vi[this.counter[2]]) {
          while (nextCounter[2] < vi.length && this.languageService.isVietnameseCharacter(vi[nextCounter[2]]))
            nextCounter[2] = nextCounter[2] + 1;
        }
        nextWord["vi"] = vi.substring(counter[2],nextCounter[2]);

        //check for special character
        if (tw[this.counter[0]] != py[this.counter[3]]) {
          while (nextCounter[3] < py.length && this.languageService.isChinesePinyinCharacter(py[nextCounter[3]]))
            nextCounter[3] = nextCounter[3] + 1;
        }
        nextWord["py"] = py.substring(counter[3],nextCounter[3]);
        this.charArr.push(nextWord);
        this.counter = nextCounter;
      }
      if (this._song.translations)
        this.translation = this.translation.split("\n");
    }
  }

  public getTranslationLine(index) {
    var count = 0;
    for (var i=index;i>=0;i--) {
      if (this.lyrics["tw"][i]=='\n') count++;
    }
    return this.translation[count-1];
  }

  public toggle(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    if (target.className != "tooltip") {
      var tooltip = target.getElementsByClassName("tooltip");
      if (!tooltip.length) {
        target.className = "more_info hightlight";
        var showing = document.getElementsByClassName("tooltip");
        if (showing.length>0) {
          showing[0].parentElement.className = "more_info";
          showing[0].parentNode.removeChild(showing[0]);
        }
        tooltip = document.createElement("span");
        tooltip.className = "tooltip";
        tooltip.innerHTML = target.attributes['title'].value.replace(/(?:\r\n|\r|\n)/g, '<br />');
        tooltip.style.top = 5 + this.textSize + "px";
        target.appendChild(tooltip);
      } else {
        target.className = "more_info";
        target.removeChild(target.childNodes[1]);
      }
    }
  }

  public getTooltip(locale,tw,cn,vi,py) {
    var tooltip;
    tw = tw.trim(); cn = cn.trim(); vi = vi.trim(); py = py.trim();
    switch (locale) {
      case "tw":
        if (tw!=cn)
          tooltip = cn + "\n" + vi + "\n" + py;
        else
          tooltip = vi + "\n" + py;
        break;

      case "cn":
        if (tw!=cn)
          tooltip = tw + "\n" + vi + "\n" + py;
        else
          tooltip = vi + "\n" + py;
        break;

      case "vi":
        if (tw!=cn)
          tooltip = tw + "\n" + cn + "\n" + py;
        else
          tooltip = tw + "\n" + py;
        break;

      case "py":
      default:
        if (tw!=cn)
          tooltip = tw + "\n" + cn + "\n" + vi;
        else
          tooltip = tw + "\n" + vi;
        break;
    }
    return tooltip;
  }
}
