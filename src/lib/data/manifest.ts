// src/lib/data/manifest.ts
import usaData from './countries/united-states/index.ts';
import chicagoData from './countries/united-states/chicago.ts';
import austinData from './countries/united-states/austin.ts';
import denverData from './countries/united-states/denver.ts';
import miamiData from './countries/united-states/miami.ts';
import seattleData from './countries/united-states/seattle.ts';

import turkeyData from './countries/turkey/index.ts';
import istanbulData from './countries/turkey/instanbul.ts';

import azeData from './countries/azerbaijan/index.ts';
import bakuData from './countries/azerbaijan/baku.ts';

import greeceData from './countries/greece/index.ts';
import athensData from './countries/greece/athens.ts';

import qatarData from './countries/qatar/index.ts';
import dohaData from './countries/qatar/doha.ts';

export const COUNTRY_REGISTRY = [
  { id: 'USA', slug: 'united-states', data: usaData, icon: '🇺🇸' },
  { id: 'TUR', slug: 'turkey', data: turkeyData, icon: '🇹🇷' },
  { id: 'AZE', slug: 'azerbaijan', data: azeData, icon: '🇦🇿' },
  { id: 'GRC', slug: 'greece', data: greeceData, icon: '🇬🇷' },
    { id: 'QAT', slug: 'qatar', data: qatarData, icon: '🇶🇦' }
];

export const CITY_REGISTRY = [
  // USA
  { id: 'CHI', slug: 'chicago', countryId: 'USA', data: chicagoData },
  { id: 'AUS', slug: 'austin', countryId: 'USA', data: austinData },
  { id: 'DEN', slug: 'denver', countryId: 'USA', data: denverData },
  { id: 'MIA', slug: 'miami', countryId: 'USA', data: miamiData },
  { id: 'SEA', slug: 'seattle', countryId: 'USA', data: seattleData },
  // TURKEY
  { id: 'INS', slug: 'istanbul', countryId: 'TUR', data: istanbulData },
  // AZERBAIJAN
  { id: 'BAK', slug: 'baku', countryId: 'AZE', data: bakuData },
  // GREECE
  { id: 'ATH', slug: 'athens', countryId: 'GRC', data: athensData },
    // QATAR
    { id: 'DOH', slug: 'doha', countryId: 'QAT', data: dohaData }
];