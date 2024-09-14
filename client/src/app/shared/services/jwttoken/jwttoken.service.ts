import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwttokenService {
  jwtToken: string;
  decodedtoken: {[key: string]: string};

  constructor() { }
  setToken(token: string) {
    if(token) {
      this.jwtToken = token;
    }
  }
  
}
