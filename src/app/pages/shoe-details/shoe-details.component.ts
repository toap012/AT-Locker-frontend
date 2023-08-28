import { Location } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Shoe } from 'src/app/models/shoe.model';
import { ShoeService } from 'src/app/services/shoe.service';

@Component({
  selector: 'app-shoe-details',
  templateUrl: './shoe-details.component.html',
  styleUrls: ['./shoe-details.component.scss']
})
export class ShoeDetailsComponent implements OnInit, OnDestroy {

  constructor(
    // DI
    private shoeService: ShoeService,
    private route: ActivatedRoute,
  ) { }
  // DI
  private router = inject(Router)
  private location = inject(Location)

  shoe$!: Observable<Shoe>
  shoe!: Shoe

  ngOnInit() {
    this.shoe$ = this.route.data.pipe(map(data => data['shoe']))
  }
  ngOnDestroy(): void {

  }

  onBack(){
   this.router.navigateByUrl('/shoe')
    
  }
}
