import { searchUserByCallback } from './data/user'

console.log('Antes!')
setTimeout(() => {
    console.log('Buscando información...')
    searchUserByCallback(1, (user) => {
        console.log(user)
    })
}, 2000)
console.log('Después!')
