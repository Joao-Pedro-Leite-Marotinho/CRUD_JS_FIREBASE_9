import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc7gloeKQunmjLw63FKXd7nNW_2uvV_ug",
  authDomain: "clientform-8bf30.firebaseapp.com",
  projectId: "clientform-8bf30",
  storageBucket: "clientform-8bf30.appspot.com",
  messagingSenderId: "1078912032097",
  appId: "1:1078912032097:web:1ac1c54738ffedc835b920",
};

//iniciando a aplicação firebase
initializeApp(firebaseConfig);

//iniciando serviços
const db = getFirestore();

//referenciando as coleções do banco
const colRef = collection(db, "clients");

//capturando os dados do banco
onSnapshot(colRef, (snapshot) => {
  let clients = [];
  snapshot.docs.forEach((doc) => {
    clients.push({ ...doc.data(), id: doc.id });
  });
  console.log(clients);
});

//adicionando documentos
const addClientForm = document.getElementById("clientform");
addClientForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(colRef, {
    name: addClientForm.nome.value,
    email: addClientForm.email.value,
    address: addClientForm.address.value,
  }).then(() => {
    addClientForm.reset();
  });
});

//deletando documentos
const deleteClientForm = document.querySelector("#deleteform");
deleteClientForm.addEventListener("submit", (event) => {
  event.preventDefault();

 const docId = deleteClientForm.elements['del'].value

  deleteDoc(doc(db, 'clients', docId)).then(() => {
    deleteClientForm.reset();
  })

});

//atualizando documentos
const updateForm = document.querySelector("#updateform");
updateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const docId = updateForm.elements['updateid'].value
  const name = updateForm.elements['updatenome'].value
  const email = updateForm.elements['updateemail']
  const address = updateForm.elements['updateaddress'].value
  
  try{
    const docRef = doc(db, 'clients', docId)
    updateDoc(docRef, {name, email, address})
    console.log(`Documento ID ${docId} atualizado com sucesso.`)
  }
  catch(error){
    console.error("Erro ao atualizar o documento" + error)
  }
  
});

//pesquisando docs
const findForm = document.querySelector('#findform')
const table = document.querySelector('#table tbody')
findForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const docId = findForm.elements['findid'].value

  try{
    const docRef = doc(db, 'clients', docId)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
        const docData = docSnap.data()
        console.log(`Documento ID ${docId} encontrado: `, docData)
        
        //exibir dados na tela
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = docId
        row.appendChild(idCell)
        const nameCell = document.createElement('td')
        nameCell.textContent = docData.name
        row.appendChild(nameCell)
        const emailCell = document.createElement('td')
        emailCell.textContent = docData.email
        row.appendChild(emailCell)
        const addressCell = document.createElement('td')
        phoneCell.textContent = docData.address
        row.appendChild(addressCell)
        table.appendChild(row)
    }
    else{
        console.log(`Documento ${docId} não encontrado`)
    }
  }
  catch(error){
    console.error('Erro ao pesquisar documento: ', error)
  }

});