

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDQ4WsRa74eF-AfjmQKowk272bMXuNX59A",
    authDomain: "datos-de-formulario-d7693.firebaseapp.com",
    projectId: "datos-de-formulario-d7693",
    storageBucket: "datos-de-formulario-d7693.appspot.com",
    messagingSenderId: "403632364144",
    appId: "1:403632364144:web:644265f168d94749f432b5",
    measurementId: "G-HRLNJHNG78"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);





// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    //validad campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, intriducí tu nombre'
        errorNombre.classList.add('error-message')
    }
    else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //validad correo
   let emailEntrada = document.getElementById('email')
   let errorEmail = document.getElementById('emailError')
   let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!emailPattern.test(emailEntrada.value)){
    errorEmail.textContent = 'Por favor, intriducí un correo electrónico válido'
    errorEmail.classList.add('error-message')
   }else{
    errorEmail.textContent = ''
    errorEmail.classList.remove('error-message')
   }


    //validad contraseña
    let passwordEntrada = document.getElementById('password')
    let errorPassword = document.getElementById('passwordError')
    if(passwordEntrada.value.length <8){
        errorPassword.textContent = 'La contraseña debe tener al menos 8 caracteres'
        errorPassword.classList.add('error-message')
    }else {
        errorPassword.textContent = ''
        errorPassword.classList.remove('error-message')
    }


    //si todos los campos son validos envair formulario
    if(!errorNombre.textContent && !errorEmail.textContent&& !errorPassword.textContent){
        //backend que reciba la informacion
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: passwordEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        alert('El Formulario se ha enviado con exito')
        document.getElementById('formulario').reset();
    }
})
