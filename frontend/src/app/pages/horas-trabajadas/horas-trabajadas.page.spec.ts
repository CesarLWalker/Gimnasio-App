import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorasTrabajadasPage } from './horas-trabajadas.page';

describe('HorasTrabajadasPage', () => {
  let component: HorasTrabajadasPage;
  let fixture: ComponentFixture<HorasTrabajadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasTrabajadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
