import { Component, OnInit, OnDestroy } from '@angular/core';
import { Timeobject } from './timeObject.model';
import { Subscription } from 'rxjs';
import { TimeCalculatorService } from './time-calculator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  loadedTimes: Timeobject[];
  isLoading = false;
  private timesSub: Subscription;

  constructor(
    private timeCalculatorService: TimeCalculatorService) {}

  ngOnInit() {
    this.timesSub = this.timeCalculatorService.times.subscribe(times => {
      this.loadedTimes = times;
    });    
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.timeCalculatorService.fetchTimes().subscribe(() => {
        this.isLoading = false;
      }
    );    
  }

  ngOnDestroy() {
    if (this.timesSub) {
      this.timesSub.unsubscribe();
    }
  }
}
