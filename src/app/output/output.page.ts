import { Component, OnInit } from '@angular/core';
import { Timeobject } from '../home/timeObject.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { TimeCalculatorService } from '../home/time-calculator.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.page.html',
  styleUrls: ['./output.page.scss'],
})
export class OutputPage implements OnInit {
  timeObject: Timeobject;
  private objectSub: Subscription;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private timeObjectService: TimeCalculatorService,
    private alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        console.log('no id');
        this.navController.navigateBack('/home');
        return;
      }      
      this.isLoading = true;
      this.objectSub = this.timeObjectService.getTime(paramMap.get('id'))
        .subscribe(timeObject => {
          this.timeObject = timeObject; 
          this.isLoading = false;
          this.calculateDate();
        }, error => {
          this.alertController.create({
            header: 'Unkown error',
            message: 'Could not load element',
            buttons: [{text: 'Close', handler: () => {
              this.router.navigate(['/home'])
            }}]
          }).then(alertElement => alertElement.present());
        });
    });
  }

  calculateDate() {
    var timeValue = new Date(this.timeObject.timeValue);
    var timeValueArray = timeValue.toDateString().split(/ /);

      var years = parseInt(timeValueArray[3]);
      var months = timeValue.getMonth()+1;
      var days = parseInt(timeValueArray[2]);

      return years.toString()+' '+months.toString()+' '+days.toString()
  }

  ngOnDestroy() {
    if (this.objectSub) {
      this.objectSub.unsubscribe();
    }
  }
}
