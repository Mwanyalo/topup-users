import { Component, OnInit } from '@angular/core';
import { UsersList } from 'src/app/core/models/userslist.model';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

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
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser = () => {
    console.log('this.currentPage', this.currentPage);
    const page = 1;
    this.usersService.getHomeUsers(page).subscribe((data: any) => {
      console.log('users', data.data);
      this.users = data?.data;
    });
  };
}
