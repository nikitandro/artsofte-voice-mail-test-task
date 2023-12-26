import { Params } from '@angular/router';
import { Period } from '../models/Period';
import { Duration } from '../models/Duration';

export const getValidFilterFormParams = (params: Params) => {
  const period = params['period'];
  const phone = params['phone'];
  const duration = params['duration'];

  const result = { period: Period.AllTime, phone: '', duration: Duration.All };

  if (Object.values(Period).includes(period)) {
    result.period = period;
  }

  if (phone) {
    result.phone = phone;
  }

  if (Object.values(Duration).includes(duration)) {
    result.duration = duration;
  }

  return result;
};
