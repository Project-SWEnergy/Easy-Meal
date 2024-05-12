import { Component, VERSION } from '@angular/core';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  angularVersion = VERSION.full;
}
