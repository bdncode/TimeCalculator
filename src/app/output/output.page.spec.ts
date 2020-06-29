import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutputPage } from './output.page';

describe('OutputPage', () => {
  let component: OutputPage;
  let fixture: ComponentFixture<OutputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
