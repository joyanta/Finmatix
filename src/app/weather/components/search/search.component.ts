import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  
  @Output() selectedCity = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  search(): void {
    // TO BE IMPLEMENTED
    const cityNameControl = this.searchForm.get('cityName');
    if (cityNameControl.valid) {
      this.selectedCity.emit((cityNameControl.value as string).toLowerCase().trim());
    }
  }

  private buildForm(): void {
    this.searchForm = this.formBuilder.group({
      cityName: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ])
    });

  }
}
