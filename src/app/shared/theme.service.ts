import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class ThemeService{
    private otherTheme = new BehaviorSubject<boolean>(true);
    currentTheme = this.otherTheme.asObservable();

    constructor() {}

    changeTheme(value: boolean) {
        this.otherTheme.next(value);
    }
}