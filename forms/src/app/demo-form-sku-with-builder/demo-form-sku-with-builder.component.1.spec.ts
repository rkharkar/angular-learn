import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DemoFormSkuWithBuilderComponent } from './demo-form-sku-with-builder.component';
import { ConsoleSpy, dispatchEvent } from '../utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('DemoFormSkuWithBuilderComponent (long)', () => {
  let fixture: ComponentFixture<DemoFormSkuWithBuilderComponent>;

  let originalConsole: Console, fakeConsole: ConsoleSpy;
  let el: Element, input, form;

  beforeEach(async () => {
    fakeConsole = new ConsoleSpy();
    originalConsole = window.console;
    (<any>window).console = fakeConsole;
    
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [DemoFormSkuWithBuilderComponent]
    })
    .compileComponents();
  });

  it('validates and triggers events', fakeAsync(() => {
    fixture = TestBed.createComponent(DemoFormSkuWithBuilderComponent);
    el = fixture.debugElement.nativeElement;
    input = fixture.debugElement.query(By.css('input')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();

    input.value = '';
    dispatchEvent(input, 'input');
    fixture.detectChanges();
    tick();

    let msgs = el.querySelectorAll('.ui.error.message');
    expect(msgs[0].innerHTML).toContain('SKU is required');
    expect(msgs[1].innerHTML).toContain('SKU must begin with');

    input.value = '123-XYZ';
    dispatchEvent(input, 'input');
    fixture.detectChanges();
    tick();

    msgs = el.querySelectorAll('.ui.error.message');
    expect(msgs.length).toEqual(0);

    fixture.detectChanges();
    dispatchEvent(form, 'submit');
    tick();

    expect(fakeConsole.logs).toContain('You submitted value:  123-XYZ');
  }))

  afterAll(() => (<any>window).console = originalConsole);
});
