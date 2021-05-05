import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  name = 'Angular 6';
  timeLeft: number = 60 * 60;
  interval;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;

  constructor() {}

  ngOnInit(): void {
    this.calculateHoursMinuteSecondsInTimeLeft();
  }

  startTimer() {
    console.log(this.timeLeft);
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.calculateHoursMinuteSecondsInTimeLeft();
      } else {
        this.timeLeft = 60 * 60;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.pauseTimer();
    this.timeLeft = 60 * 60;
    this.calculateHoursMinuteSecondsInTimeLeft();
  }

  calculateHoursMinuteSecondsInTimeLeft() {
    this.hoursLeft = Math.floor(this.timeLeft / 3600);
    this.minutesLeft = Math.floor((this.timeLeft - this.hoursLeft * 3600) / 60);
    this.secondsLeft =
      this.timeLeft - this.hoursLeft * 3600 - this.minutesLeft * 60;
  }
}
