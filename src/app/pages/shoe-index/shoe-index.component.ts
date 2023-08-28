import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shoe } from 'src/app/models/shoe.model';
import { ShoeService } from 'src/app/services/shoe.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ShoeIndex',
  templateUrl: './shoe-index.component.html',
  styleUrls: ['./shoe-index.component.scss']
})
export class ShoeIndexComponent implements OnInit, OnDestroy {

  constructor(private shoeService: ShoeService) { }
  shoes$!: Observable<Shoe[]>
  ngOnInit(): void {
    this.shoes$ = this.shoeService.shoes$
   
  }
  ngOnDestroy(): void {

  }
}
