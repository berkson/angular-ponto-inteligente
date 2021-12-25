import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { DataBrPipe, TipoPipe } from './pipes';

@NgModule({
  declarations: [MascaraDirective, DataBrPipe, TipoPipe],
  imports: [CommonModule],
  exports: [MascaraDirective, DataBrPipe, TipoPipe],
  providers: [PtBrMatPaginatorIntl],
})
export class SharedModule {}
