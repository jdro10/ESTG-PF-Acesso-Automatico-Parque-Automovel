import { Component, OnInit } from '@angular/core';
import { ParkAccessService } from '../services/park-access.service';
import { ParkAccess } from '../models/ParkAccess';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parkaccess',
  templateUrl: './parkaccess.component.html',
  styleUrls: ['./parkaccess.component.css']
})
export class ParkaccessComponent implements OnInit {

  parkAccess: ParkAccess[];
  openParkAccess: ParkAccess[];
  date: NgbDateStruct;
  todayDateString: string;
  nDate: Date;
  dateString: string;
  lastdate: Date;
  page = 1;
  pageSize = 10;
  collectionSize: number;
  allAccess: ParkAccess[];

  constructor(private parkAccessService: ParkAccessService, private calendar: NgbCalendar, private router: Router) { }

  ngOnInit(): void {
    this.httpRequests(this.todayDate());
    this.lastdate = new Date(this.date.year, this.date.month, this.date.day);
  }

  todayDate(): string {
    this.date = this.calendar.getToday();

    if (this.date.month >= 1 && this.date.month < 10) {
      return this.todayDateString = this.date.year + '-0' + this.date.month + '-' + this.date.day;
    } else {
      return this.todayDateString = this.date.year + '-' + this.date.month + '-' + this.date.day;
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
    
    this.httpRequests(date);
  }

  nextDay(): void {
    var date = this.upDate();

    this.httpRequests(date);
  }

  searchDate(): void {
    var inputDate = (<HTMLInputElement>document.getElementById("dataSearch")).value;

    this.dateString = inputDate;
    this.httpRequests(inputDate);
  }

  httpRequests(date: string): void {
    this.parkAccessService.getParkAccess(date).subscribe(
      parkAccess => this.parkAccess = parkAccess,
      error => this.router.navigate([''])
      
    );

    this.parkAccessService.getOpenParkAccess(date).subscribe(openParkAccess => 
      this.openParkAccess = openParkAccess,
      error => this.router.navigate([''])
    );
  }

  get parkAccessAll(): ParkAccess[] {
    this.collectionSize = this.parkAccess.length + this.openParkAccess.length;
    this.allAccess = this.parkAccess.concat(this.openParkAccess);

    return this.allAccess
      .map((userparkaccess, i) => ({id: i + 1, ...userparkaccess}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}