const getTest = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: 'Test data fetched successfully' })
    }, 100)
  })
}

module.exports = {
  getTest
}
