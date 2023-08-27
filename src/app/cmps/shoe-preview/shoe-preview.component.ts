import { Component, Input } from '@angular/core';
import { Shoe } from 'src/app/models/shoe.model';

@Component({
  selector: 'app-shoe-preview',
  templateUrl: './shoe-preview.component.html',
  styleUrls: ['./shoe-preview.component.scss']
})
export class ShoePreviewComponent {
  @Input() shoe!: Shoe
}
