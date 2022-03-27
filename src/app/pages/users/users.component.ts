import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser = () => {
    const data: any = this.usersService.getAllUsers();
    this.users = JSON.parse(data);
    console.log('this.currentPage',  this.users )
  };
}
