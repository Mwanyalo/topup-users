import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/core/services/location.service';
import { Location } from './shared/models/location.model';
import { LoaderService } from './core/services/loader.service';
LoaderService;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'topup-users';
  showLoader: boolean = false;
  loc = {};
  constructor(
    private locationService: LocationService,
    private loaderService: LoaderService
  ) {}
  ngOnInit() {
    this.getLocation();
    this.load()
  }

  load = () => {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
   });
  }
  getLocation = () => {
    this.locationService.getCurrentLocation().subscribe((data) => {
      this.loc = data;
    });
  };
}
