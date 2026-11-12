import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '../Navigation'

describe('Navigation', () => {
  beforeEach(() => {
    // run rAF synchronously so scroll handling settles within the assertion
    // @ts-ignore
    global.requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(0)
      return 0
    }
    // @ts-ignore
    global.cancelAnimationFrame = () => {}
    window.scrollY = 0
  })

  test('renders nav with role and aria-label', () => {
    render(<Navigation />)
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })

  test('exposes the primary links and the Discord call to action', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: /edge projects/i })).toHaveAttribute('href', '/#projects')
    expect(screen.getByRole('link', { name: /^discord$/i })).toHaveAttribute(
      'href',
      'https://discord.gg/CC6ZQ4cnkn'
    )
  })

  test('no longer links to the removed AI + X roadmap', () => {
    render(<Navigation />)
    expect(screen.queryByRole('link', { name: /roadmap/i })).not.toBeInTheDocument()
  })

  test('toggle opens and closes the menu', () => {
    render(<Navigation />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  test('the open menu is reflected on the nav for the mobile CSS to hook into', () => {
    render(<Navigation />)
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toHaveAttribute('data-open', 'false')

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    expect(nav).toHaveAttribute('data-open', 'true')
  })

  test('Escape closes the menu when open', () => {
    render(<Navigation />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  test('clicking a link closes the menu', () => {
    render(<Navigation />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    fireEvent.click(screen.getByRole('link', { name: /mission/i }))
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false')
  })

  test('scrolling marks the nav as condensed', () => {
    render(<Navigation />)
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toHaveAttribute('data-scrolled', 'false')

    // @ts-ignore
    window.scrollY = 240
    fireEvent.scroll(window)
    expect(nav).toHaveAttribute('data-scrolled', 'true')
  })
})
