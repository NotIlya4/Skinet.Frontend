import { Injectable } from '@angular/core';
import {IJwtTokenPair} from "../../models/jwt-token-pair";
import {BehaviorSubject, Observable} from "rxjs";
import {SimpleLocalStorage} from "../simple-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthStorage {
  private KEY: string = 'jwtTokenPair';
  private jwtTokenPairSource: BehaviorSubject<IJwtTokenPair | null> = new BehaviorSubject<IJwtTokenPair | null>(this.read());

  constructor(private storage: SimpleLocalStorage) {
  }

  get jwtTokenPair$(): Observable<IJwtTokenPair | null> {
    return this.jwtTokenPairSource.asObservable();
  }

  save(jwtTokenPair: IJwtTokenPair): void {
    this.storage.set(this.KEY, jwtTokenPair);
    this.jwtTokenPairSource.next(jwtTokenPair);
  }

  read(): IJwtTokenPair | null {
    return this.storage.get(this.KEY);
  }

  public clearJwtPair(): void {
    this.storage.remove(this.KEY);
    this.jwtTokenPairSource.next(null);
  }
}
