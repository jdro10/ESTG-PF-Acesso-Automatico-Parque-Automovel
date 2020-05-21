import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm;
  user: User;
  
  constructor(private userService: UserService, private formBuilder: FormBuilder) { 
    this.signUpForm = this.formBuilder.group({
      number: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      plate: new FormControl(''),
      car_brand: new FormControl(''),
      car_model: new FormControl(''),
      type: new FormControl('')
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.user = this.signUpForm.value;
    this.userService.createUser(this.user).subscribe();
  }
}