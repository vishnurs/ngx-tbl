/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2, Attribute } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';
var NgxTblControl = /** @class */ (function () {
    function NgxTblControl(container, name, validation, renderer, el) {
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
    NgxTblControl.decorators = [
        { type: Directive, args: [{
                    selector: '[formControlName][ngx-tbl-control]',
                },] },
    ];
    /** @nocollapse */
    NgxTblControl.ctorParameters = function () { return [
        { type: ControlContainer, },
        { type: undefined, decorators: [{ type: Attribute, args: ['formControlName',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['validation',] },] },
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    NgxTblControl.propDecorators = {
        "validators": [{ type: Input, args: ['validators',] },],
    };
    return NgxTblControl;
}());
export { NgxTblControl };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRibC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRibC8iLCJzb3VyY2VzIjpbIm5neC10YmwtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFDdEQsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7SUFTdkQsdUJBQW9CLFNBQTJCLEVBQXdDLE1BQzlELFlBQXlCLFFBQW1CLEVBQVUsRUFBYztRQUR6RSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUF3QyxTQUFJLEdBQUosSUFBSTtRQUN6QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUMzRixJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFDLElBQUksQ0FBQyxTQUErQixFQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3REO0tBQ0Y7O2dCQWRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0NBQW9DO2lCQUMvQzs7OztnQkFMcUIsZ0JBQWdCO2dEQVVjLFNBQVMsU0FBQyxpQkFBaUI7Z0RBQzVFLFNBQVMsU0FBQyxZQUFZO2dCQWJxQixTQUFTO2dCQUFyQixVQUFVOzs7K0JBVXpDLEtBQUssU0FBQyxZQUFZOzt3QkFWdEI7O1NBU2MsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT3V0cHV0LCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLFxuICBBdHRyaWJ1dGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiBpbXBvcnQgeyBGb3JtQ29udHJvbCwgQ29udHJvbENvbnRhaW5lciwgXG4gICBGb3JtR3JvdXBEaXJlY3RpdmUsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4gXG4gQERpcmVjdGl2ZSh7XG4gICBzZWxlY3RvcjogJ1tmb3JtQ29udHJvbE5hbWVdW25neC10YmwtY29udHJvbF0nLFxuIH0pXG4gXG4gZXhwb3J0IGNsYXNzIE5neFRibENvbnRyb2wge1xuICAgQElucHV0KCd2YWxpZGF0b3JzJykgdmFsaWRhdG9yczogYW55O1xuICAgcHJpdmF0ZSBmb3JtOiBhbnk7XG4gICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lciwgQEF0dHJpYnV0ZSgnZm9ybUNvbnRyb2xOYW1lJykgcHJpdmF0ZSBuYW1lOiBhbnksIFxuICAgQEF0dHJpYnV0ZSgndmFsaWRhdGlvbicpIHZhbGlkYXRpb246IGFueSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgIHRoaXMuZm9ybSA9ICh0aGlzLmNvbnRhaW5lciBhcyBGb3JtR3JvdXBEaXJlY3RpdmUpLmZvcm07XG4gICAgIHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKHRoaXMubmFtZSk7XG4gICAgIGlmICghdGhpcy5mb3JtLmdldCh0aGlzLm5hbWUpKSB7XG4gICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2wodGhpcy5uYW1lLCBuZXcgRm9ybUNvbnRyb2woJycpKTtcbiAgICAgfVxuICAgfVxuIH0iXX0=