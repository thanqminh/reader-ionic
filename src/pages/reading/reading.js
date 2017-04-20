"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var book_1 = require('../../services/book');
var ReadingPage = (function () {
    function ReadingPage(bookService, nav, navParams) {
        var _this = this;
        this.bookService = bookService;
        this.nav = nav;
        this.navParams = navParams;
        this.toc = [];
        this.headerArr = [];
        this.headerHash = {};
        this.sectionHash = {};
        this.sectionArr = [];
        this.book = navParams.get('book');
        this.bookService.getToc(this.book).subscribe(function (data) {
            _this.toc = data.json();
            _this.parseToc(_this.toc, []);
        }, function (err) {
            if (err.status == 404) {
                _this.toc = [];
            }
            else {
                console.error(err);
            }
        }, function () { return console.log('getToc completed'); });
    }
    ReadingPage.prototype.parseToc = function (tocArr, parentIndex) {
        for (var i = 0; i < tocArr.length; i++) {
            var index = JSON.parse(JSON.stringify(parentIndex));
            index.push(i);
            if (typeof tocArr[i] == "string") {
                this.headerArr.push({ "index": index, "name": tocArr[i], "leaf": true });
                this.headerHash[index.join('-')] = tocArr[i];
                var section = {
                    "index": index,
                    "header": this.headerHash[index.join('-')]
                };
                this.sectionHash[index.join("-")] = section;
                this.sectionArr.push(section);
            }
            else {
                this.headerArr.push({ "index": index, "name": Object.keys(tocArr[i])[0], "leaf": false });
                this.headerHash[index.join('-')] = { "name": Object.keys(tocArr[i])[0] };
                this.parseToc(tocArr[i][Object.keys(tocArr[i])[0]], index);
            }
        }
    };
    ReadingPage = __decorate([
        core_1.Component({
            selector: 'page-reading',
            templateUrl: 'reading.html',
            providers: [book_1.BookService]
        })
    ], ReadingPage);
    return ReadingPage;
}());
exports.ReadingPage = ReadingPage;
