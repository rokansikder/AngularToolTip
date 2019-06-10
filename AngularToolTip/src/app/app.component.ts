import { Component, HostListener, ViewChild } from '@angular/core';
import { TooltipService } from './services/tooltip.service';
import { TooltipDirective } from './directive/tooltip.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass',
  "../../node_modules/bootstrap/dist/css/bootstrap.min.css"  ]
})
export class AppComponent {
  title = 'Angular Tooltip test';
  
  constructor(private tooltipService: TooltipService){}

  @HostListener('document:click', ['$event.target'])
  public onDocumentClick(targetElement){ 
    if(targetElement.nodeName !== "BUTTON"){
      this.tooltipService.clearTooltip();
    }
  }

  @HostListener('document:keydown.escape', ['$event.target'])
  public onKeydownHandler(target){    
    this.tooltipService.clearTooltip();
  }

}
