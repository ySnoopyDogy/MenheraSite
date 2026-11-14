import { TFunction } from 'next-i18next/pages';

const BICHO_ANIMALS = [
  'avestruz',
  'águia',
  'burro',
  'borboleta',
  'cachorro',
  'cabra',
  'carneiro',
  'camelo',
  'cobra',
  'coelho',
  'cavalo',
  'elefante',
  'galo',
  'gato',
  'jacaré',
  'leão',
  'macaco',
  'porco',
  'pavão',
  'peru',
  'touro',
  'tigre',
  'urso',
  'veado',
  'vaca',
];

const getBetType = (option: string): string => {
  if (/^(?=.*\d)[\d ]+$/.test(option)) {
    const withoutBlank = option.replace(/\s/g, '');
    if (withoutBlank.length === 4) return 'thousand';
    if (withoutBlank.length === 3) return 'hundred';
    if (withoutBlank.length === 2) return 'ten';
    return 'unity';
  }

  const selectedAnimals = option.split('|');

  if (selectedAnimals.length === 5) return 'corner';
  if (selectedAnimals.length === 2) return 'sequence';
  return 'animal';
};

const optionBetToText = (option: string, t: TFunction): string => {
  const type = getBetType(option);
  switch (type) {
    case 'unity':
    case 'ten':
    case 'hundred':
    case 'thousand':
      return option;

    case 'animal':
      return t(`bichos.${option}`);

    case 'sequence':
      return option
        .split('|')
        .map((text, i) => `${i + 1}° ${t(`bichos.${text}`)}`)
        .join('. ');

    case 'corner':
      return option
        .split('|')
        .map((a) => t(`bichos.${a}`))
        .join(', ');
  }

  return '';
};
const mapResultToAnimal = (result: number[]): string =>
  BICHO_ANIMALS[Math.floor(Number(`${result[2]}${result[3]}`) / 4)];

export { BICHO_ANIMALS, mapResultToAnimal, optionBetToText };
