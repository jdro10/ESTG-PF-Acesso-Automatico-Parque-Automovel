import { Component, OnInit, SimpleChange } from '@angular/core';
import { ParkAccessService } from '../services/park-access.service';
import { ParkAccess } from '../models/ParkAccess';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-parkaccess',
  templateUrl: './parkaccess.component.html',
  styleUrls: ['./parkaccess.component.css']
})
export class ParkaccessComponent implements OnInit {
  
  parkAccess: ParkAccess[];
  date: NgbDateStruct;
  todayDateS: string;
  nDate: Date;
  dateString: string;
  count: number;

  constructor(private parkAccessService: ParkAccessService, private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.count = 0;
    this.parkAccessService.getParkAccess(this.todayDate()).subscribe(parkAccess => {
      this.parkAccess = parkAccess;
    });
  }

  todayDate(): string {
    this.date = this.calendar.getToday();

    if (this.date.month >= 1 && this.date.month < 10) {
      return this.todayDateS = this.date.year + '-0' + this.date.month + '-' + this.date.day;
    } else {
      return this.todayDateS = this.date.year + '-' + this.date.month + '-' + this.date.day;
    }
  }

  traverseDate(): string {
    this.count++;
    this.nDate = new Date(this.date.year, this.date.month, this.date.day - this.count);

    if (this.date.month >= 1 && this.date.month < 10) {
      if (this.nDate.getDate() >= 1 && this.nDate.getDate() < 10) {
        this.dateString = this.nDate.getFullYear() + "-0" + this.nDate.getMonth() + "-0" + this.nDate.getDate();
      } else {
        this.dateString = this.nDate.getFullYear() + "-0" + this.nDate.getMonth() + "-" + this.nDate.getDate();
      }
    } else {
      if (this.nDate.getDate() >= 1 && this.nDate.getDate() < 10) {
        this.dateString = this.nDate.getFullYear() + "-0" + this.nDate.getMonth() + "-0" + this.nDate.getDate();
      } else {
        this.dateString = this.nDate.getFullYear() + "-0" + this.nDate.getMonth() + "-" + this.nDate.getDate();
      }
    }

    return this.dateString;
  }

  traverseDate2(): string {
    this.count++;
    this.nDate = new Date(this.date.year, this.date.month, this.date.day + this.count);

    if (this.date.month >= 1 && this.date.month < 10) {
      if (this.nDate.getDate() >= 1 && this.nDate.getDate() < 10) {
        this.dateString = this.nDate.getFullYear() + "-0" + this.nDate.getMonth() + "-0" + this.nDate.getDate();
      } else {
        this.dateString = this.nDate.getFullYear() + "-0" + this.nDate.getMonth() + "-" + this.nDate.getDate();
      }
    } else {
      if (this.nDate.getDate() >= 1 && this.nDate.getDate() < 10) {
        this.dateString = this.nDate.getFullYear() + "-0" + this.nDate.getMonth() + "-0" + this.nDate.getDate();
      } else {
        this.dateString = this.nDate.getFullYear() + "-0" + this.nDate.getMonth() + "-" + this.nDate.getDate();
      }
    }
    return this.dateString;
  }

  dayBefore(): void {
    this.parkAccessService.getParkAccess(this.traverseDate()).subscribe(parkAccess => {
      this.parkAccess = parkAccess;
    });
  }

  nextDay(): void {
    this.parkAccessService.getParkAccess(this.traverseDate2()).subscribe(parkAccess => {
      this.parkAccess = parkAccess;
    });
  }

  searchDate(): void {
    var inputDate = (<HTMLInputElement>document.getElementById("dataSearch")).value;

    this.parkAccessService.getParkAccess(inputDate).subscribe(parkAccess => {
      this.parkAccess = parkAccess;
    });
  }
}