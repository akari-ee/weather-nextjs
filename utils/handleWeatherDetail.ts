export const setWeatherPath = (weatherCode: number) => {
  let weatherIconPath = '';
  switch (weatherCode) {
    case 1000:
      weatherIconPath = '/images/clear_day.svg';
      break;
    case 1100:
      weatherIconPath = '/images/mostly_clear_day.svg';
      break;
    case 1101:
      weatherIconPath = '/images/partly_cloudy_day.svg';
      break;
    case 1102:
      weatherIconPath = '/images/mostly_cloudy.svg';
      break;
    case 1001:
      weatherIconPath = '/images/cloudy.svg';
      break;
    case 2100:
      weatherIconPath = '/images/fog_light.svg';
      break;
    case 2000:
      weatherIconPath = '/images/fog.svg';
      break;
    case 4000:
      weatherIconPath = '/images/drizzle.svg';
      break;
    case 4200:
      weatherIconPath = '/images/rain_light.svg';
      break;
    case 4201:
      weatherIconPath = '/images/rain_heavy.svg';
      break;
    case 4001:
      weatherIconPath = '/images/rain.svg';
      break;
    case 5001:
      weatherIconPath = '/images/flurries.svg';
      break;
    case 5100:
      weatherIconPath = '/images/snow_light.svg';
      break;
    case 5101:
      weatherIconPath = '/images/snow_heavy.svg';
      break;
    case 6000:
      weatherIconPath = '/images/freezing_drizzle.svg';
      break;
    case 6200:
      weatherIconPath = '/images/freezing_rain.svg';
      break;
    case 6201:
      weatherIconPath = '/images/freezing_rain_heavy.svg';
      break;
    case 7000:
      weatherIconPath = '/images/ice_pellets.svg';
      break;
    case 7101:
      weatherIconPath = '/images/ice_pellets_heavy.svg';
      break;
    case 7102:
      weatherIconPath = '/images/ice_pellets_light.svg';
      break;
    case 8000:
      weatherIconPath = '/images/tstorm.svg';
      break;
    default:
      weatherIconPath = '';
      break;
  }
  return weatherIconPath;
};

export const setVisibilityDescription = (visibility: number) => {
  if (visibility >= 5) return '현재 매우 좋은 상태입니다.'
  else if (visibility >= 1) return '현재 보통 상태입니다.'
  else if (visibility >= 0.5) return '현재 나쁜 상태입니다.'
  else if(visibility >= 0.2) return '현재 매우 나쁜 상태입니다.'
  else return '현재 최악의 상태입니다.'
}