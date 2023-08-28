import { ResolveFn } from '@angular/router';
import { Shoe } from '../models/shoe.model';
import { inject } from '@angular/core';
import { ShoeService } from '../services/shoe.service';


export const shoeResolver: ResolveFn<Shoe> = (route, state) => {
  const id = route.params['id']
  return inject(ShoeService).getById(id)
};
