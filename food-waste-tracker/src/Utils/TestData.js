/*
  Generates array of waste data for testing in the format of:
  [
    {
      date: -
      category: -
      amount: -
    }
  ]
*/

function getTestData() {
  const categories = ['Produce', 'Dairy', 'Grain', 'Meat', 'Fish']
  const data = []
  for (let i = 1; i <= 25; i++) {
    const date = `04/${i < 10 ? '0' + i : i}`
    const category = categories[Math.floor(Math.random() * categories.length)]
    const amount = Math.random() * 5
    data.push({date, category, amount})
  }
  return data
}

export const DATA = getTestData()

// Test data for leaderboards
export const LOCAL = [
  {
    name: 'Declan',
    score: '936'
  },
  {
    name: 'Finn',
    score: '695'
  },
  {
    name: 'Levi',
    score: '643'
  },
  {
    name: 'Gavin',
    score: '885'
  },
  {
    name: 'Chase',
    score: '737'
  }
]

export const GLOBAL = [
  {
    name: 'Finn',
    score: '695'
  },
  {
    name: 'Levi',
    score: '643'
  },
  {
    name: 'Gavin',
    score: '885'
  },
  {
    name: 'Chase',
    score: '737'
  },
  {
    name: 'Declan',
    score: '936'
  },
  {
    name: 'John',
    score: '547'
  },
  {
    name: 'Jane',
    score: '520'
  },
  {
    name: 'Dave',
    score: '654'
  },
  {
    name: 'Mary',
    score: '397'
  },
  {
    name: 'Elon',
    score: '485'
  },
  {
    name: 'Jack',
    score: '785'
  },
  {
    name: 'Cait',
    score: '120'
  },
  {
    name: 'Seth',
    score: '264'
  },
  {
    name: 'Emma',
    score: '780'
  },
  {
    name: 'Chris',
    score: '962'
  },
  {
    name: 'Owen',
    score: '432'
  },
  {
    name: 'Ben',
    score: '745'
  },
  {
    name: 'Charlotte',
    score: '703'
  },
  {
    name: 'Anna',
    score: '690'
  },
  {
    name: 'Nate',
    score: '354'
  },
  {
    name: 'Brandon',
    score: '490'
  },
  {
    name: 'Sarah',
    score: '563'
  },
  {
    name: 'Steve',
    score: '642'
  },
  {
    name: 'Bill',
    score: '185'
  }
]
