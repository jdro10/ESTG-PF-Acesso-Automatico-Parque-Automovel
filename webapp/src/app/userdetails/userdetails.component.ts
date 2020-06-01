import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  user: User[];
  userNumber: string;
  page = 1;
  pageSize = 10;
  collectionSize: number;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userNumber = this.route.snapshot.paramMap.get('numero');
    this.userService.getUserDetails(this.userNumber).subscribe(
      users => this.user = users,
      error => this.router.navigate([''])
    );
  }

  get userDetails(): User[] {
    this.collectionSize = this.user.length;

    return this.user
      .map((userdetails, i) => ({id: i + 1, ...userdetails}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}