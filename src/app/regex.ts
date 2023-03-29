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
