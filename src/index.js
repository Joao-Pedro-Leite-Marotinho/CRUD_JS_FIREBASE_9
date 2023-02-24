import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCc7gloeKQunmjLw63FKXd7nNW_2uvV_ug",
    authDomain: "clientform-8bf30.firebaseapp.com",
    projectId: "clientform-8bf30",
    storageBucket: "clientform-8bf30.appspot.com",
    messagingSenderId: "1078912032097",
    appId: "1:1078912032097:web:1ac1c54738ffedc835b920"
};

//iniciando a aplicação firebase
initializeApp(firebaseConfig)

//iniciando serviços
const db = getFirestore()

//referenciando as coleções do banco
const colRef = collection(db, 'clients')

//capturando os dados do banco
onSnapshot(colRef, (snapshot) => {
    let clients = []
    snapshot.docs.forEach((doc) => {
        clients.push({ ...doc.data(), id: doc.id })
    })
    console.log(clients)
})


//adicionando documentos
const addClientForm = document.getElementById('clientform')
addClientForm.addEventListener('submit', (event) => {
    event.preventDefault()

    addDoc(colRef, {
        name: addClientForm.nome.value,
        email: addClientForm.email.value,
        address: addClientForm.address.value,
    })
    .then( () => {
        addClientForm.reset()
    })
})


//deletando documentos
const deleteClientForm = document.getElementById('deleteform')
deleteClientForm.addEventListener('submit', (event) => {
    event.preventDefault()

    //const docRef = doc(db, 'clients', deleteClientForm.id.value)

    deleteDoc(doc(db, 'clients', deleteClientForm.id.value))
        .then(() => {
            deleteClientForm.reset()
        })   
})
