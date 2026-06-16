import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../App';
import { mockFailedCurrencyApi, mockSuccessfulCurrencyApi } from './testCurrencyApiMock';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  it('renders loading and success states', async () => {
    mockSuccessfulCurrencyApi();
    render(<App />);

    expect(screen.getByRole('status').textContent).toContain('Loading currency rates');

    await waitFor(() => {
      expect((document.getElementById('to-input-amount') as HTMLInputElement).value).toBe('2.95');
    });
  });

  it('renders initial server error state', async () => {
    mockFailedCurrencyApi();
    render(<App />);

    expect((await screen.findByRole('alert')).textContent).toContain(
      'Server responded with an error. Please try again later.'
    );
  });

  it('recalculates result when amount changes', async () => {
    mockSuccessfulCurrencyApi();
    render(<App />);

    const amountInput = (await screen.findByDisplayValue('1')) as HTMLInputElement;
    const resultInput = document.getElementById('to-input-amount') as HTMLInputElement;

    await waitFor(() => {
      expect(resultInput.value).toBe('2.95');
    });

    fireEvent.change(amountInput, {
      target: { value: '2' }
    });

    expect(resultInput.value).toBe('5.9');
  });
});
