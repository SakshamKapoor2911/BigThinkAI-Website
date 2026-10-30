export type FilterName = 'edges' | 'blur' | 'sharpen'
export const FILTERS: Record<
  FilterName,
  { label: string; kernel: number[]; divisor: number; explanation: string }
> = {
  edges: {
    label: 'Find edges',
    kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
    divisor: 1,
    explanation:
      'Similar neighbors cancel out. Changes in brightness stand out.',
  },
  blur: {
    label: 'Soften',
    kernel: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    divisor: 9,
    explanation: 'Average nine neighboring pixels to soften the details.',
  },
  sharpen: {
    label: 'Sharpen',
    kernel: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    divisor: 1,
    explanation: 'Emphasize the center pixel and subtract its neighbors.',
  },
}

export function sampleImage(size = 18): number[][] {
  return Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => {
      if (y >= size - 3) return 85
      const building = x >= 4 && x < size - 4 && y >= 5 && y < size - 3
      const roof = y >= 3 && y < 5 && Math.abs(x - (size - 1) / 2) < (y - 1) * 2
      if (roof) return 52
      if (!building) return 230
      if (y >= size - 6 && x >= 8 && x <= 9) return 50
      return y % 3 !== 2 && x % 3 !== 1 ? 62 : 165
    }),
  )
}

export function pixelCalculation(
  image: number[][],
  kernel: number[],
  row: number,
  col: number,
  divisor = 1,
) {
  const values = kernel.map((weight, i) => {
    const y = Math.min(
      image.length - 1,
      Math.max(0, row + Math.floor(i / 3) - 1),
    )
    const x = Math.min(image[0].length - 1, Math.max(0, col + (i % 3) - 1))
    return { pixel: image[y][x], weight, product: image[y][x] * weight }
  })
  const sum =
    values.reduce((total, value) => total + value.product, 0) / divisor
  return { values, sum, output: Math.max(0, Math.min(255, Math.round(sum))) }
}

export function convolve(
  image: number[][],
  kernel: number[],
  divisor = 1,
): number[][] {
  return image.map((row, y) =>
    row.map((_, x) => pixelCalculation(image, kernel, y, x, divisor).output),
  )
}

export const PEOPLE = [
  { name: 'Amy', age: 12, occupation: 'Sailor' },
  { name: 'Joseph', age: 18, occupation: 'Lawyer' },
  { name: 'Rebecca', age: 19, occupation: 'Doctor' },
  { name: 'Karl', age: 25, occupation: 'Firefighter' },
  { name: 'Tommy', age: 30, occupation: 'Actor' },
  { name: 'Alex', age: 8, occupation: 'YouTuber' },
]
export function selectAdults(minAge: number) {
  return PEOPLE.filter((person) => person.age >= minAge)
}

export type CoreTrack =
  | 'Fundamentals & Traditional ML'
  | 'Natural Language Processing'
  | 'Computer Vision'
  | 'LLMs & Autonomous Agents'

export type ApplicationVertical =
  | 'Software Engineering & Dev Tools'
  | 'Robotics & Spatial AI'
  | 'Linguistics & Communication'
  | 'Finance & FinTech'
  | 'Healthcare & Life Sciences'
  | 'Social Impact & Governance'

// Backward-compatible alias
export type Track = CoreTrack

export type Workshop = {
  slug: string
  sourceTitle: string
  number: string
  title: string
  description: string
  track: CoreTrack
  vertical: ApplicationVertical
  level: string
  time: string
  prerequisite: string
  notebook: string
  slides?: string
  recording?: string
  interactive?: boolean
  concepts: [string, string][]
  takeaway: string
}
const colab = (id: string) => `https://colab.research.google.com/drive/${id}`
const slides = (id: string) =>
  `https://docs.google.com/presentation/d/${id}/edit`
const recording = (id: string) => `https://drive.google.com/file/d/${id}/view`

