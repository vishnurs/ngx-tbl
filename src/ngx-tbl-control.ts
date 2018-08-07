import { Directive, Output, Input, ElementRef, Renderer2,
  Attribute } from '@angular/core';
 import { FormControl, ControlContainer, 
   FormGroupDirective, Validators } from '@angular/forms';
 
 @Directive({
   selector: '[formControlName][ngx-tbl-control]',
 })
 
 export class NgxTblControl {
   @Input('validators') validators;
   private form;
   constructor(private container: ControlContainer, @Attribute('formControlName') private name, 
   @Attribute('validation') validation, private renderer: Renderer2, private el: ElementRef) {
     this.form = (this.container as FormGroupDirective).form;
     this.form.removeControl(this.name);
     if (!this.form.get(this.name)) {
       this.form.addControl(this.name, new FormControl(''));
     }
   }
 }