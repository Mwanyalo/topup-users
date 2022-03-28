import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  readonly rootUrl = environment.loc_url;
  constructor(private http: HttpClient) {}

  getCurrentLocation = () => {
    return this.http.get(this.rootUrl);
  };
}
