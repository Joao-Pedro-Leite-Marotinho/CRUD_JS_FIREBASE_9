import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
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
const deleteClientForm = document.getElementById("deleteform");
deleteClientForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const docRefB = doc(db, "clients", deleteClientForm.id.value);

  deleteDoc(doc(docRefB)).then(() => {
    deleteClientForm.reset();
  });
});

//atualizando documentos
const updateForm = document.getElementById("updateform");
updateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const docRef = doc(db, "clients", updateForm.updateid.value);

  updateDoc(docRef, {
    name: updateForm.updatenome.value,
    email: updateForm.updateemail.value,
    address: updateForm.updateaddress.value,
  }).then(() => {
    updateForm.reset();
  });
});

//pesquisando docs
const findForm = document.getElementById("findform");
findForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const docRef = doc(db, "clients", findForm.updateid.value);

  const docSnap = getDoc(docRef);

  let tbody = document.getElementById("tbody1");

  function addItem(name, email, address) {
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    onSnapshot(colRef, (snapshot) => {
      let clients = [];
      snapshot.docs.forEach((doc) => {
        clients.push({ ...doc.data(), id: doc.id });
      });
      
      td1.innerHTML = clients.name;
      td2.innerHTML = clients.email;
      td3.innerHTML = clients.address;

      trow.appendChild(td1);
      trow.appendChild(td2);
      trow.appendChild(td3);

      tbody.appendChild(trow);
    });
  }
});
