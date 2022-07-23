// --------Obtener datos del JSON----------------------

document.addEventListener('DOMContentLoaded', () => {
  
    fetchDataJSON()
    if (localStorage.getItem('carrito')){
      carrito = JSON.parse(localStorage.getItem('carrito'))
      mostrarCarrito()
    }

})

cards.addEventListener('click', event => {
  addCarrito(event)
})


items.addEventListener('click', event => {
  btnAccion(event)
})



const fetchDataJSON = async () => {

  try {
    const response = await fetch('/js/products.json')
    const data = await response.json()

    mostrarCard(data)
  } catch (error) {
    // console.log(error)
  }


}


// --------Mostrar Cards-------------------------------------------------

const mostrarCard = (data) => {
  // console.log(data)
  data.forEach(product => {


    let div = document.createElement('div')
    div.className = 'producto col-lg-3 col-sm-6'
    div.innerHTML = ` 
                 
                      <div class="card m-3 p-2" style="width: 18rem;">
                       <img src="${product.img}" class="rounded mx-auto d-block" id="imgCard" alt="...">
                         <div class="card-body">
                          <h5> ${product.id} </h5>
                          <h4 class="card-title">${product.nombre}</h4>
                          <p>${product.autor}</p>
                          <em class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</em>
                          <h3> ${product.precio}</h3>
                          <button type="button" id="boton${product.id}" class="btn btn-warning fw-bold">¡LO QUIERO!</button>
                        </div>
                     </div>

                    `
    cards.appendChild(div)



  })

}


// --------Agregar al Carrito con evento-----------------------------------------


const addCarrito = event => {
  // console.log(event.target.classList.contains('btn-warning'));
  if (event.target.classList.contains('btn-warning')) {
    Swal.fire(
      {
          position: 'top-end',
          icon: 'success',
          title: 'Producto agregado al carrito',
          showConfirmButton: false,
          timer: 1500
        }
        
  )
    setCarrito(event.target.parentElement)
  }


  event.stopPropagation();
}



// --------CARRITO------------------------------------------------------------

const setCarrito = objeto => {

  const producto = {
    id: objeto.querySelector('h5').textContent,
    name: objeto.querySelector('h4').textContent,
    autor: objeto.querySelector('p').textContent,
    price: objeto.querySelector('h3').textContent,
    quantity: 1
  }

  if (carrito.hasOwnProperty(producto.id)) {
    producto.quantity = carrito[producto.id].quantity + 1
  }


  carrito[producto.id] = { ...producto }
  mostrarCarrito()
  
  

}


const mostrarCarrito = () => {
  // console.log(carrito)
  items.innerHTML = ''
  Object.values(carrito).forEach(producto => {
    templateCarrito.querySelector('th').textContent = producto.id
    templateCarrito.querySelectorAll('td')[0].textContent = producto.name
    templateCarrito.querySelectorAll('td')[1].textContent = producto.quantity
    templateCarrito.querySelector('.btn-light').dataset.id = producto.id
    templateCarrito.querySelector('span').textContent = producto.quantity * producto.price

    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
  })

  items.appendChild(fragment)

  mostrarFooter()

  //Guardo el carrito en Local Storage (abandoned car)
  localStorage.setItem('carrito',JSON.stringify(carrito))
}

const mostrarFooter = () => {
  footer.innerHTML = ''
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `
    <th scope="row" colspan="5" class="totalText">Tu carrito está vacío</th>
    `
    return
  }

  const nCantidad = Object.values(carrito).reduce((acc, { quantity }) => acc + quantity, 0)
  const nPrecio = Object.values(carrito).reduce((acc, { quantity, price }) => acc + quantity * price, 0)

  templateFooter.querySelectorAll('td')[0].textContent = nCantidad
  templateFooter.querySelector('span').textContent = nPrecio

  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)

  footer.appendChild(fragment)

  const btnVaciar = document.getElementById('vaciar-carrito')
  btnVaciar.addEventListener('click', () => {

    carrito = {}
    mostrarCarrito()
  })
}

const btnAccion = event => {

  if (event.target.classList.contains('btn-light')) {
    const producto = carrito[event.target.dataset.id]
    producto.quantity--
    if (producto.quantity === 0) {
      delete carrito[event.target.dataset.id]
    }

    mostrarCarrito()
  }
  event.stopPropagation()
}




