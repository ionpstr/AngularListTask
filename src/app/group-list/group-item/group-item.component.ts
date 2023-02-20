import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Item } from '../../types/item';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css'],
})
export class GroupItemComponent {
  @Input() item!: Item;
  @Input() showMenu: boolean = false;
  @Output('delete') delete: EventEmitter<Item> = new EventEmitter();
  handleMenu(event: Event) {
    this.showMenu = !this.showMenu;
    event.stopPropagation();
  }
  handleModifica() {
    this.dataService.disable = false;

    this.router.navigate(['/', 'detail', this.item.id]);
  }
  deleteRow(item: Item) {
    this.delete.emit(item);
  }
  constructor(public dataService: DataService, public router: Router) {}
}
