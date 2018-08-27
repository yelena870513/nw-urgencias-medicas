import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapText' })
export class MapTextPipe implements PipeTransform{
    transform(content: any [], prop: string){
        return content.map((m: any) => m[prop]);
    }
}