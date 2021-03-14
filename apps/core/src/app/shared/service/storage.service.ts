import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { }

  set(key: string, value: any): Promise<void> {
    return this.storage.set(key, value);
  }

  get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  remove(key: string): Promise<void> {
    return this.storage.remove(key);
  }
}
