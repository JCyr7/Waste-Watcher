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
    name: 'Callen',
    score: '737'
  }
]
