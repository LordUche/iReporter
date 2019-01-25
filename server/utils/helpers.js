import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const PNF = PhoneNumberFormat;
const phoneUtil = PhoneNumberUtil.getInstance();

export function isValidPhoneNumber(phoneNumber, country) {
  try {
    const number = phoneUtil.parse(phoneNumber, country);
    return phoneUtil.isValidNumberForRegion(number, country);
  } catch (e) {
    return false;
  }
}

export function formatPhoneNumber(phoneNumber, country) {
  const number = phoneUtil.parse(phoneNumber, country);
  return phoneUtil.format(number, PNF.INTERNATIONAL);
}
