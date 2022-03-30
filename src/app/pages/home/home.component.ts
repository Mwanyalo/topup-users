import { Component, OnInit } from '@angular/core';
import { UsersList } from 'src/app/shared/models/userslist.model';
import { User } from 'src/app/shared/models/user.model';
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
  totalPages: number = 0;
  constructor(private usersService: UsersService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser = () => {
    const page = 1;
    this.getUsers(page)
  };

  navPage = (type: string) => {
    if (type === 'next') {
      const page = this.pageNumber + 1;
      this.getUsers(page);
    } else {
      const page = this.pageNumber - 1;
      this.getUsers(page)
    }
  }

  getUsers = (page: number) => {
     this.loaderService.displayLoader(true)
     this.usersService.getHomeUsers(page).subscribe((data: any) => {
      this.users = data?.data;
      this.pageNumber = data?.page;
      this.totalPages = data?.total_pages;
      this.loaderService.displayLoader(false);
    });
  }
}
