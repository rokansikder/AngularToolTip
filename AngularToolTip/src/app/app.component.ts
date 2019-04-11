import { Component, HostListener, ViewChild } from '@angular/core';
import { TooltipService } from './services/tooltip.service';
import { TooltipDirective } from './directive/tooltip.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
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

  @HostListener('window:scroll', ['$event.target'])
  public onScroll(target){
    let tooltipObject = this.tooltipService.getValue();
    
    if(tooltipObject){
      
      let tooltipPosition = tooltipObject.tooltip.getBoundingClientRect();
      let elementRect = tooltipObject.el.nativeElement.getBoundingClientRect();

      if(tooltipPosition.y < 0 && tooltipObject.placement != "bottom"){
          tooltipObject.placement = "bottom";
          this.setPosition("bottom", "top", tooltipObject);
          //tooltipObject.renderer.removeClass(tooltipObject.tooltip, 'ng-tooltip-top');
          //tooltipObject.renderer.addClass(tooltipObject.tooltip, 'ng-tooltip-bottom');
        
      }
      else if(tooltipPosition.height  < elementRect.y && tooltipObject.placement != "top"){
          tooltipObject.placement = "top";
          this.setPosition("top", "bottom", tooltipObject);
         // tooltipObject.renderer.removeClass(tooltipObject.tooltip, 'ng-tooltip-bottom');
          //tooltipObject.renderer.addClass(tooltipObject.tooltip, 'ng-tooltip-top');          
      }
    }
  }

  private setPosition(placement, replacePlacement, tooltipElement){
    let offset = 20;
    const hostPos = tooltipElement.el.nativeElement.getBoundingClientRect();

    const tooltipPos = tooltipElement.tooltip.getBoundingClientRect();

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (placement === 'top') {
      top = hostPos.top - tooltipPos.height - offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (placement === 'bottom') {
      top = hostPos.bottom + offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    tooltipElement.renderer.setStyle(tooltipElement.tooltip, 'top', `${top + scrollPos}px`);
    tooltipElement.renderer.setStyle(tooltipElement.tooltip, 'left', `${left}px`);

    tooltipElement.renderer.removeClass(tooltipElement.tooltip, `ng-tooltip-${replacePlacement}`);
    tooltipElement.renderer.addClass(tooltipElement.tooltip, `ng-tooltip-${placement}`);
  }
}
