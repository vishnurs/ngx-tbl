import { ElementRef, Renderer2 } from '@angular/core';
import { ControlContainer } from '@angular/forms';
export declare class NgxTblControl {
    private container;
    private name;
    private renderer;
    private el;
    validators: any;
    private form;
    constructor(container: ControlContainer, name: any, validation: any, renderer: Renderer2, el: ElementRef);
}
