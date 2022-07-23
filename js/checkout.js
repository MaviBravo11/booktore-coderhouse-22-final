
// ---------Formulario compra checkout-------------------------

const baseDatosClientes= [] //

btnEnviar.addEventListener('click', () => { 

    const chequearDatos = (isNaN(parseInt(inputTel.value)) || inputNombre.value.trim() == "" || emailFormulario.value.trim() == "" || inputDomicilio.value.trim() == "") 
    if (chequearDatos) {
        Swal.fire({
            icon: 'info', 
            title: 'Oops...',
            text: 'Faltan algunos datos para la compra...',
          })
    } else {
    
    const obj = {
        nombre: inputNombre.value,
        email: emailFormulario.value,
        domicilio: inputDomicilio.value,
        telefono: inputTel.value,
       
    }
    
    baseDatosClientes.push(obj)
    console.log('Se realizó un pedido')


    let divForm = document.createElement('div')
        divForm.className = 'formEnviado m-4 p-3 text-center text-light'
        divForm.innerHTML =
        `
        <h2 id="formularioEnviado"class="fw-bold pt-5">FORMULARIO ENVIADO CORRECTAMENTE</h2>
        <p>Recibirás un mail con el detalle de tu compra en aproximadamente 5 días hábiles recibirás tu pedido</p>
        <H3 class="fw-bold">¡MUCHAS GRACIAS!</H3>
        `
        formularioEnviado.appendChild(divForm)
    }    
    
    btnCancelar.click()
    inputNombre.focus()
    localStorage.setItem("Base de datos Clientes", JSON.stringify(baseDatosClientes))

})


btnCancelar.addEventListener('click', () => {
    inputNombre.value = ""
    emailFormulario.value = ""
    inputDomicilio.value = ""
    telefono = inputTel.value = ""
})


// -------volver al inicio----------------
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    window.location.href = "index.html#principio";
})