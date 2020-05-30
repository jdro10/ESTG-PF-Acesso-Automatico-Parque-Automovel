import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userNumber: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  navigate(){
    var inputPlate = (<HTMLInputElement>document.getElementById("searchPlate")).value;

    this.userService.searchByPlate(inputPlate).subscribe(userNumber => {
      this.userNumber = userNumber;
      
      this.router.navigateByUrl('/userDetails/' + this.userNumber);
    });
  }
}
