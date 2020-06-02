import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';

import { UserLogin } from '../models/UserLogin';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  loginMsg;
  user: UserLogin;
  userLog: UserLogin;

  constructor(private formBuilder: FormBuilder, private webService: WebService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.user = this.loginForm.value;

    this.webService.login(this.user).subscribe(loginMsg => {
      this.loginMsg = loginMsg;

      if (loginMsg.success) {
        this.router.navigate(['/home']);
      } else {
        alert(this.loginMsg.error);
      }
    }); 
  }
}