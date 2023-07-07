^[a-zA-Z0-9\-_.,:;<>~!@#$%^&*()+={}\[\]\\\|/?]{4,35}\s*$
^[a-zA-Z0-9\-_.,:;<>~!@#$%^&*()+={}\[\]\\\|/?]+\s*$
^[a-zA-Z0-9]+$


^[a-zA-Z0-9\s!@#$%^&*()_+=[\]{}|;':",./<>?`~\\-]+$


import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://example.com/api';
const params = {
  param1: 'value1',
  param2: 'value2'
};

// Encode parameters using encodeURIComponent()
const encodedParams = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

const url = `${baseUrl}?${encodedParams}`;

this.http.get(url).subscribe((response) => {
  // handle response
}, (error) => {
  // handle error
});


^[a-zA-Z0-9,&.'-:\s]+$



function generateRandomPostcode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const outwardCodeLetters = letters.replace(/[CIKMOV]/g, ""); // Exclude letters that don't appear in outward code
  const outwardCode = `${outwardCodeLetters[Math.floor(Math.random() * outwardCodeLetters.length)]}${letters[Math.floor(Math.random() * letters.length)]}`;
  const inwardCode = `${numbers[Math.floor(Math.random() * numbers.length)]}${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}`;
  return `${outwardCode} ${inwardCode}`;
}



import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDelayedValidation]'
})
export class DelayedValidationDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input')
  onInput() {
    // Trigger validation when the value changes
    this.ngControl.control?.updateValueAndValidity({ emitEvent: false });
  }
}

<form>
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" appDelayedValidation [ngModelOptions]="{ updateOn: 'change' }" required>
    <div *ngIf="name.invalid && (name.dirty || name.touched)">
      <div *ngIf="name.errors.required">Name is required.</div>
    </div>
  </div>
  <!-- Add more inputs with the directive as needed -->
</form>
