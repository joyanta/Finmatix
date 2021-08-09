import { Component, Input, OnChanges } from '@angular/core';
import { Summary } from 'src/app/model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnChanges {
  
  @Input() results: Summary[];

  constructor() {
  }

  ngOnChanges() {
    // IMPLEMENT ANYTHING YOU BEKIEVE YOU MIGHT NEED HERE
  }
}


