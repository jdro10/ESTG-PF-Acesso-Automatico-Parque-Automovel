import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  page = 1;
  pageSize = 10;
  collectionSize: number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => this.router.navigate([''])
    );
  }

  get allUsers(): User[] {
    this.collectionSize = this.users.length;

    return this.users
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  disableAccess(plate: string): void {
    this.userService.disableAccess(plate).subscribe(() =>
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => this.router.navigate([''])
    ));
  }

  enableAccess(plate: string): void {
    this.userService.enableAccess(plate).subscribe(() =>
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => this.router.navigate(['']))
    );
  }
}