import { render, screen, fireEvent } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import SpecificBook from '../components/SpecificBook';
import { BooksContextProvider } from '../contexts/BooksContext';
import { CartContextProvider } from '../contexts/CartContext';

describe('SpecificBook', () => {
  const books = [{id: 1, author: '', price: 10, image: '', title: '', level: '', tags: [], description: ''}];

  const renderComponent = () => {
    return (
        <BooksContextProvider value={{books}}>
          <CartContextProvider value={[]}>
            <MemoryRouter initialEntries={[`/book/1`]}>
              <Routes>
                  <Route path="/book/:bookId" element={<SpecificBook />}/> 
              </Routes>
            </MemoryRouter>
          </CartContextProvider>
        </BooksContextProvider>
    );
  }
  
  test('При кліку збільшення кількості - кількість повинна збільшуватися', () => {
    render(renderComponent());
    const increaseValueButton = screen.getByTestId('increase-button');
    const input = screen.getByTestId('input');
    const expectedValue = Number.parseInt(input.value) + 1;

    fireEvent.click(increaseValueButton);

    expect(Number.parseInt(input.value)).toEqual(expectedValue);
  });

  test('При кліку зменшення кількості - кількість повинна зменшуватися', () => {
    render(renderComponent());
    const decreaseValueButton = screen.getByTestId('decrease-button');
    const input = screen.getByTestId('input');
    const expectedValue = 1;

    fireEvent.change(input, {target: {value: '2'}});
    fireEvent.click(decreaseValueButton);

    expect(Number.parseInt(input.value)).toEqual(expectedValue);
  });
  
  test('При зміні кількості - загальна вартість повинна змінюватися', () => {
    render(renderComponent());
    const input = screen.getByTestId('input');
    const total = screen.getByTestId("total-price");
    const initialTotalvalue = total.innerHTML;

    fireEvent.change(input, {target: {value: '2'}});

    expect(initialTotalvalue).not.toEqual(total.innerHTML);
  });
});



