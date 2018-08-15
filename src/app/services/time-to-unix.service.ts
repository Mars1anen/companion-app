import { Injectable } from '@angular/core';

@Injectable()
export class TimeToUnixService {

  constructor() { }

  stringToUnix(string) {
    let arrOfStrings = string.split('/');
    if (arrOfStrings[0].length < 2) {
      arrOfStrings[0] = 0 + arrOfStrings[1];
    }
    if (arrOfStrings[1].length < 2) {
      arrOfStrings[1] = 0 + arrOfStrings[1];
    }
    arrOfStrings = arrOfStrings.reverse();
    let reducer = (acc, cV) => acc + cV;
    return arrOfStrings.reduce(reducer);
  }

  beautifyUnix(unix) {
    let year = unix.slice(0, 4);
    let month = unix.slice(4, 6);
    let day = unix.slice(6);
    let s = '/';
    return day.concat(s, month, s, year);
  }
}