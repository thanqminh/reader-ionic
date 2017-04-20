"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var app_config_1 = require('../app.config');
var BookService = (function () {
    function BookService(http, config) {
        this.http = http;
        this.config = config;
    }
    BookService.prototype.removeVNAccent = function (alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
        str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
        str = str.replace(/^\-+|\-+$/g, "");
        //cắt bỏ ký tự - ở đầu và cuối chuỗi
        return str;
    };
    BookService.prototype.getBooks = function (categoryName) {
        var books = this.http.get(this.config.apiEndpoint + "/categories/" + this.removeVNAccent(categoryName) + "/books.json");
        return books;
    };
    BookService.prototype.getDetails = function (book) {
        if (!book.url)
            book.url = this.removeVNAccent(book.name);
        return this.http.get(this.config.apiEndpoint + "/books/" + book.url + "/details.json");
    };
    BookService.prototype.getToc = function (book) {
        if (!book.url)
            book.url = this.removeVNAccent(book.name);
        return this.http.get(this.config.apiEndpoint + "/books/" + book.url + "/toc.json");
    };
    BookService.prototype.getSection = function (book, index) {
        if (!book.url)
            book.url = this.removeVNAccent(book.name);
        return this.http.get(this.config.apiEndpoint + "/books/" + book.url + "/" + index.join("-") + ".txt");
    };
    BookService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(app_config_1.APP_CONFIG))
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
