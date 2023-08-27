import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../services/shoe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private shoeService: ShoeService) { }

  title = 'AT Locker';

  ngOnInit(): void {
    this.shoeService.query()
      .pipe(take(1))
      .subscribe({
        error: err => console.log('err:', err)

      })
  }
}
