import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { storageService } from './async-storage.service';
import { FilterBy, Shoe } from '../models/shoe.model';
const ENTITY = 'shoes'

@Injectable({
    providedIn: 'root'
})
export class ShoeService {
    constructor(private http: HttpClient) {
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


    public shouldAdoptShoe() {
        return this.http.get<{ answer: string }>('https://yesno.wtf/api')
            .pipe(
                map(res => res.answer),
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    console.log('err:', err)
                    return throwError(() => err)
                })
            )
    }

    public getEmptyShoe() {
        return { name: '', age: 0, birthDate: new Date() }
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
            { _id: 'p123', name: 'Pharoh', type: 'sneakers', createdAt: Date.now(), price: 100, imgUrl: '' },
            { _id: 'p124', name: 'Dues', type: 'sneakers', createdAt: Date.now(), price: 150, imgUrl: '' },
            { _id: 'p125', name: 'Snow', type: 'sneakers', createdAt: Date.now(), price: 120, imgUrl: '' },
            { _id: 'p126', name: 'Doils', type: 'sneakers', createdAt: Date.now(), price: 250, imgUrl: '' },
        ];
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
