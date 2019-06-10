import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
import {TooltipService} from '../services/tooltip.service';
@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') tooltipTitle: string;
  @Input() placement: string;
  @Input() delay: number;
  tooltip: HTMLElement;
  
  offset = 10;

  constructor(private el: ElementRef, private renderer: Renderer2, private toolTipService: TooltipService) { }

  @HostListener('click') onClick() {
    if (!this.tooltip) { 
      this.show(); 
      let buttonRef = this.toolTipService.getValue();
      if(buttonRef){          
          if(this.el.nativeElement.id !== buttonRef.el.nativeElement.id){            
            this.toolTipService.clearTooltip();
          }
      }
      this.toolTipService.setValue(this);
    }
  }

  @HostListener('window:scroll', ['$event.target'])
  public onScroll(target){    
    console.log('scroll');
    if(this.tooltip){
      
      let tooltipPosition = this.tooltip.getBoundingClientRect();
      let elementRect = this.el.nativeElement.getBoundingClientRect();

      if(tooltipPosition.top < 0 && this.placement != "bottom"){
          this.placement = "bottom";
          this.setPosition();
          this.changeTooltipClass('top');
      }
      else if(tooltipPosition.height  < elementRect.top && this.placement != "top"){
          this.placement = "top";
          this.setPosition();
          this.changeTooltipClass('bottom');
      }
    }
  }
 
  changeTooltipClass(replacePlacement){
    this.renderer.removeClass(this.tooltip, `ng-tooltip-${replacePlacement}`);
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);
  }
  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  create() {
    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle) // textNode
    );

    this.renderer.appendChild(document.body, this.tooltip);
  
    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);
  
    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {
  
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const tooltipPos = this.tooltip.getBoundingClientRect();

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
