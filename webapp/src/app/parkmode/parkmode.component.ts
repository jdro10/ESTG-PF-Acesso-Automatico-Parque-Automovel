import { Component, OnInit } from '@angular/core';
import { ParkAccessService } from '../services/park-access.service';
import { ParkMode } from '../models/ParkMode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parkmode',
  templateUrl: './parkmode.component.html',
  styleUrls: ['./parkmode.component.css']
})
export class ParkmodeComponent implements OnInit {
  parkMode: ParkMode;
  parkM: string;

  constructor(private parkAccessService: ParkAccessService, private router: Router) { }

  ngOnInit(): void {
    this.parkAccessService.getParkMode().subscribe(parkMode => 
      this.parkMode = parkMode,
      error => this.router.navigate([''])
    );
  }

  changeParkMode(): void {
    if (this.parkMode.parkMode == "CLOSED") {
      this.parkM = "OPEN";
    } else {
      this.parkM = "CLOSED";
    }
    var mode = JSON.stringify({ parkMode: this.parkM });

    this.parkAccessService.changeParkMode(mode).subscribe(() =>
      this.parkAccessService.getParkMode().subscribe(parkMode =>
        this.parkMode = parkMode,
        error => this.router.navigate([''])
      )
    );
  }
}
