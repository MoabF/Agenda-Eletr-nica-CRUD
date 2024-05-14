class CATEGORIAS{
    constructor({id, categoria}){
        this.id = id;
        this.categoria = categoria;
    }
}
const formCategorias = document.getElementById('formCategorias');
const categor = document.getElementById('categorias');
const botao = document.getElementById('botao');


document.addEventListener('DOMContentLoaded', listcategorias);

formCategorias.addEventListener('submit', submitCategory);

function listcategorias(){
     fetchcategorias()
     .then(categorias => {
         rendercategorias(categorias);
     })
     .catch(error => {
         console.error('Houve um problema ao buscar as categorias:', error);
     });

}

function submitCategory(event){
    event.preventDefault(); 

    const formData = new FormData(formCategorias);
    const categoryData = {
        categoria: formData.get('categoria'),
    };

    addCategory(categoryData)
        .then(() => {
            return fetchcategorias();
        })
        .then(categorias => {
            rendercategorias(categorias);
            formCategorias.reset(); 
        })
        .catch(error => {
            console.error('Houve um problema ao adicionar a categoria:', error);
        });
}


function fetchcategorias() {
    return fetch('https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/categorias.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta de rede não foi ok');
            }
            return response.json();
        })
        .then(categorias => {
            const categoriasList = [];
            for (let key in categorias) {
                const categ = new CATEGORIAS({
                id: key,
                categoria: categorias[key].categoria 
            })
                categoriasList.push(categ);
            }
            return categoriasList;
        });
}

function addCategory(categoryData) {
    return fetch('https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/categorias.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta de rede não foi ok');
            }
        });
}

function rendercategorias(categorias) {
    categor.innerHTML = '';

    categorias.forEach(category => {
        const categoryElement = createCategoryElement(category);
        categor.appendChild(categoryElement);
    });
}

function createCategoryElement(category) {
    const categoryElement = document.createElement('div');
    categoryElement.setAttribute('class', 'p-3 m-3 d-flex flex-row bg-light');
    const posicao_buttons = document.createElement('div');
    posicao_buttons.setAttribute('class', 'd-flex flex-column float-right w-25' );
    const posicao_texto = document.createElement('div');
    posicao_texto.setAttribute('class', 'float-right d-flex flex-wrap flex-column w-75' );

    const editar = document.createElement('button'); 
    editar.textContent = `EDITAR`;
    editar.setAttribute('class', 'mt-1 btn btn-primary');

    const excluir = document.createElement('button'); 
    excluir.textContent = `EXCLUIR`;
    excluir.setAttribute('class', 'mt-1 btn btn-danger');
    
    const botaoeditar = document.createElement('button');
    botaoeditar.setAttribute('class', 'ml-1 btn btn-success');
    botaoeditar.setAttribute('id', 'edit');

    const botaocancelar = document.createElement('button');
    botaocancelar.setAttribute('class', 'ml-1 btn btn-danger');
    botaocancelar.setAttribute('id', 'cancel');

    botaoeditar.textContent = `FINALIZAR EDIÇÃO`;
    botaocancelar.textContent = `CANCELAR EDIÇÃO`


    categoryElement.appendChild(posicao_texto);
    posicao_texto.textContent = `CATEGORIA: ${category.categoria}`;
    categoryElement.appendChild(posicao_buttons);
    posicao_buttons.appendChild(editar);
    posicao_buttons.appendChild(excluir);
        excluir.addEventListener('click', function () {
        remover(category.id);
    });
        editar.addEventListener('click', function () {
            botao.appendChild(botaocancelar);
            botao.appendChild(botaoeditar);
            editarC(category.id);
        });
    return categoryElement;
}


function remover(categoryId){

    if (!confirm("Tem certeza que deseja excluir esta categoria?")) {
        return; 
    }

    fetch(`https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/categorias/${categoryId}.json`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Resposta de rede não foi ok');
        }
        return fetchcategorias();
    })
    .then(categorias => {
        rendercategorias(categorias);
    })
    .catch(error => {
        console.error('Houve um problema ao editar a categoria:', error);
    });

    alert('Categoria excluído com sucesso!');
}

function editarC(categoryId) {
    const formCategoria = document.getElementById('categoria');
    const edit = document.getElementById('edit');
    const cancel = document.getElementById('cancel');
    fetch('https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/categorias.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Resposta de rede não foi ok');
        }
        return response.json();
    })
    .then(categorias => {
        formCategoria.value = categorias[categoryId].categoria;
    });
    const Funcaocancel = () => {
        if (!confirm("Tem certeza que deseja cancelar a edição?")) {
            return; 
        }
    formCategorias.reset(); 

    botao.removeChild(cancel);
    botao.removeChild(edit);
    alert('Edição cancelada com sucesso!');
        cancel.removeEventListener("click", Funcaocancel);
      };
    cancel.addEventListener('click', Funcaocancel);
    const Funcaoeditar = () => {
        if (!confirm("Tem certeza que deseja encerrar a edição?")) {
            return; 
        }
        
        fetch(`https://mini-projeto-4-web1-moabf-default-rtdb.firebaseio.com/categorias/${categoryId}.json`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                categoria: formCategoria.value,
            }), 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta de rede não foi ok');
            }
            return fetchcategorias();
        })
        .then(categorias => {
            rendercategorias(categorias);
           
            formCategorias.reset(); // Limpa o formulário após a edição
        })
        .catch(error => {
            console.error('Houve um problema ao editar a categoria:', error);
        });
        alert('Edição realizada com sucesso!');
        botao.removeChild(cancel);
        botao.removeChild(edit);
        edit.removeEventListener("click", Funcaoeditar);
    };
        edit.addEventListener('click', Funcaoeditar);
}