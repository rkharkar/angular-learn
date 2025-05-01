import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing"
import { DemoFormSkuWithBuilderComponent } from "./demo-form-sku-with-builder.component"
import { ConsoleSpy, dispatchEvent } from "../utils";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe('DemoFormSkuWithBuilderComponent', () => {
  let fixture: ComponentFixture<DemoFormSkuWithBuilderComponent>;
  let fakeConsole: ConsoleSpy, originalConsole: Console;
  let el: Element, input: HTMLInputElement, form: HTMLFormElement;

  beforeEach(async () => {
    fakeConsole = new ConsoleSpy();
    originalConsole = window.console;
    (<any>window).console = fakeConsole;

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [DemoFormSkuWithBuilderComponent]
    });
    fixture = TestBed.createComponent(DemoFormSkuWithBuilderComponent);
    el = fixture.debugElement.nativeElement;
    input = fixture.debugElement.query(By.css('input')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
  });

  it('displays errors with no sku', fakeAsync(() => {
    input.value = '';
    dispatchEvent(input, 'input');
    fixture.detectChanges();

    const msgs = el.querySelectorAll('.ui.error.message');
    expect(msgs[0].innerHTML).toContain('SKU is required');
    expect(msgs[1].innerHTML).toContain('SKU must begin with');
    expect(msgs[2].innerHTML).toContain('Form is invalid');
  }));

  it('displays no errors when sku has a proper value', fakeAsync(() => {
    input.value = "123-XYZ";
    dispatchEvent(input, 'input');
    fixture.detectChanges();

    const msgs = el.querySelectorAll('.ui.error.message');
    expect (msgs.length).toEqual(0);
  }));

  it('handles sku value changes', fakeAsync(() => {
    input.value = "123-XYZ";
    dispatchEvent(input, 'input');
    fixture.detectChanges();
    tick();

    expect(fakeConsole.logs).toContain('value changed to:  123-XYZ');
  }));

  it('handles form changes', fakeAsync(() => {
    input.value = "123-XYZ";
    dispatchEvent(input, 'input');
    fixture.detectChanges();
    tick();

    expect(fakeConsole.logs).toContain('form changed to:  [object Object]');
  }));

  it('handles form submission', fakeAsync(() => {
    input.value = "123-ABC";
    dispatchEvent(input, 'input');
    dispatchEvent(form, 'submit');
    fixture.detectChanges();
    tick();

    expect(fakeConsole.logs).toContain('You submitted value:  123-ABC');
  }));

  afterAll(() => window.console = originalConsole);
})
