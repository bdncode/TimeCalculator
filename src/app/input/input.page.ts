import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeCalculatorService } from '../home/time-calculator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
})
export class InputPage implements OnInit {
  form: FormGroup;

  constructor(
    private timeCalculatorService: TimeCalculatorService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      timeObject: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]}),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(1)]})
    });
  }

  onAddTime() {
    if (!this.form.valid) {
      return;
    }
    this.timeCalculatorService.addTime(
      new Date(this.form.value.timeObject), this.form.value.description
    ).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/home']);
    });
  }

}
