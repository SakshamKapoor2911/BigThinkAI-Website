const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './pages/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        foreground: 'var(--color-foreground)',
        background: 'var(--color-background)',
        card: 'var(--color-card)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        destructive: 'var(--color-destructive)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
      },
      boxShadow: {
        'primary-glow': '0 4px 20px rgba(var(--color-primary-rgb), 0.28)',
      },
      fontFamily: {
        // Use CSS variables populated by next/font in `_app` so we can swap to licensed local fonts (Geist) easily.
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      borderRadius: {
        'bento': '0.9rem',
      },
    },
  },
  plugins: [],
}

export default config
