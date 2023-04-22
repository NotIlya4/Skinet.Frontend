import { Injectable } from '@angular/core';
import {IJwtTokenPair} from "../../models/jwt-token-pair";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthStorage {
  private KEY: string = 'jwtTokenPair';

  private jwtTokenPairSource: BehaviorSubject<IJwtTokenPair | null> = new BehaviorSubject<IJwtTokenPair | null>(this.read());

  get jwtTokenPair$(): Observable<IJwtTokenPair | null> {
    return this.jwtTokenPairSource.asObservable();
  }

  save(jwtTokenPair: IJwtTokenPair): void {
    this.set(this.KEY, jwtTokenPair);
    this.jwtTokenPairSource.next(jwtTokenPair);
  }

  read(): IJwtTokenPair | null {
    return this.get(this.KEY);
  }

  public clearJwtPair(): void {
    localStorage.removeItem(this.KEY);
    this.jwtTokenPairSource.next(null);
  }

  private get<T>(key: string): T | null {
    const rawData: string | null = localStorage.getItem(key);
    if (rawData === null) {
      return null;
    }
    return JSON.parse(rawData);
  }

  private set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
