import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ ReactiveFormsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // IMPLEMENT TESTS HERE
  it('should search for city', () =>  {
    component.searchForm.get('cityName').setValue('London');
    spyOn(component.selectedCity, 'emit');

    component.search();

    expect(component.selectedCity.emit).toHaveBeenCalledWith('london');
  });

  it('should not search for a city when cityName val is empty', () => {
    component.searchForm.get('cityName').setValue('');
    spyOn(component.selectedCity, 'emit');
    
    component.search();

    expect(component.selectedCity.emit).not.toHaveBeenCalled();
  }); 
  
  it('should build the search form when buildForm is called', () => {
    component.searchForm = null;
    component['buildForm']();
    expect(component.searchForm).toBeDefined();
  }); 
});
