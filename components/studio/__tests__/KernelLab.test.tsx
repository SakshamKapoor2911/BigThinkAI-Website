import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import KernelLab from '../KernelLab'

test('the pixel inspector exposes named keyboard controls and resets both selection and filter', () => {
  render(<KernelLab expanded />)
  const column = screen.getByRole('slider', { name: 'Selected pixel column' })
  const row = screen.getByRole('slider', { name: 'Selected pixel row' })
  fireEvent.change(column, { target: { value: '10' } })
  fireEvent.change(row, { target: { value: '3' } })
  expect(column).toHaveAttribute('aria-valuetext', 'Column 11 of 18')
  expect(row).toHaveAttribute('aria-valuetext', 'Row 4 of 18')
  fireEvent.click(screen.getByRole('button', { name: 'Soften' }))
  expect(screen.getByRole('img', { name: /Soften result/ })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /Reset lab/ }))
  expect(column).toHaveAttribute('aria-valuetext', 'Column 7 of 18')
  expect(row).toHaveAttribute('aria-valuetext', 'Row 9 of 18')
  expect(
    screen.getByRole('img', { name: /Find edges result/ }),
  ).toBeInTheDocument()
})
