import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../App';
import currenciesJson from '../data/2_hw_mock_currencies.json';
import type { Currency } from '../models/currency';
import { mockSuccessfulCurrencyApi } from './testCurrencyApiMock';

const currencies = currenciesJson as Currency[];

async function renderApp() {
  mockSuccessfulCurrencyApi();
  render(<App />);

  await waitFor(() => {
    expect((document.getElementById('to-input-amount') as HTMLInputElement).value).toBe('2.95');
  });

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

beforeEach(async () => {
  const rendered = await renderApp();

  fromAmountInput = rendered.fromAmountInput;
  toAmountInput = rendered.toAmountInput;
  fromCurrencySelect = rendered.fromCurrencySelect;
  toCurrencySelect = rendered.toCurrencySelect;
});

afterEach(() => {
  vi.restoreAllMocks();
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

  it('RecalculateConversionWhenPairChanges', async () => {
    fireEvent.change(fromAmountInput, {
      target: { value: '2' }
    });
    fireEvent.change(toCurrencySelect, {
      target: { value: 'JPY' }
    });

    expect(toCurrencySelect.value).toBe('JPY');

    await waitFor(() => {
      expect(toAmountInput.value).toBe('212.8');
    });
  });

  it('DoesNotAllowEqualCurrenciesInPair', () => {
    fireEvent.change(toCurrencySelect, {
      target: { value: 'CAD' }
    });

    expect(fromCurrencySelect.value).not.toBe(toCurrencySelect.value);
    expect(fromCurrencySelect.value).toBe('PLN');
    expect(toCurrencySelect.value).toBe('CAD');
  });

  it('ResetMoreAboutChildStateByKeyWhenPairChanges', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'CAD/PLN: about' }));
    expect(screen.queryByText('Canadian dollar - CAD - $')).toBeNull();

    fireEvent.change(toCurrencySelect, {
      target: { value: 'JPY' }
    });

    expect(await screen.findByRole('button', { name: 'CAD/JPY: about' })).toBeTruthy();
    expect(screen.getByText('Canadian dollar - CAD - $')).toBeTruthy();
    expect(screen.getByText('Japanese yen - JPY - ¥')).toBeTruthy();
  });
});
