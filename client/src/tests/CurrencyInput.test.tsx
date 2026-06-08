import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../App';
import currenciesJson from '../data/2_hw_mock_currencies.json';
import type { Currency } from '../models/currency';

const currencies = currenciesJson as Currency[];

function renderApp() {
  render(<App />);

  return {
    fromAmountInput: document.getElementById('from-input-amount') as HTMLInputElement,
    toAmountInput: document.getElementById('to-input-amount') as HTMLInputElement,
    fromCurrencySelect: document.getElementById('from-input-currency-select') as HTMLSelectElement,
    toCurrencySelect: document.getElementById('to-input-currency-select') as HTMLSelectElement
  };
}

let fromAmountInput: HTMLInputElement;
let toAmountInput: HTMLInputElement;
let fromCurrencySelect: HTMLSelectElement;
let toCurrencySelect: HTMLSelectElement;

beforeEach(() => {
  const rendered = renderApp();

  fromAmountInput = rendered.fromAmountInput;
  toAmountInput = rendered.toAmountInput;
  fromCurrencySelect = rendered.fromCurrencySelect;
  toCurrencySelect = rendered.toCurrencySelect;
});

describe('Currency converter', () => {
  it('RenderSelectsAndFieldsWithMockData', () => {
    expect(fromAmountInput.value).toBe('1');
    expect(toAmountInput.value).toBe('2.95');
    expect(fromCurrencySelect.value).toBe('CAD');
    expect(toCurrencySelect.value).toBe('PLN');
    expect(fromCurrencySelect.options).toHaveLength(currencies.length);
    expect(toCurrencySelect.options).toHaveLength(currencies.length);
  });

  it('RecalculateConversionWhenAmountChanges', () => {
    fireEvent.change(fromAmountInput, {
      target: { value: '2' }
    });

    expect(toAmountInput.value).toBe('5.9');
  });

  it('RecalculateConversionWhenPairChanges', () => {
    fireEvent.change(fromAmountInput, {
      target: { value: '2' }
    });
    fireEvent.change(toCurrencySelect, {
      target: { value: 'JPY' }
    });

    expect(toCurrencySelect.value).toBe('JPY');
    expect(toAmountInput.value).toBe('212.8');
  });

  it('DoesNotAllowEqualCurrenciesInPair', () => {
    fireEvent.change(toCurrencySelect, {
      target: { value: 'CAD' }
    });

    expect(fromCurrencySelect.value).not.toBe(toCurrencySelect.value);
    expect(fromCurrencySelect.value).toBe('PLN');
    expect(toCurrencySelect.value).toBe('CAD');
  });

  it('ResetMoreAboutChildStateByKeyWhenPairChanges', () => {
    fireEvent.click(screen.getByRole('button', { name: 'CAD/PLN: about' }));
    expect(screen.queryByText('Canadian dollar - CAD - $')).toBeNull();

    fireEvent.change(toCurrencySelect, {
      target: { value: 'JPY' }
    });

    expect(screen.getByRole('button', { name: 'CAD/JPY: about' })).toBeTruthy();
    expect(screen.getByText('Canadian dollar - CAD - $')).toBeTruthy();
    expect(screen.getByText('Japanese yen - JPY - ¥')).toBeTruthy();
  });
});
