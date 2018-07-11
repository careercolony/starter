import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
const SECRET_KEY = environment.cipher.secretKey;

@Injectable()
export class CipherService {

  constructor() { }

  public encrypt(payload): String {

    const encodedString = CryptoJS.AES.encrypt(JSON.stringify(payload), SECRET_KEY);
    return encodedString;
  }

  public decrypt(encodedString): any {

    const payloadBytes = CryptoJS.AES.decrypt(encodedString, SECRET_KEY);
    let decryptedData = {};
    try {
      decryptedData = JSON.parse(payloadBytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      console.error('Exception occurred while parsing decrypted data');
    }
    return decryptedData;
  }

}
