import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageFormComponent } from './image-form.component';

describe('ImageFormComponent', () => {
  let component: ImageFormComponent;
  let fixture: ComponentFixture<ImageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit file when an image is uploaded', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } };
    spyOn(component.onChange, 'emit');

    component.on_img_uploaded(event);

    expect(component.img).toEqual(file);
    expect(component.onChange.emit).toHaveBeenCalledWith(file);
  });

  it('should generate a preview when a file is uploaded', (done) => {
    const blob = new Blob(['hello'], { type: 'text/plain' });
    const file = new File([blob], 'test.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } };
    const readerSpy = jasmine.createSpyObj('FileReader', [
      'readAsDataURL',
      'onload',
    ]);

    spyOn(window, 'FileReader').and.returnValue(readerSpy);
    readerSpy.readAsDataURL.and.callFake(() => {
      readerSpy.onload({
        target: {
          result:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
        },
      });
      expect(component.uploaded_img).toBe(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      );
      done();
    });

    component.on_img_uploaded(event);

    expect(window.FileReader).toHaveBeenCalled();
  });
});
