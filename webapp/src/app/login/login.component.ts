import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';

import { UserLogin } from '../models/UserLogin';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  user: UserLogin;
  userLog: UserLogin;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.user = this.loginForm.value;

    this.userService.login(this.user).subscribe(data => { console.log(data); this.router.navigateByUrl('/'); });
  }
}