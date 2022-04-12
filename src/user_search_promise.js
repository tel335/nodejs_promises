import { searchUserByPromise } from './data/user'
import { searchBooksByUserNamePromise } from './data/books'

const searchUserPromise = searchUserByPromise(1)
searchUserPromise
    .then(user => {
        console.log('Usuario: ' + user.name)
        return searchBooksByUserNamePromise(user.name)
    })
    .then(books => console.log(books))
    .catch(error => console.log(error))
