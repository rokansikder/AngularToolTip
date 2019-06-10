import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, Route} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipDirective } from './directive/tooltip.directive';
import {GlobalModule} from './global/global.module';
import { HomeComponent } from './Home/home/home.component';

const appRoutes:Routes = [
  {path:'', component:HomeComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    GlobalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
