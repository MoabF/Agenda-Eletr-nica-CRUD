class Contact {
    constructor({id, name, phone, email, photo, bio, page_pessoal, conhecido_por, favorito}) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.photo = photo;
        this.bio = bio;
        this.page_pessoal = page_pessoal;
        this.conhecido_por = conhecido_por;
        this.favorito = favorito;
    }
}

const contactList = document.getElementById('contact-list');
const addContactForm = document.getElementById('add-contact-form');
const botoes = document.getElementById('botoes');

const botaoeditar = document.createElement('button');
botaoeditar.setAttribute('class', 'ml-1 btn btn-success');
botaoeditar.setAttribute('id', 'edit');

const botaocancelar = document.createElement('button');
botaocancelar.setAttribute('class', 'ml-1 btn btn-danger');
botaocancelar.setAttribute('id', 'cancel');

botaoeditar.textContent = `FINALIZAR EDIÇÃO`;
botaocancelar.textContent = `CANCELAR EDIÇÃO`    


/*const filt = document.getElementById('filt');

const formCategor = document.createElement('form');
const selecao =  document.createElement('selection');
selecao.setAttribute('class', 'form-control');
selecao.setAttribute('id', 'filtro-categoria');
const selecao_nome = document.createElement('option');
selecao_nome.textContent = `Filtrar por:`;
selecao.appendChild(selecao_nome);
formCategor.appendChild(selecao);
filt.appendChild(formCategor);
*/


/*
function adicionarCategorias(){
    return fetch('https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/categorias.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Resposta de rede não foi ok');
        }
        return response.json();
    })
    .then(categorias => {
        for(let i = 0; i < categoriasValues.length; i++){
            //const categoria = categorias[i];
            const categor = categoriasValues[i];
            const categoriasValues = Object.values(categorias);
            const selecao_option = document.createElement('option');
            selecao_option.textContent = categor.categoria;
            selecao_option.value = categor.categoria;
            selecao.appendChild(selecao_option);
        }
    });
}*/


document.addEventListener('DOMContentLoaded', listContacts);

// Event listener para o envio do formulário
addContactForm.addEventListener('submit', submitContact);

function listContacts(){
     // Busca contatos na API
     fetchContacts()
     .then(contacts => {
         renderContacts(contacts);
     })
     .catch(error => {
         console.error('Houve um problema ao buscar os contatos:', error);
     });

}

function submitContact(event){
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(addContactForm);
    const contactData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        photo: formData.get('photo') || 'https://via.placeholder.com/100', // Foto padrão
        bio:  formData.get('bio'),
        page_pessoal:  formData.get('page_pessoal'),
        conhecido_por:  formData.get('conhecido_por'), //tipo de dado select
        favorito:  formData.get('favorito'), //tipo de dado select
    };

    addContact(contactData)
        .then(() => {
            return fetchContacts();
        })
        .then(contacts => {
            renderContacts(contacts);
            addContactForm.reset(); // Limpa os campos do formulário
        })
        .catch(error => {
            console.error('Houve um problema ao adicionar o contato:', error);
        });
}

// Função para buscar contatos na API
function fetchContacts() {
    return fetch('https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/contacts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta de rede não foi ok');
            }
            return response.json();
        })
        .then(contacts => {
            const contactsList = [];
            for (let key in contacts) {
                const contact = new Contact({
                    id: key, 
                    name: contacts[key].name,
                    phone: contacts[key].phone,
                    email: contacts[key].email,
                    photo: contacts[key].photo,
                    bio:  contacts[key].bio,
                    page_pessoal:  contacts[key].page_pessoal,
                    conhecido_por:  contacts[key].conhecido_por,
                    favorito:  contacts[key].favorito,
                }
                );

                //contacts.push({ id: key, ...data[key] });
                contactsList.push(contact);
            }
            return contactsList;
        });
}

// Função para adicionar contato na API
function addContact(contactData) {
    return fetch('https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/contacts.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta de rede não foi ok');
            }
        });
}

// Função para renderizar contatos na página
function renderContacts(contacts) {
    contactList.innerHTML = ''; // Limpa os contatos existentes

    contacts.forEach(contact => {
        const contactCard = createContactCard(contact);
        contactList.appendChild(contactCard);
    });
}

