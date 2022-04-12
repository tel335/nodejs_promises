exports.searchBooksByUserNamePromise = (name) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Libros para ${name} encontrados...`)
            resolve([
                {
                    id: 12,
                    book: 'Harry Potter'
                },
                {
                    id: 123,
                    book: 'La Conspiración'
                }
            ])
        }, 2000)
    })
    return promise
}