// Deliberately selected student-facing records, not a public export of the private Drive index.
// Source IDs and original titles are recorded in design/LEARNING-SOURCES.md.
export const WORKSHOPS: Workshop[] = [
  {
    slug: 'computer-vision',
    sourceTitle: 'Intro to Computer Vision',
    number: '01',
    title: 'See what a computer sees.',
    description:
      'Turn pixels into edges. Change a tiny filter and watch an image transform.',
    track: 'Computer Vision',
    vertical: 'Robotics & Spatial AI',
    level: 'Beginner friendly',
    time: '8 min',
    prerequisite: 'A little curiosity. Basic Python helps with the notebook.',
    notebook: colab('1i6zCAeOtQnIlTnsTDy5rwk6tN8nISthd'),
    slides: slides('1kVWhWugAV5CJjzfIQ6rmqKSLNjY86x_LKIjta029IGs'),
    interactive: true,
    concepts: [
      [
        'An image is numbers',
        'Each square has a brightness value. A grayscale image is a grid of numbers from 0 to 255.',
      ],
      [
        'A small window, a big difference',
        'A filter multiplies a 3×3 neighborhood by nine weights, then adds the products. Repeating this across the image creates a new one.',
      ],
      [
        'Build on the idea',
        'The original workshop continues into color segmentation and object detection. These fixed filters are a starting point for understanding learned visual features.',
      ],
    ],
    takeaway:
      'Explain how neighboring pixel values and filter weights combine to produce one output pixel.',
  },
  {
    slug: 'working-with-data',
    sourceTitle: 'Intro to AI/ML',
    number: '02',
    title: 'Make sense of a little data.',
    description:
      'Explore a DataFrame, build a new column, and see exactly which rows change.',
    track: 'Fundamentals & Traditional ML',
    vertical: 'Software Engineering & Dev Tools',
    level: 'Beginner friendly',
    time: '6 min',
    prerequisite:
      'No prerequisites for the mini lab. Basic Python for the notebook.',
    notebook: colab('10Yi2JjnJH28dpSv-uRShvU_2ASrUbpdb'),
    slides: slides('1g8s39jUXf7NB-4ZcYo2OW6ErEJ5jfiPd5FVqU5Rog7g'),
    recording: recording('1BnA2z4QGMSPMQXRwwfDB-8mtYYMC-dqp'),
    interactive: true,
    concepts: [
      [
        'Meet the DataFrame',
        'Rows hold observations. Columns hold attributes. Our workshop uses a small table of names, ages, and occupations.',
      ],
      [
        'Turn a question into an operation',
        'Is this person an adult? Compare their age with a boundary and store the result in a new column.',
      ],
      [
        'Check the boundary',
        'At age 18, a >= 18 comparison is true. A > 18 comparison gives a different answer. Small choices matter.',
      ],
    ],
    takeaway:
      'Connect a simple comparison to a new column, then explain why a boundary row is included.',
  },
  {
    slug: 'sql',
    sourceTitle: 'Intro to SQL',
    number: '03',
    title: 'Ask better questions of data.',
    description:
      'Write a query one choice at a time. See the matching rows, then open the full SQL lab.',
    track: 'Fundamentals & Traditional ML',
    vertical: 'Software Engineering & Dev Tools',
    level: 'Beginner friendly',
    time: '7 min',
    prerequisite: 'Comfort reading a small table.',
    notebook: colab('1i4OcynXxfHDjdvr_xlnpXISjpvSiPXFd'),
    slides: slides('1Soge-URbK_5Ti2AbmJVd2hqCXlfw67cCuXOPsZGtObk'),
    recording: recording('1AzBBEcQYb4pAHfjUYW7AikBL3_QsllEz'),
    interactive: true,
    concepts: [
      [
        'Choose columns',
        'SELECT describes the columns you want, and FROM identifies the table. SQL is a declarative query language.',
      ],
      [
        'Keep matching rows',
        'WHERE applies a condition. Compare the result with the source rows to understand what the query does.',
      ],
      [
        'Go beyond one table',
        'The original lab explores salaries and movies, then adds aggregation, joins, subqueries, and an optional SQL assistant.',
      ],
    ],
    takeaway:
      'Read a SELECT / WHERE query and predict its result on a small example table.',
  },
  {
    slug: 'research-assistants',
    sourceTitle: 'Building an AI Research Assistant',
    number: '04',
    title: 'Give an answer somewhere to start.',
    description:
      'Follow a question through chunks, retrieval, context, and a research report.',
    track: 'LLMs & Autonomous Agents',
    vertical: 'Software Engineering & Dev Tools',
    level: 'Intermediate',
    time: '10 min',
    prerequisite: 'Python functions and an introduction to language models.',
    notebook: colab('1MDbhh1wLABJiaOnFDN_uIqqfE0HRAYG8'),
    slides: slides('1wwxtP8arAN-GdfSyRmsHRPa4gbxX3Bihodka05BFRW4'),
    recording: recording('1kqhECoyaQhw7a2D4YE8wIkSybc7DM-lE'),
    concepts: [
      [
        'Break down a question',
        'The notebook asks a language model to turn a research question into smaller questions.',
      ],
      [
        'Retrieve useful context',
        'An article is split into overlapping chunks. Embeddings support finding chunks related to a question.',
      ],
      [
        'Answer, then synthesize',
        'Retrieved context is supplied to the model before individual answers are combined into a report. Check the underlying sources as well as the answer.',
      ],
    ],
    takeaway:
      'Describe the role of retrieval in the workshop’s research pipeline without treating a generated answer as verified evidence.',
  },
  {
    slug: 'python-basics',
    sourceTitle: 'Python Basics',
    number: '05',
    title: 'Start with a few lines of Python.',
    description:
      'Variables, lists, decisions, loops. The building blocks behind the bigger ideas.',
    track: 'Fundamentals & Traditional ML',
    vertical: 'Software Engineering & Dev Tools',
    level: 'First steps',
    time: '10 min',
    prerequisite: 'No previous programming experience needed.',
    notebook: colab('17uosMvsGVMUIzxAJsu697BgG8WWdTPxW'),
    slides: slides('1w4YDsr2NU0_OnoXKdIm743CjdFyAbZqo6iHiHP-lBCI'),
    concepts: [
      [
        'Give values a name',
        'Numbers, text, booleans, and lists let you represent the information a program works with.',
      ],
      [
        'Make a decision',
        'An if / elif / else chain checks conditions in order. Only the first matching branch runs.',
      ],
      [
        'Repeat and reuse',
        'Loops repeat an operation. Functions give a reusable piece of logic a name.',
      ],
    ],
    takeaway:
      'Read a short Python snippet and explain how its values change. Work through the original examples in your own Colab copy.',
  },
  {
    slug: 'neural-networks',
    sourceTitle: 'Number Recognition with TensorFlow',
    number: '06',
    title: 'From a digit to a prediction.',
    description:
      'Follow handwritten digits through convolution, pooling, and classification.',
    track: 'Computer Vision',
    vertical: 'Robotics & Spatial AI',
    level: 'Intermediate',
    time: '12 min',
    prerequisite: 'Basic Python and familiarity with arrays.',
    notebook: colab('1eSFc7hGMsxAg_yT2EPZqKF3GggbQAAlH'),
    recording: recording('1eaGPYWFQ-ssK5xuJ3jTAGY19YJD0_gm2'),
    concepts: [
      [
        'Prepare the pixels',
        'The workshop scales image values into the 0–1 range and prepares image-label pairs for training.',
      ],
      [
        'Build features',
        'Convolution layers learn filters. Pooling reduces spatial dimensions, while later layers use the resulting features.',
      ],
      [
        'Look beyond one prediction',
        'Compare predictions with labels and inspect a confusion matrix to see which digits the model mixes up.',
      ],
    ],
    takeaway:
      'Explain the path from an image to class scores, and use evaluation examples rather than assuming every prediction is correct.',
  },
  {
    slug: 'sentiment-analysis',
    sourceTitle: 'Intro to Sentiment Analysis',
    number: '07',
    title: 'There is more to “not bad.”',
    description:
      'Explore the choices between raw text and a sentiment prediction.',
    track: 'Natural Language Processing',
    vertical: 'Linguistics & Communication',
    level: 'Intermediate',
    time: '10 min',
    prerequisite: 'Basic Python and DataFrames.',
    notebook: colab('1u28dCv_npqUuyoWYB3BiJHHDF-kFGql5'),
    slides: slides('1vGv4HjatcSYOO2hHnUSlR86_qpAYA2PZETKzJQ1P1ZY'),
    concepts: [
      [
        'Split text into pieces',
        'Tokenization provides units that later processing can inspect.',
      ],
      [
        'Keep meaning in view',
        'Preprocessing changes the input. Removing a negation such as “not” can change the meaning you want to classify.',
      ],
      [
        'Compare approaches',
        'The workshop explores VADER and a transformer classifier, then compares predictions with labels.',
      ],
    ],
    takeaway:
      'Explain why cleaning text is a modeling choice that should be checked against actual examples.',
  },
  {
    slug: 'controlled-generation',
    sourceTitle: 'Controlled Generation and Diffusion Models',
    number: '08',
    title: 'Give generation a little structure.',
    description:
      'Explore structured text outputs and image generation guided by spatial constraints.',
    track: 'Computer Vision',
    vertical: 'Robotics & Spatial AI',
    level: 'Intermediate',
    time: '10 min',
    prerequisite: 'Python and an introduction to generative models.',
    notebook: colab('1tE0-4p7MaIQkogI_KdmoFzxyaJ05l-HQ'),
    slides: slides('1LZjnXZDn7RtP9jknKhTaqv3ihnBNMRV_YZeS-nM6_Xk'),
    concepts: [
      [
        'Specify a structure',
        'A desired JSON shape gives an output a contract that can be checked.',
      ],
      [
        'Constrain a process',
        'Different generation methods can restrict choices or condition a model on extra information.',
      ],
      [
        'Inspect what a constraint guarantees',
        'A valid structure is useful, but it does not establish that the content is factually correct.',
      ],
    ],
    takeaway:
      'Separate a structural constraint from the broader task of verifying an output.',
  },
]
