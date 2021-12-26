import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[mascara]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MascaraDirective,
      multi: true,
    },
  ],
})
export class MascaraDirective implements ControlValueAccessor {
  onTouched: any;
  onChange: any;
  @Input('mascara') mascara: string; // obtém a máscara

  // el é a referência ao campo input
  constructor(private el: ElementRef) {
    this.mascara = '';
  }

  // primeiro método carregado
  writeValue(obj: any): void {
    if (obj) this.el.nativeElement.value = this.aplicarMascara(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // sempre que uma tecla for pressionada
  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    // substitui tudo que não for número por uma string vazia
    let valor: string = $event.target.value.replace(/\D/g, '');

    // retorna caso pressionado backspace
    if ($event.keycode === 8) {
      this.onChange(valor);
      return;
    }

    // tamanho do campo máscara somente com números
    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) this.onChange(valor);

    $event.target.value = this.aplicarMascara(valor);
  }

  // se campo incompleto e perder o foco, é apagado
  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.mascara.length) return;
    this.onChange('');
    $event.target.value = '';
  }

  aplicarMascara(valor: string): string {
    valor = valor.replace(/D/g, '');
    // memorizar o limite de tamanho
    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    let maskValue = valor + pad.substring(0, pad.length - valor.length);
    let maskValuePos = 0; // memoriza posição do último número inserido

    valor = '';

    // lógica de substituição
    for (let i = 0; i < this.mascara.length; i++) {
      if (isNaN(parseInt(this.mascara.charAt(i)))) {
        valor += this.mascara.charAt(i); // insere caractere não númerico conforme a máscara
      } else {
        valor += maskValue[maskValuePos++]; // adiciona o próximo número ao valor
      }
    }

    if (valor.indexOf('_') > -1) valor = valor.substring(0, valor.indexOf('_'));

    return valor;
  }
}
