import { trimSizeMap, TrimSizeType } from '../types/general';

export const GetImageSize = (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    if (file && typeof file !== 'string') {
      const _URL = window.URL || window.webkitURL;
      const img = new window.Image();
      const objectUrl = _URL.createObjectURL(file);
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = objectUrl;
    }
  });
};

export const MakeURL = (str: string) => {
  return str.toLowerCase().replaceAll(' ', '-');
};

export const getDisplayTimeRange = (startDate: Date, endDate: Date): string => {
  const locales = 'en-GB';
  const fullOption: any = { year: 'numeric', month: 'short', day: 'numeric' };
  const noYearOption: any = { month: 'short', day: 'numeric' };
  const noMonthOption: any = { day: 'numeric' };

  if (startDate.getFullYear() === endDate.getFullYear()) {
    if (startDate.getMonth() === endDate.getMonth()) {
      if (startDate.getDay() === endDate.getDay()) {
        return startDate.toLocaleDateString(locales, fullOption);
      }
      return `${startDate.toLocaleDateString(
        locales,
        noMonthOption,
      )} - ${endDate.toLocaleDateString(locales, fullOption)}`;
    }
    return `${startDate.toLocaleDateString(
      locales,
      noYearOption,
    )} - ${endDate.toLocaleDateString(locales, fullOption)}`;
  }
  return `${startDate.toLocaleDateString(
    locales,
    fullOption,
  )} - ${endDate.toLocaleDateString(locales, fullOption)}`;
};

export const trimString = (
  str: string,
  trimSize: TrimSizeType = 'small',
): string => {
  if (str.length < trimSizeMap[trimSize] * 2 + 3) {
    return str;
  }
  return `${str.substring(0, trimSizeMap[trimSize])}...${str.substring(
    str.length - trimSizeMap[trimSize],
  )}`;
};

export const CapitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getEventNameUrl = (str: string) => {
  if (!str) return '';
  return str
    .split('/')
    .filter((word: string) => word !== '')
    .slice(-1)
    .toString();
};
