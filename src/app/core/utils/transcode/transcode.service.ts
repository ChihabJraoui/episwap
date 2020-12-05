import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TranscodeService {

  constructor() { }

  public async transformTimestampToDate(data: any) {
    console.log('transformTimestampToDate()');
    await data.forEach((element: any) => {
      element.startJob = moment.unix(element.startJob).locale('fr').format('DD/MM/YYYY HH:mm:ss');
      element.end = moment.unix(element.endJob).locale('fr').format('DD/MM/YYYY HH:mm:ss');
    });
  }
}
