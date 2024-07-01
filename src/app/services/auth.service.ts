import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;
  _currentGroups$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  currentGroups$: Observable<string[]> = this._currentGroups$.asObservable();


  constructor() { }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  set isAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  get currentGroups(): string[] {
    return this._currentGroups$.getValue();
  }
}
