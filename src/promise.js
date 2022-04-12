const promise = new Promise((resolve, rejected) => {
    setTimeout(() => {
        resolve({ message: 'OK' })
        rejected('Database error')
    }, 2000)
})

promise
    .then(blabla => console.log(blabla))
    .catch(error => console.log('Error: ' + error))
