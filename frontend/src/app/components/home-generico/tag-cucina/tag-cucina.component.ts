import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Tag } from '../../../interfaces/tag';
import { CommonModule } from '@angular/common';
import { TagCucinaService } from '../../../services/home-generico/tag-cucina.service';

@Component({
  selector: 'app-tag-cucina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-cucina.component.html',
  styleUrl: './tag-cucina.component.css',
})
export class TagCucinaComponent {
  @Input() ristoranteId: number | undefined;
  tagList: Tag[] = [];

  constructor(private tagService: TagCucinaService) {}

  ngOnInit() {
    if (this.ristoranteId) {
      this.getTagForRistorante(this.ristoranteId);
    }
  }

  getTagForRistorante(id: number): void {
    this.tagService.getTagsByRestaurantId(id).subscribe({
      next: (tags: Tag[]) => {
        if (tags) {
          this.tagList = tags;
        }
      },
    });
  }

  getTagNames(): string {
    return this.tagList.map((tag) => tag.name).join(', ');
  }
}
