import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfimDialogComponent } from './comfim-dialog.component';

describe('ComfimDialogComponent', () => {
  let component: ComfimDialogComponent;
  let fixture: ComponentFixture<ComfimDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComfimDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
