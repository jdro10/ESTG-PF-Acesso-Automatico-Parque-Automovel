import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WebService } from '../services/web.service';

@Component({
  selector: 'app-loggeduser',
  templateUrl: './loggeduser.component.html',
  styleUrls: ['./loggeduser.component.css']
})
export class LoggeduserComponent implements OnInit {
  currentUser: any;

  constructor(private webService: WebService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  logout(){
    this.webService.logout().subscribe(data => this.router.navigate(['']));
  }

  getCurrentUser(){
    this.webService.currentUser().subscribe(currentUser => this.currentUser = currentUser);
  }
}
