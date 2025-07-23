import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPL'
})
export class CurrencyPLPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return value.toFixed(2) + ' zł';
  }

}
