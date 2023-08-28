import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Shoe } from 'src/app/models/shoe.model';
import { ShoeService } from 'src/app/services/shoe.service';

@Component({
  selector: 'app-shoe-edit',
  templateUrl: './shoe-edit.component.html',
  styleUrls: ['./shoe-edit.component.scss']
})
export class ShoeEditComponent {
  private shoeService = inject(ShoeService)
  private router = inject(Router)


  shoe = this.shoeService.getEmptyShoe() as Shoe


  onSaveShoe() {
    if (!this.shoe.image) this.shoe.image = 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/02/sv01/fnd/IND/fmt/png/,Wild-Rider-Layers-Unisex-Sneakers'
    this.shoeService.save(this.shoe).subscribe({
      next: () => this.router.navigateByUrl('/shoe'),
      error: err => console.log('err:', err)
    })

  }
}
