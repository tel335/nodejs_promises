import { searchUserByPromise } from './data/user'
import { searchBooksByUserNamePromise } from './data/books'

async function performSearch (id) {
    console.log('Antes!')
    
    try {
        const user = await searchUserByPromise(id)
        const books = await searchBooksByUserNamePromise(user.name)

        console.log(`Usuario: ${user.name}`)
        books.forEach(book => {
            console.log(`Libro: ${book.book}`)
        })
    } catch (error) {
        console.log(error)
    }
}

performSearch(1)
