import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'topup-users';

  constructor(private usersService: UsersService){}
  ngOnInit() {
    // this.setDummyData();
  }

  // setDummyData = () => {
  //   const data = [
  //     {
  //       id: 1,
  //       name: 'James Mo',
  //       job: 'Scientist',
  //     },
  //     {
  //       id: 2,
  //       name: 'Rick Kaluma',
  //       job: 'Driver',
  //     },
  //     {
  //       id: 3,
  //       name: 'Festus Swende',
  //       job: 'Doctor',
  //     },
  //   ];
  //   this.usersService.addDummy(data)
  // };
}
