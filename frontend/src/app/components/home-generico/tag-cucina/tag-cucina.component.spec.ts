import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagCucinaComponent } from './tag-cucina.component';
import { CommonModule } from '@angular/common';
import { Tag } from '../../../interfaces/tag';
import { TagCucinaService } from '../../../services/home-generico/tag-cucina.service';
import { of } from 'rxjs';

describe('TagCucinaComponent Integration Test', () => {
  let component: TagCucinaComponent;
  let fixture: ComponentFixture<TagCucinaComponent>;
  let tagCucinaService: TagCucinaService;
  const mockTagList: Tag[] = [
    { id: 1, name: 'Italiana', description: 'Cucina italiana' },
    { id: 2, name: 'Indiana', description: 'Cucina indiana' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [
        { provide: TagCucinaService, useClass: MockTagCucinaService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCucinaComponent);
    component = fixture.componentInstance;
    tagCucinaService = TestBed.inject(TagCucinaService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve tag list from service', () => {
    spyOn(tagCucinaService, 'getTagsByRestaurantId').and.returnValue(
      of(mockTagList),
    );
    component.ristoranteId = 1;
    fixture.detectChanges();
    expect(component.tagList).toEqual(mockTagList);
  });

  it('should display tag names', () => {
    component.tagList = mockTagList;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Italiana');
    expect(compiled.textContent).toContain('Indiana');
  });

  it('should return tag names', () => {
    component.tagList = mockTagList;
    const tagNames = component.getTagNames();
    expect(tagNames).toEqual('Italiana, Indiana');
  });
});

// Mock service
class MockTagCucinaService {
  getTagsByRestaurantId(restaurantId: number) {
    return of([]);
  }
}
