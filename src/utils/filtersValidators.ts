import { Period } from '../models/Period';
import { Datum } from '../models/MessageModel';
import { Duration } from '../models/Duration';
import { Params } from '@angular/router';

export const doesPeriodMatch = (periodParam: unknown, message: Datum) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  switch (periodParam) {
    case Period.AllTime:
      return true;
    case Period.Today:
      return new Date(message.received[0]) === today;
    case Period.Yesterday:
      return new Date(message.received[0]) === yesterday;
    default:
      return true;
  }
};

export const doesPhoneMatch = (phone: unknown, message: Datum) => {
  if (phone && typeof phone === 'string') {
    const escapedPhoneParam = phone.replace(
      /([.*+?^=!:${}()|\[\]\/\\])/g,
      '\\$1',
    );

    return !!message.from[0].match(escapedPhoneParam);
  }

  return true;
};

export const doesDurationMatch = (duration: unknown, message: Datum) => {
  if (isDuration(duration) && duration !== Duration.All) {
    return Number(message.duration[0]) <= Number(duration);
  }

  return true;
};

export const isDuration = (val: any): val is Duration => {
  return Object.values(Duration).includes(val);
};

export const filterMessages = (params: Params) => {
  return (messages: Datum[]) => {
    return messages.filter((message) => {
      const durationParam = params['duration'];
      let matchesDuration = doesDurationMatch(durationParam, message);

      const phoneParam = params['phone'];
      const matchesPhone = doesPhoneMatch(phoneParam, message);

      const periodParam = params['period'];
      const matchesPeriod = doesPeriodMatch(periodParam, message);

      return matchesDuration && matchesPhone && matchesPeriod;
    });
  };
};
