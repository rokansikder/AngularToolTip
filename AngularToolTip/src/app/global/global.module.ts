import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipService } from '../services/tooltip.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GlobalModule {
  static forRoot(){
    return{
      ngModule:GlobalModule,
      providers: [TooltipService]
    }
  }
 }
