import { Component, HostListener } from '@angular/core';
import { TooltipService } from './services/tooltip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'AngularToolTip';

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
