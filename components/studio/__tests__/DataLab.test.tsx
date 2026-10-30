import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import DataLab from '../DataLab'

test('sorting a filtered DataFrame keeps its displayed code and rows consistent', () => {
  render(<DataLab />)
  fireEvent.click(screen.getByRole('button', { name: 'Filter rows' }))
  fireEvent.click(screen.getByRole('checkbox', { name: 'Oldest first' }))
  expect(
    screen.getByText('df[df["Age"] >= 18].sort_values("Age", ascending=False)'),
  ).toBeInTheDocument()
  const rows = within(screen.getByRole('table')).getAllByRole('row')
  expect(rows).toHaveLength(5)
  expect(rows[1]).toHaveTextContent('Tommy')
  fireEvent.change(screen.getByLabelText('Age at least'), {
    target: { value: '31' },
  })
  expect(
    screen.getByText('No rows match this condition. Try a lower age.'),
  ).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /Reset example/ }))
  expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(7)
})

test('a changed age condition no longer labels the result as the fixed Adult definition', () => {
  render(<DataLab />)
  fireEvent.change(screen.getByLabelText('Age at least'), {
    target: { value: '25' },
  })
  expect(
    screen.getByRole('columnheader', { name: /Matches/ }),
  ).toBeInTheDocument()
  expect(
    screen.getByText('df["Matches"] = (df["Age"] >= 25).astype(int)'),
  ).toBeInTheDocument()
})
