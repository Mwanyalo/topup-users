import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  currentUser: any = '';
  appShowAuthed: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    this.currentUser = this.authService.getToken();

    if (this.currentUser !== null) {
      this.appShowAuthed = true;
    } else {
      this.appShowAuthed = false;
    }
  };
}
