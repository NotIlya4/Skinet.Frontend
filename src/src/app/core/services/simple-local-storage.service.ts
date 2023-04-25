import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleLocalStorage {
  public get<T>(key: string): T | null {
    const rawData: string | null = localStorage.getItem(key);
    if (rawData === null) {
      return null;
    }
    return JSON.parse(rawData);
  }

  public set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public pop<T>(key: string): T | null {
    const result: T | null = this.get<T>(key);
    this.remove(key);
    return result;
  }
}
