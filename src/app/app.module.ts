import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupItemComponent } from './group-list/group-item/group-item.component';
import { ItemDetailComponent } from './group-list/item-detail/item-detail.component';
import { ToggleDirective } from './item-detail/toggle.directive';
import { WarningDirective } from './item-detail/warning.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from './item-detail/disable-control.directive';
const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
  },
  { path: 'detail/:id', component: ItemDetailComponent },
  { path: 'detail/nuovo', component: ItemDetailComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupItemComponent,
    ItemDetailComponent,
    ToggleDirective,
    WarningDirective,
    DisableControlDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
