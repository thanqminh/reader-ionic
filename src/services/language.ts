import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { APP_CONFIG, IAppConfig} from '../app.config';

@Injectable()
export class LanguageService {
  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
  }

  removeVNAccent( alias ) {
    var str = alias;
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
    str= str.replace(/^\-+|\-+$/g,"");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
  }

  isVietnameseCharacter(char) {
    var str = char;
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    return "abcdefghijklmnopqrstuvwxyz".indexOf(str) > -1;
  }

  isChinesePinyinCharacter(str) {
    var conversions = new Object();
    conversions['a'] = 'ä|æ|ǽ';
    conversions['o'] = 'ö|œ';
    conversions['u'] = 'ü';
    conversions['A'] = 'Ä';
    conversions['U'] = 'Ü';
    conversions['O'] = 'Ö';
    conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
    conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
    conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
    conversions['c'] = 'ç|ć|ĉ|ċ|č';
    conversions['D'] = 'Ð|Ď|Đ';
    conversions['d'] = 'ð|ď|đ';
    conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
    conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
    conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
    conversions['g'] = 'ĝ|ğ|ġ|ģ';
    conversions['H'] = 'Ĥ|Ħ';
    conversions['h'] = 'ĥ|ħ';
    conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
    conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
    conversions['J'] = 'Ĵ';
    conversions['j'] = 'ĵ';
    conversions['K'] = 'Ķ';
    conversions['k'] = 'ķ';
    conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
    conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
    conversions['N'] = 'Ñ|Ń|Ņ|Ň';
    conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
    conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
    conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
    conversions['R'] = 'Ŕ|Ŗ|Ř';
    conversions['r'] = 'ŕ|ŗ|ř';
    conversions['S'] = 'Ś|Ŝ|Ş|Š';
    conversions['s'] = 'ś|ŝ|ş|š|ſ';
    conversions['T'] = 'Ţ|Ť|Ŧ';
    conversions['t'] = 'ţ|ť|ŧ';
    conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
    conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
    conversions['Y'] = 'Ý|Ÿ|Ŷ';
    conversions['y'] = 'ý|ÿ|ŷ';
    conversions['W'] = 'Ŵ';
    conversions['w'] = 'ŵ';
    conversions['Z'] = 'Ź|Ż|Ž';
    conversions['z'] = 'ź|ż|ž';
    for(var i in conversions){
      var re = new RegExp(conversions[i],"g");
      str = str.replace(re,i);
    }
    return "abcdefghijklmnopqrstuvwxyz".indexOf(str.toLowerCase()) > -1;
  }

  toggleTooltip(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    if (target.className != "title") {
      var title = target.getElementsByClassName("title");
      if (!title.length) {
        var showing = document.getElementsByClassName("title");
        if (showing.length>0)
          showing[0].parentNode.removeChild(showing[0]);
        title = document.createElement("span");
        title.className = "title";
        title.innerHTML = target.attributes['title'].value;
        target.appendChild(title);
      } else {
        target.removeChild(target.childNodes[1]);
      }
    }
  }
}
