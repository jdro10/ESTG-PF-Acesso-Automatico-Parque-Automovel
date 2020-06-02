import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserLogin } from '../models/UserLogin';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-signupadmin',
  templateUrl: './signupadmin.component.html',
  styleUrls: ['./signupadmin.component.css']
})
export class SignupadminComponent implements OnInit {
  user: UserLogin;
  signupAdminForm;
  userRes;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private webService: WebService) {
    this.signupAdminForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;
  }

  onSubmit() {
    this.user = this.signupAdminForm.value;

    this.webService.signupAdmin(this.user).subscribe(userRes => { this.userRes = userRes, this.alert() });
  }

  alert(){
    if(this.userRes.success){
      alert("Novo administrador registado com sucesso.");
    } else {
      alert("Erro, username já existente");
    }
  }
}
