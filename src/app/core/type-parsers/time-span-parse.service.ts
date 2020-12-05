import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class TimeSpanParseService
{

	constructor()
	{
	}

	parse(value)
	{
		let totalSeconds = 0,

			secondsInOneDay = 86400,
			daysInOneYear = 365,
			daysInOneMonth = 30,

			secondsInOneHour = 3600,
			secondsInOneMinute = 60,

			middle,
			date,
			time,

			yearsIndex,
			monthsIndex,
			daysIndex,
			hoursIndex,
			minutesIndex,
			secondsIndex,

			years,
			months,
			days,
			hours,
			minutes,
			seconds;

		if (value.indexOf('P') !== 0) return;

		// split date and time because both could have an 'M'
		middle = value.indexOf('T');
		date = value.substring(1, middle);
		time = value.substring(middle + 1, value.length);

		// get seconds from date
		yearsIndex = date.indexOf('Y');
		if (yearsIndex > 0)
		{
			years = date.substring(0, yearsIndex);
			date = date.substring(yearsIndex + 1, date.length);
			totalSeconds += years * (secondsInOneDay * daysInOneYear);
		}

		monthsIndex = date.indexOf('M');
		if (monthsIndex > 0)
		{
			months = date.substring(0, monthsIndex);
			date = date.substring(monthsIndex + 1, date.length);
			totalSeconds += months * (secondsInOneDay * daysInOneMonth);
		}

		daysIndex = date.indexOf('D');
		if (daysIndex > 0)
		{
			days = date.substring(0, daysIndex);
			totalSeconds += days * secondsInOneDay;
		}

		// get seconds from time
		hoursIndex = time.indexOf('H');
		if (hoursIndex > 0)
		{
			hours = time.substring(0, hoursIndex);
			time = time.substring(hoursIndex + 1, time.length);
			totalSeconds += (hours * secondsInOneHour);
		}

		minutesIndex = time.indexOf('M');
		if (minutesIndex > 0)
		{
			minutes = time.substring(0, minutesIndex);
			time = time.substring(minutesIndex + 1, time.length);
			totalSeconds += (minutes * secondsInOneMinute);
		}

		secondsIndex = time.indexOf('S');
		if (secondsIndex > 0)
		{
			seconds = time.substring(0, secondsIndex);
			totalSeconds += seconds;
		}

		return totalSeconds;
	}
}
