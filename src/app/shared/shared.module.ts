import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives';

@NgModule({
  declarations: [MascaraDirective],
  imports: [CommonModule],
  exports: [MascaraDirective],
})
export class SharedModule {}
