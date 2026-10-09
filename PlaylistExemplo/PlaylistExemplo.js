document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos do DOM
    const listaMusicas = document.querySelector('.lista-musicas');
    const btnAdicionar = document.querySelector('.botao-adicionar');

    // Lista inicial de músicas mantida apenas em memória
    let musicas = [
        { id: 1, nome: "Tal música 1", imagem: "../ImgsPlaylists/ImagemB.png" },
        { id: 2, nome: "Tal música 2", imagem: "../ImgsPlaylists/ImagemC.png" },
        { id: 3, nome: "Tal música 3", imagem: "../ImgsPlaylists/ImagemD.png" }
    ];

    // Renderiza a lista de músicas no HTML
    function renderizarLista() {
        listaMusicas.innerHTML = '';

        if (musicas.length === 0) {
            listaMusicas.innerHTML = `
                <div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.6);">
                    <i class="fa-solid fa-music" style="font-size: 3rem; margin-bottom: 10px;"></i><br>
                    Nenhuma música nesta playlist.
                </div>
            `;
            return;
        }

        musicas.forEach((musica, index) => {
            const itemElemento = document.createElement('div');
            itemElemento.classList.add('item-musica');
            itemElemento.dataset.id = musica.id;

            itemElemento.innerHTML = `
                <div class="info-musica">
                    <div class="caixinha-imagem">
                        <img src="${musica.imagem}" alt="Capa do álbum" class="imagem-capa" onerror="this.src='https://via.placeholder.com/60/4a1380/ffffff?text=Capa'">
                    </div>
                    <span class="nome-musica">${musica.nome}</span>
                </div>
                <div class="acoes-musica">
                    <button class="botao-opcao" title="Mais opções" data-index="${index}">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <button class="botao-remover" title="Remover música" data-index="${index}">
                        <i class="fa-solid fa-circle-minus"></i>
                    </button>
                </div>
            `;

            listaMusicas.appendChild(itemElemento);
        });

        adicionarEventosBotoes();
    }

    // Adiciona funcionalidades aos botões dinâmicos
    function adicionarEventosBotoes() {
        // Evento de Remover Música
        const botoesRemover = document.querySelectorAll('.botao-remover');
        botoesRemover.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                const nome = musicas[index].nome;

                if (confirm(`Deseja remover "${nome}" da playlist?`)) {
                    musicas.splice(index, 1);
                    renderizarLista();
                }
            });
        });

        // Evento de Mais Opções
        const botoesOpcao = document.querySelectorAll('.botao-opcao');
        botoesOpcao.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                const musica = musicas[index];

                const acao = prompt(
                    `Opções para "${musica.nome}":\n1 - Renomear\n2 - Simular Reprodução\n\nDigite o número da opção:`
                );

                if (acao === '1') {
                    const novoNome = prompt("Digite o novo nome da música:", musica.nome);
                    if (novoNome && novoNome.trim() !== '') {
                        musicas[index].nome = novoNome.trim();
                        renderizarLista();
                    }
                } else if (acao === '2') {
                    alert(`▶️ Tocando agora: ${musica.nome}`);
                }
            });
        });
    }

    // Evento para Adicionar Nova Música (sem pedir URL da capa)
    btnAdicionar.addEventListener('click', () => {
        const nomeNovaMusica = prompt("Digite o nome da nova música:");

        if (nomeNovaMusica && nomeNovaMusica.trim() !== '') {
            const novaMusica = {
                id: Date.now(),
                nome: nomeNovaMusica.trim(),
                imagem: "../ImgsPlaylists/ImagemB.png" // Define a imagem padrão automaticamente
            };

            musicas.push(novaMusica);
            renderizarLista();
        }
    });

    // Inicializa a exibição da playlist
    renderizarLista();
});