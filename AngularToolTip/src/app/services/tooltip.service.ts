import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  private buttonRef;
  constructor() { }

  public setValue(value){
    this.buttonRef = value;
  }

  public getValue(){
    return this.buttonRef;
  }

  public clearTooltip(){
    if(this.buttonRef && this.buttonRef.renderer){
      try{
        if (this.buttonRef.tooltip) this.buttonRef.renderer.removeClass(this.buttonRef.tooltip, 'ng-tooltip-show');
        if(this.buttonRef.tooltip)this.buttonRef.renderer.removeChild(document.body, this.buttonRef.tooltip);
      } catch(e){
        console.log(e);
      }      
      this.buttonRef.tooltip = null;
    }
  }
}
