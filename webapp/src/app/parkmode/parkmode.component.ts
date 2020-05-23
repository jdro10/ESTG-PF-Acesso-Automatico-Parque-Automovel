import { Component, OnInit } from '@angular/core';
import { ParkAccessService } from '../services/park-access.service';
import { ParkMode } from '../models/ParkMode';

@Component({
  selector: 'app-parkmode',
  templateUrl: './parkmode.component.html',
  styleUrls: ['./parkmode.component.css']
})
export class ParkmodeComponent implements OnInit {
  parkMode: ParkMode;
  parkM: string;

  constructor(private parkAccessService: ParkAccessService) { }

  ngOnInit(): void {
    this.parkAccessService.getParkMode().subscribe(parkMode => {
      this.parkMode = parkMode;
    });
  }

  changeParkMode(): void {
    if (this.parkMode.parkMode == "CLOSED") {
      this.parkM = "OPEN";
    } else {
      this.parkM = "CLOSED";
    }
    var mode = JSON.stringify({ parkMode: this.parkM });

    this.parkAccessService.changeParkMode(mode).subscribe(() =>
      this.parkAccessService.getParkMode().subscribe(parkMode => {
        this.parkMode = parkMode;
      })
    );
  }
}
