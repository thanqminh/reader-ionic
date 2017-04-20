"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var book_1 = require('../../services/book');
var reading_1 = require('../reading/reading');
var DetailsPage = (function () {
    function DetailsPage(bookService, nav, navParams) {
        var _this = this;
        this.bookService = bookService;
        this.nav = nav;
        this.navParams = navParams;
        this.details = {};
        this.book = navParams.get('book');
        this.bookService.getDetails(this.book).subscribe(function (data) { return _this.details = data.json(); }, function (err) {
            if (err.status == 404) {
                _this.details['description'] = 'Cannot find the selected book :';
            }
            else {
                console.error(err);
            }
        }, function () { return console.log('getDetails completed'); });
    }
    DetailsPage.prototype.goToReading = function (book) {
        this.nav.push(reading_1.ReadingPage, { book: book });
    };
    DetailsPage = __decorate([
        core_1.Component({
            selector: 'page-details',
            templateUrl: 'details.html',
            providers: [book_1.BookService]
        })
    ], DetailsPage);
    return DetailsPage;
}());
exports.DetailsPage = DetailsPage;
