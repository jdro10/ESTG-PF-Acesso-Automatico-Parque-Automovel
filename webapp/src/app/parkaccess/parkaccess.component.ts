import { Component, OnInit } from '@angular/core';
import { ParkAccessService } from '../services/park-access.service';

import { ParkAccess } from '../models/ParkAccess';

@Component({
  selector: 'app-parkaccess',
  templateUrl: './parkaccess.component.html',
  styleUrls: ['./parkaccess.component.css']
})
export class ParkaccessComponent implements OnInit {
  parkAccess: ParkAccess[];
  page = 1;
  pageSize = 4;
  collectionSize = 5;

  constructor(private parkAccessService: ParkAccessService) { }

  ngOnInit(): void {
    this.parkAccessService.getParkAccess().subscribe(parkAccess => {
      this.parkAccess = parkAccess;
    });
    console.log(this.parkAccess);
  }

}
