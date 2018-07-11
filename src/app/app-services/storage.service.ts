import { environment } from './../../environments/environment';
import { CipherService } from './cipher.service';
import { Injectable } from '@angular/core';

const NAME = environment.storage.name;
const PLACE = environment.storage.place;

@Injectable()
export class StorageService {

  private storage;

  constructor(
    private cipherService: CipherService
  ) {
    if (PLACE === 'session') {
      this.storage = sessionStorage;
    } else if (PLACE === 'local') {
      this.storage = localStorage;
    } else {
      this.storage = sessionStorage;
    }
  }

  public store(key, value) {

    let body = {};
    const encryptedString = this.storage.getItem(NAME);
    if (encryptedString) {
      body = this.cipherService.decrypt(encryptedString);
    }
    body[key] = value;
    this.storage.setItem(NAME, this.cipherService.encrypt(body));
  }

  public get(key): any {

    const encryptedString = this.storage.getItem(NAME);
    if (encryptedString) {
      const body = this.cipherService.decrypt(encryptedString);
      return body[key];
    } else {
      return null;
    }
  }

  public clear() {
    this.storage.clear();
  }
}
