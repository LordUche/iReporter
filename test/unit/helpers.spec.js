/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { isValidPhoneNumber, formatPhoneNumber } from '../../server/utils/helpers';

describe('Helpers', () => {
  let number;
  let country;

  beforeEach(() => {
    number = '07014970830';
    country = 'NG';
  });

  describe('isValidPhoneNumber', () => {
    it('should be true for valid number and country code', () => {
      expect(isValidPhoneNumber(number, country)).to.be.true;
    });

    it('should be false for invalid country code', () => {
      country = 'US';
      expect(isValidPhoneNumber(number, country)).to.be.false;
    });

    it('should be false for invalid number', () => {
      number = '0701497083';
      expect(isValidPhoneNumber(number, country)).to.be.false;
    });
  });

  describe('formatPhoneNumber', () => {
    it('should remain valid after formatting', () => {
      const formatted = formatPhoneNumber(number, country);
      expect(formatted).to.not.equal(number);
      expect(isValidPhoneNumber(formatted, country)).to.be.true;
    });
  });
});
