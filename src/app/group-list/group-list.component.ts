import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../types/item';
import { Router } from '@angular/router';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent {
  items: Item[];
  showMenu: boolean = false;
  filterRow(val: string) {
    val = val.trim();
    this.items = this.dataService.data;
    if (val != '') {
      this.items = this.dataService.filter(val, this.items) as Item[];
    }
  }
  navigate(id: number) {
    this.dataService.disable = true;
    this.router.navigate(['/', 'detail', id]);
  }
  nuovo() {
    this.dataService.disable = false;
    this.router.navigate(['/', 'detail', 'nuovo']);
  }
  deleteRow(item: Item) {
    let k;
    k = this.items.find((i) => i.id == item.id);
    if (k) {
      this.items.splice(this.items.indexOf(k), 1);
    }
  }
  constructor(public dataService: DataService, private router: Router) {
    this.items = dataService.data;
  }
}
