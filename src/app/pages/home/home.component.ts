import { Component, OnInit } from '@angular/core';
import { UsersList } from 'src/app/core/models/userslist.model';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  usersList: UsersList[] = [];
  users: User[] = [];
  pageNumber: number = 1;
  currentPage: string = '';
  constructor(private usersService: UsersService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser = () => {
    this.loaderService.displayLoader(true)
    const page = 1;
    this.usersService.getHomeUsers(page).subscribe((data: any) => {
      console.log('users', data.data);
      this.users = data?.data;
      this.loaderService.displayLoader(false)
    });
  };
}
