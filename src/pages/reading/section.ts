import { Component, Input } from '@angular/core';
import { BookService } from '../../services/book';

@Component({
  selector: 'reading-section',
  templateUrl: 'section.html',
  providers: [BookService]
})

export class ReadingSection {
  @Input() section;
}
