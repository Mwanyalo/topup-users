import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
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
    this.users = JSON.parse(data);
    this.loaderService.displayLoader(false)
  };
}
