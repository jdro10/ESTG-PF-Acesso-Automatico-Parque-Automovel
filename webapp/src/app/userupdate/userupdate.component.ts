import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserUpdate } from '../models/UserUpdate';
import { FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {
  userNumber: string;
  user: UserUpdate;
  updateForm;
  userRes: UserUpdate;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService) {
    this.userNumber = this.route.snapshot.paramMap.get('numero');

    this.updateForm = this.formBuilder.group({
      number: parseInt(this.userNumber),
      plate: new FormControl(''),
      car_brand: new FormControl(''),
      car_model: new FormControl(''),
      type: new FormControl('')
    });
  }

  ngOnInit(): void {
    
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;
  }

  onSubmit() {
    this.user = this.updateForm.value;

    this.userService.updateUser(this.user).subscribe(userRes => { this.userRes = userRes, this.alert()});
  }

  alert(){
    if(this.userRes.number){
      alert("Novo carro adicionado.")
    } else {
      alert("Campos inválidos ou matrícula existente/inválido.")
    }
  }
}
