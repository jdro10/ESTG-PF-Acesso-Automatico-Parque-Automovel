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
  openParkAccess: ParkAccess[];
  date: NgbDateStruct;
  todayDateS: string;
  nDate: Date;
  dateString: string;
  lastdate: Date;

  constructor(private parkAccessService: ParkAccessService, private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.parkAccessService.getParkAccess(this.todayDate()).subscribe(parkAccess => {
      this.parkAccess = parkAccess;
    });
    this.parkAccessService.getOpenParkAccess(this.todayDate()).subscribe(openParkAccess => {
      this.openParkAccess = openParkAccess;
    });
    this.lastdate = new Date(this.date.year, this.date.month, this.date.day);
  }

  todayDate(): string {
    this.date = this.calendar.getToday();

    if (this.date.month >= 1 && this.date.month < 10) {
      return this.todayDateS = this.date.year + '-0' + this.date.month + '-' + this.date.day;
    } else {
      return this.todayDateS = this.date.year + '-' + this.date.month + '-' + this.date.day;
    }
  }

  backDate(): string {
    this.nDate = this.lastdate;
    this.nDate.setDate(this.lastdate.getDate() - 1);

    if (this.nDate.getMonth() >= 1 && this.nDate.getMonth() < 10) {
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

    this.lastdate = this.nDate;

    return this.dateString;
  }

  upDate(): string {
    this.nDate = this.lastdate;
    this.nDate.setDate(this.lastdate.getDate() + 1);

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

    this.lastdate = this.nDate;

    return this.dateString;
  }

  dayBefore(): void {
    var date = this.backDate();
    
    this.parkAccessService.getParkAccess(date).subscribe(parkAccess => {
      this.parkAccess = parkAccess;
    });

    this.parkAccessService.getOpenParkAccess(date).subscribe(openParkAccess => {
      this.openParkAccess = openParkAccess;
    });
  }

  nextDay(): void {
    var date = this.upDate();

    this.parkAccessService.getParkAccess(date).subscribe(parkAccess => {
      this.parkAccess = parkAccess;
    });

    this.parkAccessService.getOpenParkAccess(date).subscribe(openParkAccess => {
      this.openParkAccess = openParkAccess;
    });
  }

  searchDate(): void {
    var inputDate = (<HTMLInputElement>document.getElementById("dataSearch")).value;

    this.parkAccessService.getParkAccess(inputDate).subscribe(parkAccess => {
      this.parkAccess = parkAccess;
    });
  }
}