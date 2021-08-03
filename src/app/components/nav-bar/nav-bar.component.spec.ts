import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';

import { NavBarComponent } from './nav-bar.component';




describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      imports:[MatDividerModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render  web site title in a h2 tag',()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Weather App');
  })

  it('All nav bar elements should have a cursor pointer',()=>{
    const compiled = fixture.debugElement.nativeElement;
    //title
    let titleWrapper = compiled.querySelector('h2').parentElement
    expect(window.getComputedStyle(titleWrapper).cursor).toEqual('pointer');
    // ul's 
    [1,2].map(i => {
      let ul = compiled.querySelector(`ul:nth-child(${i})`);
      expect(window.getComputedStyle(ul).cursor).toEqual('pointer');
    })
  })

  it('All nav bar elements should have a correct link',()=>{
    /** need to implements */
  })
});


