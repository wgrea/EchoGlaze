// src/lib/data/manifest.ts
// src/lib/data/manifest.ts

// --- USA ---
import usaData from './countries/united-states/index.ts';
import chicagoData from './countries/united-states/chicago.ts';
import austinData from './countries/united-states/austin.ts';
import denverData from './countries/united-states/denver.ts';
import miamiData from './countries/united-states/miami.ts';
import seattleData from './countries/united-states/seattle.ts';

// --- TURKEY ---
import turkeyData from './countries/turkey/index.ts';
import istanbulData from './countries/turkey/istanbul.ts';

// --- AZERBAIJAN ---
import azeData from './countries/azerbaijan/index.ts';
import bakuData from './countries/azerbaijan/baku.ts';

// --- GREECE ---
import greeceData from './countries/greece/index.ts';
import athensData from './countries/greece/athens.ts';

// --- QATAR ---
import qatarData from './countries/qatar/index.ts';
import dohaData from './countries/qatar/doha.ts';

// --- SPAIN ---
import spainData from './countries/spain/index.ts';
import madridData from './countries/spain/madrid.ts';
import sevilleData from './countries/spain/seville.ts';
import barcelonaData from './countries/spain/barcelona.ts';

// --- INDIA ---
import indiaData from './countries/india/index.ts';
import birData from './countries/india/bir.ts';
import lonavalaData from './countries/india/lonavala.ts';

// --- SRI LANKA ---
import sriLankaData from './countries/sri-lanka/index.ts';
import weligamaData from './countries/sri-lanka/weligama.ts';

// --- NEPAL ---
import nepalData from './countries/nepal/index.ts';
import pokharaData from './countries/nepal/pokhara.ts';
import kathmanduData from './countries/nepal/kathmandu.ts';

// --- INDONESIA ---
import indonesiaData from './countries/indonesia/index.ts';
import pererenanData from './countries/indonesia/pererenan.ts';
// --- MEXICO ---
import mexData from './countries/mexico/index.ts';
import cdmxData from './countries/mexico/cdmx.ts';

// --- COLOMBIA ---
import colData from './countries/colombia/index.ts';
import medellinData from './countries/colombia/medellin.ts';
 
// --- MEXICO (Update) ---
import oaxacaData from './countries/mexico/oaxaca.ts';

// --- ARGENTINA ---
import argData from './countries/argentina/index.ts';
import bueData from './countries/argentina/buenos-aires.ts';

// --- PORTUGAL ---
import prtData from './countries/portugal/index.ts';
import lisData from './countries/portugal/lisbon.ts';

// --- THAILAND ---
import thaData from './countries/thailand/index.ts';
import bkkData from './countries/thailand/bangkok.ts';

export const COUNTRY_REGISTRY = [
  { id: 'USA', slug: 'united-states', data: usaData, icon: '🇺🇸' },
  { id: 'TUR', slug: 'turkey', data: turkeyData, icon: '🇹🇷' },
  { id: 'AZE', slug: 'azerbaijan', data: azeData, icon: '🇦🇿' },
  { id: 'GRC', slug: 'greece', data: greeceData, icon: '🇬🇷' },
  { id: 'QAT', slug: 'qatar', data: qatarData, icon: '🇶🇦' },
  { id: 'ESP', slug: 'spain', data: spainData, icon: '🇪🇸' },
  { id: 'IND', slug: 'india', data: indiaData, icon: '🇮🇳' },
  { id: 'LKA', slug: 'sri-lanka', data: sriLankaData, icon: '🇱🇰' },
  { id: 'NPL', slug: 'nepal', data: nepalData, icon: '🇳🇵' },
  { id: 'IDN', slug: 'indonesia', data: indonesiaData, icon: '🇮🇩' },
  { id: 'MEX', slug: 'mexico', data: mexData, icon: '🇲🇽' },
  { id: 'COL', slug: 'colombia', data: colData, icon: '🇨🇴' },
  { id: 'ARG', slug: 'argentina', data: argData, icon: '🇦🇷' },
  { id: 'PRT', slug: 'portugal', data: prtData, icon: '🇵🇹' },
  { id: 'THA', slug: 'thailand', data: thaData, icon: '🇹🇭' },
];

export const CITY_REGISTRY = [
  // USA
  { id: 'CHI', slug: 'chicago', countryId: 'USA', data: chicagoData },
  { id: 'AUS', slug: 'austin', countryId: 'USA', data: austinData },
  { id: 'DEN', slug: 'denver', countryId: 'USA', data: denverData },
  { id: 'MIA', slug: 'miami', countryId: 'USA', data: miamiData },
  { id: 'SEA', slug: 'seattle', countryId: 'USA', data: seattleData },
  // TURKEY
  { id: 'IST', slug: 'istanbul', countryId: 'TUR', data: istanbulData },
  // AZERBAIJAN
  { id: 'BAK', slug: 'baku', countryId: 'AZE', data: bakuData },
  // GREECE
  { id: 'ATH', slug: 'athens', countryId: 'GRC', data: athensData },
  // QATAR
  { id: 'DOH', slug: 'doha', countryId: 'QAT', data: dohaData },
  // SPAIN
  { id: 'MAD', slug: 'madrid', countryId: 'ESP', data: madridData },
  { id: 'SVQ', slug: 'seville', countryId: 'ESP', data: sevilleData },
  { id: 'BCN', slug: 'barcelona', countryId: 'ESP', data: barcelonaData },
  // INDIA
  { id: 'BIR', slug: 'bir', countryId: 'IND', data: birData },
  { id: 'LNV', slug: 'lonavala', countryId: 'IND', data: lonavalaData },
  // SRI LANKA
  { id: 'WLG', slug: 'weligama', countryId: 'LKA', data: weligamaData },
  // NEPAL
  { id: 'PKR', slug: 'pokhara', countryId: 'NPL', data: pokharaData },
  { id: 'KTM', slug: 'kathmandu', countryId: 'NPL', data: kathmanduData },
  // INDONESIA
  { id: 'PRN', slug: 'pererenan', countryId: 'IDN', data: pererenanData },
  // Add these to CITY_REGISTRY in src/lib/data/manifest.ts
{ id: 'MEX', slug: 'mexico-city', countryId: 'MEX', data: cdmxData },
  { id: 'MDE', slug: 'medellin', countryId: 'COL', data: medellinData },
  { id: 'OAX', slug: 'oaxaca', countryId: 'MEX', data: oaxacaData },
  { id: 'BUE', slug: 'buenos-aires', countryId: 'ARG', data: bueData },
  {id: 'LIS', slug: 'lisbon', countryId: 'PRT', data: lisData },
  { id: 'BKK', slug: 'bangkok', countryId: 'THA', data: bkkData },
];

/**
 * 
 * // --- PORTUGAL ---
import prtData from './countries/portugal/index.ts';
import lisData from './countries/portugal/lisbon.ts';

 * 
 *   { id: 'LKA', slug: 'sri-lanka', data: sriLankaData, icon: '🇱🇰' },
  { id: 'NPL', slug: 'nepal', data: nepalData, icon: '🇳🇵' },
 * 
 *   { id: 'BUE', slug: 'buenos-aires', countryId: 'ARG', data: bueData },
  {id: 'LIS', slug: 'lisbon', countryId: 'PRT', data: lisData },
 * 
 */