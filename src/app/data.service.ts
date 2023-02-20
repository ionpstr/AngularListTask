import { Injectable, OnInit } from '@angular/core';
import { groups } from '../assets/data';
import { Item } from './types/item';
import { User } from './types/user';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: Item[];
  disable: boolean = true;
  filter(item: string, arr: Array<Item | User>) {
    let filtered = arr.filter((val) => {
      if (
        'groupName' in val &&
        val.groupName.toLowerCase().includes(item.toLowerCase())
      ) {
        return true;
      } else if (
        'fullName' in val &&
        val.fullName.toLowerCase().includes(item.toLowerCase())
      ) {
        return true;
      } else return false;
    });
    return filtered;
  }
  constructor() {
    this.data = groups.sort((a, b) => {
      if (a.warning && b.warning) {
        if (a.groupName.toLowerCase() > b.groupName.toLowerCase()) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.warning) {
        return 1;
      } else if (b.warning) {
        return 1;
      } else {
        if (a.groupName.toLowerCase() > b.groupName.toLowerCase()) {
          return 1;
        } else {
          return -1;
        }
      }
    });
  }
  sort() {
    this.data.sort((a, b) => {
      if (a.warning && !b.warning) {
        return -1;
      } else if (!a.warning && b.warning) {
        return 1;
      }

      if (a.groupName.toLowerCase() > b.groupName.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
