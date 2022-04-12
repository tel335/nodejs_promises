# Promesas en Javascript

En javascript, la asincronía se maneja a través de los callbacks Recuerden que node es single thread, por tanto, la misma hebra maneja todas las peticiones. Quien se encarga de ejecutar, es el event queue. En este caso, ejecutamos el primer print de consola, para luego ejecutar una función asíncrona que tiene un callback como parte de sus argumentos. Esta función queda ejecutando, por mientras el single thread pasa a la siguiente linea.

Ahí ejecuta el segundo print de pantalla, y espera hasta que el event queue haya resuelto la función asincrónica a través del callback. Una vez resuelta, devuelve el resultado al callback y se ejecuta el código que está dentro. Si necesito el resultado de esa función, si o si debo usar el resultado una vez ejecutado el callback, puesto que si no, ese valor estará 'undefined' hasta que el callback se ejecute. Si ahora, necesito llamar a otras funciones con ese valor, y a su vez, éstas a través de callbacks llamarán a otras, se transforma en lo que se conoce como `callback hell`, es decir, una seguidilla de callbacks que harán que el código sea difícil de leer y mantener. 

Para ello, existen nuestras amigas las promesas. Ver el archivo `promise.js`...

```
const promise = new Promise((resolve, rejected) => {
    setTimeout(() => {
        resolve({ message: 'OK' })
        rejected('Database error')
    }, 2000)
})

promise
    .then(blabla => console.log(blabla))
    .catch(error => console.log('Error: ' + error))
```

Las promesas son una forma de manejar ejecuciones asincrónicas, que manejan 2 estados: resolved (resuelto) y rejected (rechazado). 

Cuando la función termina su ejecución, puede quedar en alguno de estos estados, y cada uno es una especie de callback que permite devolver resultados.

Una vez que la promesa toma un estado, ésta mantendrá ese estado siempre, por tanto, no se puede volver a usar. Si se desea ejecutar otra función asincrónica, se debe instanciar otra promesa.

Las promesas tienen 2 funciones principales: then y catch.

- 'then' se ejecuta cuando la promesa resuelve correctamente, y recibe como input el resultado de la promesa.

- 'catch' se ejecuta cuando la promesa cae en estado 'rejected' y recibe como input el mensaje de error o dato que se envíe a través de 'reject'. Con catch podemos manejar los estados de error.

Veamos como evitar el callback hell usando promesas, para ello, veamos el archivo `user_search_promise.js` ...

```
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

```

Definimos una promesa y manejamos ambos estados, el resuelto y el de error.

En el estado resuelto, imprimimos en pantalla y retornamos el llamado de otra promesa. Esto nos ayuda a usar la misma promesa anterior y manejar el nuevo estado resuelto a través de otro 'then' dentro de la misma promesa anterior. Manejamos un estado de error general, el cual se activará cuando alguna de las promesas no resuelva correctamente. De esta forma el código se ve más legible.

También podemos ejecutar promesas en paralelo, veamos el archivo `promises_all.js` ...

```
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
```

`Promise.all` nos permite ejecutar varias promesas a la vez (paralelamente), y terminará una vez que todas las promesas hayan resuelto, o cuando alguna no resuelva.

Fijémonos que devuelve un arreglo con los resultados de cada promesa.

`Promise.all` es muy útil cuando tenemos que ejecutar promesas que son independientes entre sí.

No nos sirve cuando hay dependencias entre las promesas, es decir, para el caso que estamos evaluando (búsqueda de usuario y búsqueda de libro en base al nombre del usuario) no nos sirve. Para esto, podemos usar async/await.

Veamos el archivo `asyncAwait.js` ...

```
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
```

El uso de async/await nos permite ejecutar promesas que tienen dependencia entre sí, ya que hace que la ejecución sea secuencial, es decir, una línea después de la otra. Con esto nos aseguramos en este caso, que la función `searchBooksByUserNamePromise` siempre recibirá el nombre, y en caso contrario cuando haya un error en `searchUserByPromise`, la ejecución lanzará una excepción que será capturada en 'catch'. Esto es muy similar al manejo de excepciones en Java.

Algo muy importante, es que siempre que se necesite ocupar 'await' en una función, se debe definir ésta como 'async', puesto que en rigor es asincrónica y await lo que hará es permitir que el single thread espere al resultado de la promesa y luego avance.
