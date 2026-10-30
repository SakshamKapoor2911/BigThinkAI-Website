import { useMemo, useState } from 'react'
import {
  convolve,
  FILTERS,
  FilterName,
  pixelCalculation,
  sampleImage,
} from '../../lib/learning'

const IMAGE = sampleImage()
function PixelImage({
  pixels,
  label,
  selected,
  inspect,
}: {
  pixels: number[][]
  label: string
  selected?: [number, number]
  inspect?: (row: number, col: number) => void
}) {
  const n = pixels.length
  return (
    <svg
      viewBox={`0 0 ${n * 10} ${n * 10}`}
      role="img"
      aria-label={label}
      className="st-pixel-image"
      onClick={(event) => {
        if (!inspect) return
        const box = event.currentTarget.getBoundingClientRect()
        inspect(
          Math.min(
            n - 1,
            Math.max(
              0,
              Math.floor(((event.clientY - box.top) / box.height) * n),
            ),
          ),
          Math.min(
            n - 1,
            Math.max(
              0,
              Math.floor(((event.clientX - box.left) / box.width) * n),
            ),
          ),
        )
      }}
    >
      {pixels.flatMap((row, y) =>
        row.map((value, x) => (
          <rect
            key={`${y}-${x}`}
            x={x * 10}
            y={y * 10}
            width="10"
            height="10"
            fill={`rgb(${Math.round(28 + value * 0.85)}, ${Math.round(52 + value * 0.76)}, ${Math.round(88 + value * 0.62)})`}
          />
        )),
      )}
      {selected && (
        <rect
          x={selected[1] * 10}
          y={selected[0] * 10}
          width="10"
          height="10"
          fill="none"
          stroke="#f8ad67"
          strokeWidth="2"
        />
      )}
    </svg>
  )
}

export default function KernelLab({
  expanded = false,
}: {
  expanded?: boolean
}) {
  const [mode, setMode] = useState<FilterName>('edges')
  const [row, setRow] = useState(8)
  const [col, setCol] = useState(6)
  const filter = FILTERS[mode]
  const output = useMemo(
    () => convolve(IMAGE, filter.kernel, filter.divisor),
    [filter],
  )
  const calculation = pixelCalculation(
    IMAGE,
    filter.kernel,
    row,
    col,
    filter.divisor,
  )
  return (
    <div className={`st-kernel-lab ${expanded ? 'is-expanded' : ''}`}>
      <div className="st-lab-bar">
        <span>
          <i /> A LITTLE COMPUTER VISION
        </span>
        <span>INTERACTIVE / 01</span>
      </div>
      <div className="st-lab-canvas">
        <div>
          <span className="st-image-label">THE INPUT</span>
          <PixelImage
            pixels={IMAGE}
            label="Synthetic grayscale building, represented as an 18 by 18 pixel grid"
            selected={expanded ? [row, col] : undefined}
            inspect={
              expanded
                ? (r, c) => {
                    setRow(r)
                    setCol(c)
                  }
                : undefined
            }
          />
        </div>
        <div className="st-lab-connector">
          <span>3 × 3</span>
          <svg
            width="40"
            height="25"
            viewBox="0 0 40 25"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M2 12h35m-7-7 7 7-7 7" />
          </svg>
          <span>FILTER</span>
        </div>
        <div>
          <span className="st-image-label">
            {mode === 'edges'
              ? 'THE EDGES'
              : mode === 'blur'
                ? 'THE SOFTER IMAGE'
                : 'THE SHARPER IMAGE'}
          </span>
          <PixelImage
            pixels={output}
            label={`${filter.label} result, calculated from the sample image`}
            selected={expanded ? [row, col] : undefined}
          />
        </div>
      </div>
      <div
        className="st-filter-controls"
        role="group"
        aria-label="Choose an image filter"
      >
        {(Object.keys(FILTERS) as FilterName[]).map((key) => (
          <button
            key={key}
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
          >
            {FILTERS[key].label}
          </button>
        ))}
      </div>
      <div className="st-lab-explanation">
        <div className="st-mini-kernel" aria-label={`${filter.label} kernel`}>
          {filter.kernel.map((value, i) => (
            <span key={i}>{value}</span>
          ))}
        </div>
        <div>
          <strong>Small filter. Different perspective.</strong>
          <p aria-live="polite">{filter.explanation}</p>
        </div>
      </div>
      {expanded && (
        <div className="st-pixel-inspector">
          <div className="st-inspector-title">
            <h3>Follow one pixel.</h3>
            <button
              className="st-text-button"
              onClick={() => {
                setMode('edges')
                setRow(8)
                setCol(6)
              }}
            >
              Reset lab ↺
            </button>
          </div>
          <p>
            Click the input image or use the controls to choose a pixel. These
            are real calculations on a small sample image.
          </p>
          <div className="st-inspector-sliders">
            <label>
              Row <output>{row + 1}</output>
              <input
                type="range"
                min="0"
                max="17"
                aria-label="Selected pixel row"
                aria-valuetext={`Row ${row + 1} of ${IMAGE.length}`}
                value={row}
                onChange={(event) => setRow(Number(event.target.value))}
              />
            </label>
            <label>
              Column <output>{col + 1}</output>
              <input
                type="range"
                min="0"
                max="17"
                aria-label="Selected pixel column"
                aria-valuetext={`Column ${col + 1} of ${IMAGE[0].length}`}
                value={col}
                onChange={(event) => setCol(Number(event.target.value))}
              />
            </label>
          </div>
          <div className="st-calculation-grid">
            {calculation.values.map((value, i) => (
              <div key={i}>
                <span>
                  {value.pixel} × {value.weight}
                </span>
                <strong>{value.product}</strong>
              </div>
            ))}
          </div>
          <p className="st-calculation-result" aria-live="polite">
            Add the nine products
            {filter.divisor !== 1
              ? `, then divide by ${filter.divisor}`
              : ''}: <strong>{Number(calculation.sum.toFixed(2))}</strong> →
            displayed brightness <strong>{calculation.output}</strong>
          </p>
          <details>
            <summary>What happens at the image boundary?</summary>
            <p>
              This mini lab repeats the nearest edge pixel for missing
              neighbors, rounds the sum, and clips it to 0–255. The diagram uses
              blue-tinted brightness to make the image easier to inspect.
            </p>
          </details>
        </div>
      )}
    </div>
  )
}
