# Agenda Eletrônica
- Um programa feito utilizando o bootstrap, para o estilo, e uma API (firebase), para guardar as informações do programa;
- Esse programa é uma agenda eletrônica, ele tem as funções de "adicionar", "editar", "remover" e "favoritar um contato":
  - Adicionar: adiciona o contato, com suas iformações, na agenda (API);
  - Editar: edita as informações do contato salvo, na API; (Só para deixar claro que essa função está atualmente com um bug, na segunda, ou mais, tentativa(s) de cancelar ou finalizar uma edição, ele repete a função o número de vezes que o botão "cancelar" e "finalizar edição" foram apertados, podendo bagunçar os dados salvos no firebase)
  - Remover: remove o contato da agenda, consequentemente da API também;
  - Favoritar um contato: ela pode favoritar ou desfavoritar um contato;
- As informações salvas nessa agenda são: Nome, número de telefone, email, uma 'url' da foto, pra servir como foto do contato, descrição do contato, 'url' da página pessoal, categorias e se é um contato favorito.
- O programa ainda tem um menu, nele há a presença de dois links, o "home" e o "categorias":
  - home: É o link da página inicial, onde é realizada a adição do contato;
  - categorias: É o link para uma segunda página, ela inicialmente tinha o intuito de adicionar categorias para serem usadas no formulário de adição de contatos e na filtragem, para visualização dos contatos, pelas categorias, mas não consegui implementar a filtragem, nem utilizar essas categorias salvas no formulário.
    - A segunda página permite a adição, a remoção e a edição de uma nova categoria. (mas ela tem o mesmo bug de edição que a página home tem).
<br />

