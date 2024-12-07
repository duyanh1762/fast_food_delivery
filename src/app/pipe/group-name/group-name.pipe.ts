import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupName'
})
export class GroupNamePipe implements PipeTransform {

  transform(value:string, ...args: unknown[]): unknown {
    let nameArray = value.split("_");
    let renderName = nameArray[0];
    return renderName.toUpperCase();
  }

}
