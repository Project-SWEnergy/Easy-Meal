import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IngredientItemComponent } from './ingredient-item.component';
import { IngredientRistoratoreService } from '../../../services/ristoratore/ingredient.ristoratore.service';
import { OneSelectionService } from '../../../services/ristoratore/ingredient-selection.ristoratore.service';
import { UnitOfMeasurement } from '../../../interfaces/ingredient';

describe('IngredientItemComponent', () => {
  let component: IngredientItemComponent;
  let fixture: ComponentFixture<IngredientItemComponent>;
  let mockIngredientService: jasmine.SpyObj<IngredientRistoratoreService>;
  let mockOneSelectionService: jasmine.SpyObj<OneSelectionService>;

  beforeEach(async () => {
    mockIngredientService = jasmine.createSpyObj(
      'IngredientRistoratoreService',
      ['update', 'delete'],
    );
    mockOneSelectionService = jasmine.createSpyObj('OneSelectionService', [
      'subscribe',
      'unsubscribe',
      'select',
      'deselect',
      'selected',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        NoopAnimationsModule,
        IngredientItemComponent,
      ],
      providers: [
        {
          provide: IngredientRistoratoreService,
          useValue: mockIngredientService,
        },
        { provide: OneSelectionService, useValue: mockOneSelectionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientItemComponent);
    component = fixture.componentInstance;
    component.ingredient = {
      id: 1,
      id_restaurant: 123,
      name: 'Tomato',
      unit_of_measurement: UnitOfMeasurement.g,
    }; // Setup input data
    fixture.detectChanges(); // triggers initial data binding and ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with input ingredient data', () => {
    expect(component.form.get('name')?.value).toEqual('Tomato');
    expect(component.form.get('unit_of_measurement')?.value).toEqual(
      UnitOfMeasurement.g,
    );
  });

  it('should call update service on valid form submission and emit onUpdate', async () => {
    mockIngredientService.update.and.returnValue(Promise.resolve(true));
    spyOn(component.onUpdate, 'emit');

    component.form.setValue({
      name: 'Updated Tomato',
      unit_of_measurement: UnitOfMeasurement.ml,
    });
    component.send_form();

    await fixture.whenStable();
    expect(mockIngredientService.update).toHaveBeenCalled();
    expect(component.onUpdate.emit).toHaveBeenCalled();
  });

  it('should handle deletion and emit onUpdate', async () => {
    mockIngredientService.delete.and.returnValue(Promise.resolve(true));
    spyOn(component.onUpdate, 'emit');

    component.delete();

    await fixture.whenStable();
    expect(mockIngredientService.delete).toHaveBeenCalledWith(1);
    expect(component.onUpdate.emit).toHaveBeenCalled();
  });

  it('should handle selection and deselection', () => {
    component.select();
    expect(mockOneSelectionService.select).toHaveBeenCalledWith(1);

    mockOneSelectionService.selected.and.returnValue(1);
    component.update();
    expect(component.is_selected).toBeTrue();
  });
});
