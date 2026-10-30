import { useState } from 'react'
import { PEOPLE, selectAdults } from '../../lib/learning'

export default function DataLab({ sql = false }: { sql?: boolean }) {
  const [threshold, setThreshold] = useState(18)
  const [operation, setOperation] = useState<'column' | 'filter'>('column')
  const [descending, setDescending] = useState(false)
  const [answer, setAnswer] = useState<boolean | null>(null)
  const showFiltered = sql || operation === 'filter'
  const selected = selectAdults(threshold)
  const rows = showFiltered
    ? [...selected].sort((a, b) =>
        descending ? b.age - a.age : PEOPLE.indexOf(a) - PEOPLE.indexOf(b),
      )
    : PEOPLE
  const column = threshold === 18 ? 'Adult' : 'Matches'
  const code = sql
    ? `SELECT Name, Age, Occupation\nFROM People\nWHERE Age >= ${threshold}${descending ? '\nORDER BY Age DESC' : ''};`
    : operation === 'column'
      ? `df["${column}"] = (df["Age"] >= ${threshold}).astype(int)`
      : `df[df["Age"] >= ${threshold}]${descending ? '.sort_values("Age", ascending=False)' : ''}`
  return (
    <div className="st-data-lab">
      <div className="st-lab-bar">
        <span>
          <i /> {sql ? 'QUERY PLAYGROUND' : 'DATAFRAME PLAYGROUND'}
        </span>
        <span>SAMPLE DATA</span>
      </div>
      <div className="st-data-content">
        <h3>
          {sql
            ? 'A question, written as a query.'
            : 'One condition. A new way to see the table.'}
        </h3>
        <p>
          {sql
            ? 'A small teaching table inspired by our SQL workshop. Change the condition and compare the returned rows.'
            : 'Meet the six people from our Intro to AI/ML notebook. Add a column, then try filtering the rows.'}
        </p>
        <div className="st-data-controls">
          {!sql && (
            <div
              className="st-segmented"
              role="group"
              aria-label="DataFrame operation"
            >
              <button
                aria-pressed={operation === 'column'}
                onClick={() => setOperation('column')}
              >
                Add a column
              </button>
              <button
                aria-pressed={operation === 'filter'}
                onClick={() => setOperation('filter')}
              >
                Filter rows
              </button>
            </div>
          )}
          <label>
            Age at least{' '}
            <select
              value={threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
            >
              {[0, 18, 19, 25, 31].map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </label>
          {showFiltered && (
            <label className="st-checkbox">
              <input
                type="checkbox"
                checked={descending}
                onChange={(event) => setDescending(event.target.checked)}
              />{' '}
              Oldest first
            </label>
          )}
        </div>
        <pre className="st-code">
          <code>{code}</code>
        </pre>
        <div className="st-table-scroll">
          <table className="st-data-table">
            <caption className="st-sr-only">
              {sql ? 'Query results' : 'Example DataFrame'} using the selected
              age condition
            </caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Occupation</th>
                {!showFiltered && (
                  <th>
                    {column} <span>new column</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((person) => (
                <tr
                  key={person.name}
                  className={person.age >= threshold ? 'st-row-match' : ''}
                >
                  <td>{person.name}</td>
                  <td>{person.age}</td>
                  <td>{person.occupation}</td>
                  {!showFiltered && (
                    <td>
                      <span className="st-result-chip">
                        {Number(person.age >= threshold)}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    No rows match this condition. Try a lower age.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="st-data-count" aria-live="polite">
          {selected.length} of {PEOPLE.length} people match Age ≥ {threshold}.
        </p>
        <div className="st-knowledge-check">
          <strong>A quick prediction</strong>
          <p>With Age ≥ 18, does Joseph (age 18) match?</p>
          <div>
            <button
              aria-pressed={answer === true}
              onClick={() => setAnswer(true)}
            >
              Yes, he matches
            </button>
            <button
              aria-pressed={answer === false}
              onClick={() => setAnswer(false)}
            >
              No, he does not
            </button>
          </div>
          {answer !== null && (
            <p role="status">
              {answer
                ? 'Exactly. ≥ includes the boundary, so 18 matches.'
                : 'Look at the equals part of ≥. A value of exactly 18 matches too.'}
            </p>
          )}
        </div>
        <button
          className="st-text-button"
          onClick={() => {
            setThreshold(18)
            setOperation('column')
            setDescending(false)
            setAnswer(null)
          }}
        >
          Reset example ↺
        </button>
      </div>
    </div>
  )
}
