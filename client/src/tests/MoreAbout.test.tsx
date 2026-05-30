import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MoreAbout } from '../components/MoreAbout/MoreAbout';
import type { Currency } from '../models/currency';
import { currencies } from '../mocks/currencyMocks';

const cad = currencies.find((currency) => currency.code === 'CAD') as Currency;
const pln = currencies.find((currency) => currency.code === 'PLN') as Currency;
const jpy = currencies.find((currency) => currency.code === 'JPY') as Currency;

describe('MoreAbout', () => {
  it('RenderSelectedCurrencyBlock', () => {
    render(<MoreAbout from={cad} to={pln} />);

    expect(screen.getByLabelText('About CAD/PLN')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'CAD/PLN: about' })).toBeTruthy();
  });

  it('RenderSelectedCurrencyNames', () => {
    render(<MoreAbout from={cad} to={pln} />);

    expect(screen.getByText(`${cad.name} - ${cad.code} - ${cad.symbol}`)).toBeTruthy();
    expect(screen.getByText(`${pln.name} - ${pln.code} - ${pln.symbol}`)).toBeTruthy();
  });

  it('RenderSelectedCurrencyPairDescriptions', () => {
    render(<MoreAbout from={cad} to={jpy} />);

    expect(screen.getByText(cad.description)).toBeTruthy();
    expect(screen.getByText(jpy.description)).toBeTruthy();
  });
});
