import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Shoe } from 'src/app/models/shoe.model';

@Component({
  selector: 'app-shoe-list',
  templateUrl: './shoe-list.component.html',
  styleUrls: ['./shoe-list.component.scss']
})
export class ShoeListComponent {
  @Input() shoes: Shoe[] | null = null
  @Output() remove = new EventEmitter<string>()

}