// Função para criar o card de contato
function createContactCard(contact) {
    
    const contactCard = document.createElement('div');
    contactCard.classList.add('contact');
    contactCard.setAttribute('class', 'p-3 m-3 d-flex flex-row bg-light');

    const posicao_buttons = document.createElement('div');
    posicao_buttons.setAttribute('class', 'd-flex flex-column float-right w-25' );
    const posicao_texto = document.createElement('div');
    posicao_texto.setAttribute('class', 'float-right d-flex flex-wrap flex-column w-75' );

    const photo = document.createElement('img');
    photo.src = contact.photo;
    photo.alt = contact.name;
    photo.style = "width: 100px; height: 100px;"
    photo.setAttribute('class', 'mr-3 mb-3 img-thumbnail img-fluid rounded float-left');

    const name = document.createElement('h3');
    name.textContent = contact.name;
    name.setAttribute('class', 'w-75 d-flex flex-wrap');


    const phone = document.createElement('p');
    phone.textContent = `Telefone: ${contact.phone}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${contact.email}`;

    /*const bio = document.createElement('p');
    bio.textContent = `Descrição: ${contact.bio}`;

    const pag_pessoal = document.createElement('p');
    pag_pessoal.textContent = `Página pessoal: ${contact.page_pessoal}`;

    const conhecido = document.createElement('p');
    conhecido.textContent = `Connhecido Pelo(a): ${contact.conhecido_por}`;*/
    


    const fav = document.createElement('button'); 

    if(contact.favorito == 1){
        fav.textContent = `Favorito`;
        fav.setAttribute('class', 'mt-1 btn btn-warning');
    }
    else{
        fav.textContent = `Favoritar?`;
        fav.setAttribute('class', 'mt-1 btn btn-secondary');
    }

    const excluir = document.createElement('button'); 
    excluir.textContent = `EXCLUIR`;
    excluir.setAttribute('class', 'mt-1 btn btn-danger');

    const editar = document.createElement('button'); 
    editar.textContent = `EDITAR`;
    editar.setAttribute('class', 'mt-1 btn btn-primary');

    contactCard.appendChild(photo);
    
    contactCard.appendChild(posicao_texto);
    
    posicao_texto.appendChild(name);
    posicao_texto.appendChild(phone);
    posicao_texto.appendChild(email);

    contactCard.appendChild(posicao_buttons);

    posicao_buttons.appendChild(fav);
    posicao_buttons.appendChild(editar);
    posicao_buttons.appendChild(excluir);

    fav.addEventListener('click', function () {
      favoritar(contact.id, contact.favorito);
    });
    
    excluir.addEventListener('click', function () {
    remover(contact.id);
});
    editar.addEventListener('click', function () {
        botoes.appendChild(botaocancelar);
        botoes.appendChild(botaoeditar);
        editarC(contact.id);
    });
    return contactCard;
}
function favoritar(contactId, favorito){   
    
    if (!confirm(`Tem certeza que deseja ${favorito == "1" ? 'desfavoritar' : 'favoritar'} este contato?`)) {
        return; 
    }
    favorito = favorito === "1" ? "0" : "1"; 
    fetch(`https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/contacts/${contactId}.json`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorito: favorito }), 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Resposta de rede não foi ok');
        }
        return fetchContacts();
    })
    .then(contacts => {
        renderContacts(contacts);
    })
    .catch(error => {
        console.error('Houve um problema ao favoritar o contato:', error);
    });
    if(favorito == "1"){
    alert('Contato favoritado com sucesso!');
    }
    else{
        alert('Contato desfavoritado com sucesso!');
    }
}
function remover(contactId){

    if (!confirm("Tem certeza que deseja excluir este contato?")) {
        return;
    }

    fetch(`https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/contacts/${contactId}.json`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Resposta de rede não foi ok');
        }
        return fetchContacts();
    })
    .then(contacts => {
        renderContacts(contacts);
    })
    .catch(error => {
        console.error('Houve um problema ao remover o contato:', error);
    });

    alert('Contato excluído com sucesso!');
}
function editarC(contactId) {
    const edit = document.getElementById('edit');
    const cancel = document.getElementById('cancel');
    const nameForm = document.getElementById('name');
    const phoneForm = document.getElementById('phone');
    const emailForm = document.getElementById('email');
    const photoForm = document.getElementById('photo'); 
    const bioForm = document.getElementById('bio'); 
    const pagePessoalForm = document.getElementById('page_pessoal');
    const conhecidoPorForm = document.getElementById('conhecido_por');
    const favoritoForm = document.getElementById('favorito'); 
    fetch('https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/contacts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Resposta de rede não foi ok');
        }
        return response.json();
    })
    .then(contacts => {
    nameForm.value = contacts[contactId].name;
    phoneForm.value = contacts[contactId].phone;
    emailForm.value = contacts[contactId].email;
    photoForm.value = contacts[contactId].photo; 
    bioForm.value = contacts[contactId].bio; 
    pagePessoalForm.value = contacts[contactId].page_pessoal;
    conhecidoPorForm.value = contacts[contactId].conhecido_por;
    favoritoForm.value = contacts[contactId].favorito; 
  });
  cancel.addEventListener('click', function () {
    if (!confirm("Tem certeza que deseja cancelar a edição?")) {
        return; 
    }
    addContactForm.reset(); 
    botoes.removeChild(cancel);
    botoes.removeChild(edit);
    alert('Edição cancelada com sucesso!');
  });
  edit.addEventListener('click', function () {
    if (!confirm("Tem certeza que deseja encerrar a edição?")) {
        return; 
    }
    
    fetch(`https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/contacts/${contactId}.json`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name: nameForm.value,
            phone: phoneForm.value,
            email: emailForm.value,
            photo: photoForm.value,
            bio:   bioForm.value,
            page_pessoal:  pagePessoalForm.value,
            conhecido_por:  conhecidoPorForm.value,
            favorito:  favoritoForm.value,
        }), 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Resposta de rede não foi ok');
        }
        return fetchContacts();
    })
    .then(contacts => {
        renderContacts(contacts);
    })
    .catch(error => {
        console.error('Houve um problema ao editar o contato:', error);
    });

    botoes.removeChild(cancel);
    botoes.removeChild(edit);
    addContactForm.reset(); 
    alert('Edição realizada com sucesso!');
  });
}