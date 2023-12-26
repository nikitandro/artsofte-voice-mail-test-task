import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'paginate' })
export class PaginatePipe implements PipeTransform {
  public transform<T>(value: T[], page: number, offset: number): T[] {
    const start = (page - 1) * offset;
    const end = start + offset;

    return value.slice(start, end);
  }
}
