import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private usersService: UsersService,  private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser = () => {
    this.loaderService.displayLoader(true)
    const data: any = this.usersService.getAllUsers();
    if(data === null){
      this.users = []
    } else {
      this.users = JSON.parse(data);
    }
    setTimeout(() => {
      this.loaderService.displayLoader(false)
    },1000);

  };
}
