import { searchUserByPromise } from './data/user'
import { searchBooksByUserNamePromise } from './data/books'

const searchUserPromise = searchUserByPromise(1)
const searchBooksPromise = searchBooksByUserNamePromise('Francisco')

Promise.all([
    searchUserPromise,
    searchBooksPromise
])
    .then(values => console.log(values))
    .catch(error => console.log(error))