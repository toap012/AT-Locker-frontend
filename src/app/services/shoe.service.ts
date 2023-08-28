import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { storageService } from './async-storage.service';
import { FilterBy, Shoe } from '../models/shoe.model';
const ENTITY = 'shoes'

@Injectable({
  providedIn: 'root'
})
export class ShoeService {
  constructor() {
    const shoes = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!shoes || shoes.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createShoes()))
    }
  }

  private _shoes$ = new BehaviorSubject<Shoe[]>([]);
  public shoes$ = this._shoes$.asObservable()

  private _filterBy$ = new BehaviorSubject<FilterBy>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable()


  public query() {
    return from(storageService.query(ENTITY))
      .pipe(
        tap(shoes => {
          const filterBy = this._filterBy$.value
          shoes = shoes.filter(shoe => shoe.name.toLowerCase().includes(filterBy.term.toLowerCase()))
          this._shoes$.next(shoes)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getEmptyShoe() {
    return { name: '', description: '', image: '', price: NaN }
  }

  public remove(shoeId: string) {
    return from(storageService.remove(ENTITY, shoeId))
      .pipe(
        tap(() => {
          const shoes = this._shoes$.value
          const shoeIdx = shoes.findIndex(shoe => shoe._id === shoeId)
          shoes.splice(shoeIdx, 1)
          this._shoes$.next([...shoes]);
          return shoeId
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getById(shoeId: string): Observable<Shoe> {
    return from(storageService.get(ENTITY, shoeId))
      .pipe(
        retry(1),
        catchError(this._handleError)
      )
  }

  public save(shoe: Shoe) {
    return shoe._id ? this._edit(shoe) : this._add(shoe)
  }

  public setFilterBy(filterBy: FilterBy) {
    this._filterBy$.next(filterBy)
    this.query().subscribe()
  }

  private _add(shoe: Shoe) {
    return from(storageService.post(ENTITY, shoe))
      .pipe(
        tap(newShoe => {
          const shoes = this._shoes$.value
          shoes.push(newShoe)
          this._shoes$.next([...shoes])
          return newShoe
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _edit(shoe: Shoe) {
    return from(storageService.put(ENTITY, shoe))
      .pipe(
        tap(updatedShoe => {
          const shoes = this._shoes$.value
          const shoeIdx = shoes.findIndex(_shoe => _shoe._id === shoe._id)
          shoes.splice(shoeIdx, 1, updatedShoe)
          this._shoes$.next([...shoes])
          return updatedShoe
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _createShoes() {
    const shoes: Shoe[] = [
      {
        "_id": this._makeId(4),
        "name": "Wild Rider Layers Unisex Sneakers",
        "price": 121,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/02/sv01/fnd/IND/fmt/png/,Wild-Rider-Layers-Unisex-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Wild Rider Layers 2 Unisex Sneakers",
        "price": 151,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/03/sv01/fnd/IND/fmt/png/Wild-Rider-Layers-Unisex-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Wild Rider Layers Unisex3 sneakers",
        "price": 161,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/01/sv01/fnd/IND/fmt/png/Wild-Rider-Layers-Unisex-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "PUMA Serve Pro Lite Unisex shoes",
        "price": 261,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374902/01/sv01/fnd/IND/fmt/png/PUMA-Serve-Pro-Lite-Unisex-Shoes",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "PUMA Serve Pro Lite Unisex",
        "price": 321,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374902/11/sv01/fnd/IND/fmt/png/PUMA-Serve-Pro-Lite-Unisex-Shoes",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "one8 Virat Kohli Basket Classice Unisex Sneakers",
        "price": 371,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/375314/01/sv01/fnd/IND/fmt/png/one8-Virat-Kohli-Basket-Classic-Unisex-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Caracal SoftFoam+Sneakers",
        "price": 171,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/369863/18/sv01/fnd/IND/fmt/png/Caracal-SoftFoam+-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Mirage Mox Brightly Packed Shoes",
        "price": 271,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/375168/01/sv01/fnd/IND/fmt/png/Mirage-Mox-Brightly-Packed-Shoes",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Future Rider Play On Unisex Sneakers",
        "price": 571,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/69/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Future Rider2 Play On Unisex Sneakers",
        "price": 571,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/68/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Future Rider3 Play On Unisex Sneakers",
        "price": 571,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371149/72/sv01/fnd/IND/fmt/png/Future-Rider-Play-On-Unisex-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Rebound Lay-Up Lo SoftFoam+Mesh Shoes",
        "price": 571,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/370914/01/sv01/fnd/IND/fmt/png/Rebound-Lay-Up-Lo-SoftFoam+-Mesh-Shoes",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "one8 Virat Kohli Basket Classic Unisex Sneakers",
        "price": 471,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1500,h_1500/global/375314/02/sv01/fnd/IND/fmt/png/one8-Virat-Kohli-Basket-Classic-Unisex-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Mirage Mox Brightly Packed Shoes",
        "price": 271,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/375168/01/sv01/fnd/IND/fmt/png/Mirage-Mox-Brightly-Packed-Shoes",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "PUMA Backcourt IMEVA Mid Sneakers",
        "price": 471,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/374139/01/sv01/fnd/IND/fmt/png/PUMA-Backcourt-IMEVA-Mid-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Redon Move Shoes",
        "price": 771,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/185999/02/sv01/fnd/IND/fmt/png/Redon-Move--Shoes",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Puma Perforated Low Men's IDP Shoes",
        "price": 871,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/372981/01/sv01/fnd/IND/fmt/png/Puma-Perforated-Low-Men's--IDP-Shoes",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "RS-2K Internet Exploring Sneakers",
        "price": 971,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/373309/21/sv01/fnd/IND/fmt/png/RS-2K-Internet-Exploring-Sneakers",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "X-Ray 2 Square IMEVA SoftFoam+ Shoes",
        "price": 271,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/373108/13/sv01/fnd/IND/fmt/png/X-Ray-2-Square-IMEVA-SoftFoam+-Shoes",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      },
      {
        "_id": this._makeId(4),
        "name": "Future Rider International Game Shoes",
        "price": 171,
        "image": "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/375971/01/sv01/fnd/IND/fmt/png/Future-Rider-International-Game-Shoes",
        "description": "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex. With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family."
      }
    ]
    return shoes
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }

  private _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

