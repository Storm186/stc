document.getElementById('toggleMode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.navbar').classList.toggle('navbar-dark-mode');
    document.querySelector('.navbar').classList.toggle('navbar-light-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Modo Día' : 'Modo Noche';
});

const cargarComentarios = () => {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    const filtroComentarios = document.getElementById('filtro-comentarios');
    const listaComentarios = document.getElementById('lista-comentarios');

    const renderComentarios = (filtro) => {
        listaComentarios.innerHTML = '';
        comentarios
            .filter(comentario => comentario.fecha === filtro || filtro === 'todos')
            .forEach(comentario => {
                const comentarioElement = document.createElement('div');
                comentarioElement.classList.add('card');

                comentarioElement.innerHTML = `
                    <div class="card-header" id="heading${comentario.id}">
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${comentario.id}" aria-expanded="true" aria-controls="collapse${comentario.id}">
                                ${comentario.titulo}
                            </button>
                        </h2>
                    </div>
                    <div id="collapse${comentario.id}" class="collapse" aria-labelledby="heading${comentario.id}" data-parent="#lista-comentarios">
                        <div class="card-body">
                            ${comentario.contenido}
                        </div>
                    </div>
                `;
                listaComentarios.appendChild(comentarioElement);
            });
    };

    filtroComentarios.addEventListener('change', function () {
        renderComentarios(this.value);
    });

    renderComentarios('todos');
};

document.getElementById('form-nuevo-post').addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

    const nuevoComentario = {
        id: comentarios.length + 1,
        titulo,
        contenido,
        fecha: 'actuales'
    };

    comentarios.push(nuevoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));

    cargarComentarios();
    document.getElementById('form-nuevo-post').reset();
});

cargarComentarios();
