import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-demo-form-sku-with-builder',
    templateUrl: './demo-form-sku-with-builder.component.html',
    styleUrls: ['./demo-form-sku-with-builder.component.css'],
    standalone: false
})
export class DemoFormSkuWithBuilderComponent implements OnInit {
  myForm: FormGroup;
  sku: AbstractControl;

  skuValidator(control: FormControl): { [s: string]: boolean} | null {
    if (!control.value.match(/^123/)) {
      return {invalidSku: true};
    }
    return null;
  }

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      sku: ['', Validators.compose([
        Validators.required, this.skuValidator
      ])]
    });

    this.sku = this.myForm.controls['sku'];

    this.sku.valueChanges.subscribe(
      (value: string) => {
        console.log('value changed to: ', value);
      }
    );

    this.myForm.valueChanges.subscribe(
      (value: any) => {
        console.log('form changed to: ', value);
      }
    );
  }

  ngOnInit(): void {}

  onSubmit(value: any): void {
    console.log('You submitted value: ', value.sku);
  }

  getFormControl(controlName: string): FormControl {
    return this.myForm.get(controlName) as FormControl;
  }
}
