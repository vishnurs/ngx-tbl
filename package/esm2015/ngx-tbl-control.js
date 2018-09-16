/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2, Attribute } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';
export class NgxTblControl {
    /**
     * @param {?} container
     * @param {?} name
     * @param {?} validation
     * @param {?} renderer
     * @param {?} el
     */
    constructor(container, name, validation, renderer, el) {
        this.container = container;
        this.name = name;
        this.renderer = renderer;
        this.el = el;
        this.form = (/** @type {?} */ (this.container)).form;
        this.form.removeControl(this.name);
        if (!this.form.get(this.name)) {
            this.form.addControl(this.name, new FormControl(''));
        }
    }
}
NgxTblControl.decorators = [
    { type: Directive, args: [{
                selector: '[formControlName][ngx-tbl-control]',
            },] },
];
/** @nocollapse */
NgxTblControl.ctorParameters = () => [
    { type: ControlContainer, },
    { type: undefined, decorators: [{ type: Attribute, args: ['formControlName',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['validation',] },] },
    { type: Renderer2, },
    { type: ElementRef, },
];
NgxTblControl.propDecorators = {
    "validators": [{ type: Input, args: ['validators',] },],
};
function NgxTblControl_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxTblControl.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxTblControl.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgxTblControl.propDecorators;
    /** @type {?} */
    NgxTblControl.prototype.validators;
    /** @type {?} */
    NgxTblControl.prototype.form;
    /** @type {?} */
    NgxTblControl.prototype.container;
    /** @type {?} */
    NgxTblControl.prototype.name;
    /** @type {?} */
    NgxTblControl.prototype.renderer;
    /** @type {?} */
    NgxTblControl.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRibC8iLCJzb3VyY2VzIjpbIm5neC10YmwtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFDdEQsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQU16RCxNQUFNOzs7Ozs7OztJQUdKLFlBQW9CLFNBQTJCLEVBQXdDLE1BQzlELFlBQXlCLFFBQW1CLEVBQVUsRUFBYztRQUR6RSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUF3QyxTQUFJLEdBQUosSUFBSTtRQUN6QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUMzRixJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFDLElBQUksQ0FBQyxTQUErQixFQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3REO0tBQ0Y7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0NBQW9DO2FBQy9DOzs7O1lBTHFCLGdCQUFnQjs0Q0FVYyxTQUFTLFNBQUMsaUJBQWlCOzRDQUM1RSxTQUFTLFNBQUMsWUFBWTtZQWJxQixTQUFTO1lBQXJCLFVBQVU7OzsyQkFVekMsS0FBSyxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMixcbiAgQXR0cmlidXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gaW1wb3J0IHsgRm9ybUNvbnRyb2wsIENvbnRyb2xDb250YWluZXIsIFxuICAgRm9ybUdyb3VwRGlyZWN0aXZlLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuIFxuIEBEaXJlY3RpdmUoe1xuICAgc2VsZWN0b3I6ICdbZm9ybUNvbnRyb2xOYW1lXVtuZ3gtdGJsLWNvbnRyb2xdJyxcbiB9KVxuIFxuIGV4cG9ydCBjbGFzcyBOZ3hUYmxDb250cm9sIHtcbiAgIEBJbnB1dCgndmFsaWRhdG9ycycpIHZhbGlkYXRvcnM6IGFueTtcbiAgIHByaXZhdGUgZm9ybTogYW55O1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250YWluZXI6IENvbnRyb2xDb250YWluZXIsIEBBdHRyaWJ1dGUoJ2Zvcm1Db250cm9sTmFtZScpIHByaXZhdGUgbmFtZTogYW55LCBcbiAgIEBBdHRyaWJ1dGUoJ3ZhbGlkYXRpb24nKSB2YWxpZGF0aW9uOiBhbnksIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICB0aGlzLmZvcm0gPSAodGhpcy5jb250YWluZXIgYXMgRm9ybUdyb3VwRGlyZWN0aXZlKS5mb3JtO1xuICAgICB0aGlzLmZvcm0ucmVtb3ZlQ29udHJvbCh0aGlzLm5hbWUpO1xuICAgICBpZiAoIXRoaXMuZm9ybS5nZXQodGhpcy5uYW1lKSkge1xuICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKHRoaXMubmFtZSwgbmV3IEZvcm1Db250cm9sKCcnKSk7XG4gICAgIH1cbiAgIH1cbiB9Il19