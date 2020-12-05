import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ArrayParseService
{

  constructor()
  {
  }

  parse(value)
  {
    if (Array.isArray(value) === true)
    {
      return value;
    }
    else if (typeof value === 'string')
    {
      return new Array(value);
    }
    else
    {
      throw new Error(value + ' is not a Array');
    }
  }
}
