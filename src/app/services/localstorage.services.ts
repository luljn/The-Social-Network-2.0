import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageSub = new BehaviorSubject<boolean>(false);

  watchStorage(){

    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any){

    localStorage.setItem(key, data);
    this.storageSub.next(true);
  }

  removeItem(key: string){

    localStorage.removeItem(key);
    this.storageSub.next(true);
  }

  getItem(key: string){
    
    return localStorage.getItem(key);
  }
}
