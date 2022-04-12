exports.searchUserByPromise = async (id) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id, name: 'Francisco Cabezas'})
        }, 2000)
    })
    return promise
}

exports.searchUserByCallback = (id, callback) => {
    setTimeout(() => {
        callback({ id, name: 'Francisco Cabezas'})
    }, 2000)
}