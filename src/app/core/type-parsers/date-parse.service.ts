import {Injectable} from '@angular/core';
import {PlaceholderserviceService} from './placeholderservice.service';
import {BehaviorSubject, Observable, Observer, Subject, throwError} from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class DateParseService
{
	private _serverDatePattern;
	private _serverDateTimePattern;
	private _invalidDateMessage;
	private _displayTimePattern;
	private _displayDatePattern;
	private _displayDateTimePattern;
	private _displayDurationPattern;
	private _cultureInfo:any;

	private _daylightSaving;
	private _userUtcOffsetInMinutes;
	private _ensureUserUtcOffsetLoaded;

	private _iso8601UtcPattern;

	constructor(private _placeholderserviceService: PlaceholderserviceService,)
	{
		this._cultureInfo = null;

		this._iso8601UtcPattern = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)Z$/;

		this._ensureUserUtcOffsetLoaded = () =>
		{
			if (this._userUtcOffsetInMinutes === undefined)
			{
				throwError('Date parse service not ready yet! Ensure caller awaits isReady promise.');
			}
		};
	}


	isIso8601UtcString(value)
	{
		if (typeof value !== 'string')
		{
			throwError('No Iso8601Utc :' + value);
		}

		return this._iso8601UtcPattern.test(value);
	}

	anyToFormattedDateTimeString(value, datePattern, offsetInMinutes)
	{
		let momentObject = moment.utc(value).add(offsetInMinutes || 0, 'm');

		return momentObject.format(datePattern);
	}

	anyToFormattedDateString(value, datePattern, offsetInMinutes, asUtc?)
	{
		let momentObject;

		if (asUtc === undefined || asUtc === true)
		{
			momentObject = moment.utc(value);
		}
		else
		{
			momentObject = moment(value);
		}

		momentObject.add(offsetInMinutes || 0, 'm').startOf('day');

		return momentObject.format(datePattern);
	}

	anyToFormattedTimeString(value, timePattern, offsetInMinutes)
	{
		let momentObject = moment
		.utc(value)
		.add(offsetInMinutes || 0, 'm');

		return momentObject.format(timePattern);
	}

	isAnyValid(value, validationPattern)
	{
		if (Number(value))
		{
			return moment(value).isValid();
		}

		if (moment.isMoment(value))
		{
			console.log(value);
			console.log(validationPattern);

			return moment(value, validationPattern, true).isValid();
		}

		return this.isIso8601UtcString(value);
	}

	toPad0StringTwoDigits(value)
	{
		if (value === undefined || value === null || isNaN(value))
		{
			return null;
		}

		if (value < 10)
		{
			return '0' + value.toString();
		}

		return value.toString();
	}

	momentDurationToFormattedString(value, formatPattern)
	{
		let quotedExpr = /('[^']+')/g,
			replaceTokensExpr = /(D{1,2}\w*?|h{1,2}\w*?|m{1,2}\w*?|s{1,2}\w*?)/g,
			preserve = [],
			tokenI = 0,
			curMatch,
			replacementValue,
			result = formatPattern.replace(quotedExpr, function (curMatch)
			{
				let token = '##_' + (tokenI++) + '_##';

				preserve.push({
					token: token,
					content: curMatch.replace(/'/g, '')
				});

				return token;
			});

		while ((curMatch = replaceTokensExpr.exec(result)) !== null)
		{
			switch (curMatch[0])
			{
				case 'DD':
					replacementValue = this.toPad0StringTwoDigits(parseInt(value.asDays()));
					break;
				case 'D':
					replacementValue = parseInt(value.asDays()).toString();
					break;
				case 'hh':
					replacementValue = this.toPad0StringTwoDigits(value.hours());
					break;
				case 'h':
					replacementValue = value.hours().toString();
					break;
				case 'mm':
					replacementValue = this.toPad0StringTwoDigits(value.minutes());
					break;
				case 'm':
					replacementValue = value.minutes().toString();
					break;
				case 'ss':
					replacementValue = this.toPad0StringTwoDigits(value.seconds());
					break;
				case 's':
					replacementValue = value.seconds().toString();
					break;
				default:
					replacementValue = '';
			}

			result = result.substr(0, curMatch.index) + replacementValue + result.substr(curMatch.index + curMatch[0].length);
		}

		preserve.forEach((preserved) =>
		{
			result = result.replace(preserved.token, preserved.content);
		});

		return result;
	}

	isMoment(value)
	{
		return moment.isMoment(value);
	}

	isEmptyMoment(momentObj)
	{
		return momentObj && momentObj.isMoment === true && momentObj.parsingFlags().empty === true;
	}

	isDate(value)
	{
		return moment(value, this._displayDatePattern, true).isValid();
	}

	isServerDate(value)
	{
		return this.isAnyValid(value, this._serverDatePattern);
	}

	isServerDateTime(value)
	{
		return this.isAnyValid(value, this._serverDateTimePattern);
	}

	isDateTime(value)
	{
		return moment(value, this._displayDateTimePattern, true).isValid();
	}

	getMomentNow()
	{
		let pad = (value) =>
			{
				return (value < 10) ? ('0' + value) : value;
			},
			momentObj = moment().add(-this._userUtcOffsetInMinutes, 'm');

		this._ensureUserUtcOffsetLoaded();

		return momentObj.year() + '-' + pad(momentObj.month() + 1) + '-' + pad(momentObj.date()) + 'T' + pad(momentObj.hour()) + ':' + pad(momentObj.minute()) + ':00Z';
	}

	isPlaceholder(value, allowEmptyValue)
	{
		return !!(allowEmptyValue && allowEmptyValue === true && this._placeholderserviceService.isPlaceholder(value, true) === true);
	}

	convertToDisplayTime(value)
	{
		this._ensureUserUtcOffsetLoaded();

		return this.anyToFormattedTimeString(value, this._displayTimePattern, this._userUtcOffsetInMinutes);
	}

	convertToDateObject(value, applyUtcOffsetFirst?, applyConfiguredDisplayDatePattern?)
	{
		let dateFormat = applyConfiguredDisplayDatePattern === true ? this._displayDatePattern : undefined,
			dateAsObject = null,
			dateAsMoment;

		if (value && value !== null)
		{
			// dateAsMoment = moment.utc(value, dateFormat, false);
			dateAsMoment = moment(value, dateFormat);

			if (applyUtcOffsetFirst === true)
			{
				this._ensureUserUtcOffsetLoaded();

				// dateAsObject = dateAsMoment.add(this._userUtcOffsetInMinutes, 'm').startOf('day').toDate();
				dateAsObject = dateAsMoment.add(this._userUtcOffsetInMinutes, 'm').startOf('day').format();
			}
			else
			{
				// dateAsObject = dateAsMoment.startOf('day').toDate();
				dateAsObject = dateAsMoment.startOf('day').format();
			}
		}

		return dateAsObject;
	}

	convertToMomentTime(value)
	{
		let timeAsString,
			timeAsMoment;

		if (value === undefined || value === null)
		{
			return undefined;
		}

		this._ensureUserUtcOffsetLoaded();

		timeAsString = moment
			.utc(value)
			.add(this._userUtcOffsetInMinutes, 'm')
			.format(this._displayTimePattern);

		timeAsMoment = moment
			.utc(timeAsString, this._displayTimePattern);

		return timeAsMoment;
	}

	convertToDisplayDate(value, allowPlaceholders)
	{
		if (this.isPlaceholder(value, allowPlaceholders) === true)
		{
			return value;
		}

		return this.anyToFormattedDateString(value, this._displayDatePattern, 0, false);
	}

	convertToDisplayDateTime(value, allowPlaceholders?)
	{
		if (this.isPlaceholder(value, allowPlaceholders) === true)
		{
			return value;
		}

		this._ensureUserUtcOffsetLoaded();

		return this.anyToFormattedDateTimeString(value, this._displayDateTimePattern, this._userUtcOffsetInMinutes);
	}

	convertToDisplayDuration(value)
	{
		let dur = moment.duration(value);

		return this.momentDurationToFormattedString(dur, this._displayDurationPattern);
	}

	convertToServerDate(value, allowPlaceholders, validationByPattern)
	{
		let formattedDateString;

		if (this.isPlaceholder(value, allowPlaceholders) === true)
		{
			return value;
		}

		if (validationByPattern && validationByPattern === true)
		{
			if (this.isDate(value) === true)
			{
				this._ensureUserUtcOffsetLoaded();

				formattedDateString = this.anyToFormattedDateString(value, this._serverDatePattern, -this._userUtcOffsetInMinutes) + 'Z';
			}
			else
			{
				formattedDateString = this._invalidDateMessage;
			}
		}
		else
		{
			this._ensureUserUtcOffsetLoaded();

			formattedDateString = this.anyToFormattedDateString(value, this._serverDatePattern, -this._userUtcOffsetInMinutes) + 'Z';
		}

		if (value && this.isAnyValid(value, this._serverDatePattern) === true)
		{
			return formattedDateString;
		}
		else
		{
			return null;
		}
	}

	convertToServerDateTime(value, allowPlaceholders?, validationByPattern?)
	{
		let formattedDateString;

		if (this.isPlaceholder(value, allowPlaceholders) === true)
		{
			return value;
		}

		if (validationByPattern && validationByPattern === true)
		{
			if (this.isDate(value) === true)
			{
				this._ensureUserUtcOffsetLoaded();

				formattedDateString = this.anyToFormattedDateTimeString(value, this._serverDateTimePattern, -this._userUtcOffsetInMinutes) + 'Z';
			}
			else
			{
				formattedDateString = this._invalidDateMessage;
			}
		}
		else
		{
			this._ensureUserUtcOffsetLoaded();

			formattedDateString = this.anyToFormattedDateTimeString(value, this._serverDateTimePattern, -this._userUtcOffsetInMinutes) + 'Z';
		}

		if (value && this.isAnyValid(value, this._serverDatePattern) === true)
		{
			return formattedDateString;
		}
		else
		{
			return null;
		}
	}

	shiftTimezoneOffsetToUtcIfLocalMidnight(value)
	{
		let momentObj;

		if (value && value !== null)
		{
			momentObj = moment(value);

			if (momentObj.diff(moment(momentObj).startOf('day')) === 0)
			{
				return momentObj.add(momentObj.utcOffset(), 'minutes').toString();
			}
		}

		return value;
	}

	mergeDateAndTime(momentDate, momentTime, allowEmptyValue?)
	{
		/**
		 * 	Correct empty time values
		 */
		// let momentDateTime = momentDate.add(momentTime);

		// let momentDateTime = momentDate.set({
		// 	'hour': momentTime.get('hour'),
		// 	'minute': momentTime.get('minute'),
		// 	'second': momentTime.get('second')
		// });

		let momentDateTime = momentDate;

		if (allowEmptyValue === true && (this.isEmptyMoment(momentDate) === true || this.isEmptyMoment(momentTime) === true))
		{
			return null;
		}
		else
		{
			return moment(momentDateTime.format(this._serverDateTimePattern), this._serverDateTimePattern);
		}
	}

	public ticksToDisplayDateTime(ticks)
	{
		let momentObject;

		if (typeof ticks !== 'number')
		{
			throw new Error();
		}

		momentObject = moment.utc(ticks);

		return momentObject.format(this._displayDateTimePattern);
	}

	isoDateTimeStringToTicks(isoString)
	{
		let momentObject;

		if (!this.isIso8601UtcString(isoString))
		{
			throw new Error('No Iso8601 utc string');
		}

		this._ensureUserUtcOffsetLoaded();

		momentObject = moment.utc(isoString).add(this._userUtcOffsetInMinutes, 'm');

		return momentObject.valueOf();
	}

	last7DaysIsoDateTimeStringRange()
	{
		let to = this.getMomentNow(),
			from = this.convertToServerDateTime(moment.utc(to).subtract(7, 'days').add(this._userUtcOffsetInMinutes, 'm'));

		this._ensureUserUtcOffsetLoaded();

		return {
			from: from,
			to: to
		};
	}

	cutSecondsFromIsoDateTimeString(isoString, addAdditionalMinutes?)
	{
		let momentObject,
			addAdditionalMinutesInt = parseInt(addAdditionalMinutes);

		if (!this.isIso8601UtcString(isoString))
		{
			throw new Error('No Iso8601 utc string');
		}

		if (isNaN(addAdditionalMinutesInt) || !addAdditionalMinutesInt)
		{
			addAdditionalMinutesInt = 0;
		}

		this._ensureUserUtcOffsetLoaded();

		momentObject = moment.utc(isoString).add(this._userUtcOffsetInMinutes, 'm').add(addAdditionalMinutesInt, 'm').seconds(0);

		return this.convertToServerDateTime(momentObject, false, null);
	}
}
