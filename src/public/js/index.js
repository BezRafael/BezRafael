
//Função para abrir e fechar a caixa dialogo 1
function abrir_dialog1(){
    let dialog_1 = document.getElementById('dialog_1')
    dialog_1.show()
}

function fechar_dialog1(){
    let dialog_1 = document.getElementById('dialog_1')
    dialog_1.close()
}

//Função para abrir e fechar a caixa dialogo 2
function abrir_dialog2(){
    let dialog_2 = document.getElementById('dialog_2')
    dialog_2.show()
}

function fechar_dialog2(){
    let dialog_2 = document.getElementById('dialog_2')
    dialog_2.close()
}

//Função para abrir e fechar a caixa dialogo 3
function abrir_dialog3(){
    let dialog_3 = document.getElementById('dialog_3')
    dialog_3.show()
}

function fechar_dialog3(){
    let dialog_3 = document.getElementById('dialog_3')
    dialog_3.close()
}




///leitor de texto geral por id

// Variáveis globais para controle da leitura
let estaLendo = false; // Indica se há uma leitura em curso
let parteTexto = null; // Armazena o objeto de texto sendo lido atualmente

// Função para iniciar ou pausar a leitura de texto
function lerTexto(elementId) {
    // Obtém o elemento HTML pelo ID passado como parâmetro
    const elemento = document.getElementById(elementId);

    // Obtém o texto completo que será lido em voz alta a partir do elemento
    const textoParaLer = obterTextoParaLeitura(elemento);

    // Obtém elementos de controle do botão de áudio (play/pause)
    const botaoAudio = elemento.querySelector('.botao_audio');
    const imgAudio = botaoAudio.querySelector('.img_audio'); // Ícone de play
    const imgPausa = botaoAudio.querySelector('.icon_pausa'); // Ícone de pause

    // Verifica se já há uma leitura em curso
    if (estaLendo && parteTexto) {
        speechSynthesis.cancel(); // Cancela a leitura atual
        estaLendo = false; // Marca que não há leitura em curso
        imgAudio.style.display = 'inline'; // Exibe o ícone de play
        imgPausa.style.display = 'none'; // Oculta o ícone de pause
    } else {
        // Se não há leitura em curso, cria um novo objeto de texto para leitura
        parteTexto = new SpeechSynthesisUtterance(textoParaLer);

        // Obtém as vozes disponíveis para síntese de fala
        let voices = speechSynthesis.getVoices();

        // Busca uma voz em português brasileiro (pt-BR) preferencialmente "Luciana"
        let voice = voices.find(voice => voice.lang === 'pt-BR' && voice.name.includes('Luciana'));
        
        // Se não encontrar a voz "Luciana", busca qualquer voz em português brasileiro
        if (!voice) {
            voice = voices.find(voice => voice.lang === 'pt-BR');
        }

        // Define a voz escolhida para a leitura do texto
        parteTexto.voice = voice;

        // Configura o que acontece quando a leitura é concluída
        parteTexto.onend = () => {
            estaLendo = false; // Marca que não há leitura em curso
            parteTexto = null; // Limpa o objeto de texto atual
            imgAudio.style.display = 'inline'; // Exibe o ícone de play
            imgPausa.style.display = 'none'; // Oculta o ícone de pause
        };

        // Configura o tratamento de erro durante a síntese de fala
        parteTexto.onerror = (event) => {
            console.error('Erro na síntese de fala:', event.error);
            estaLendo = false; // Marca que não há leitura em curso
            parteTexto = null; // Limpa o objeto de texto atual
            imgAudio.style.display = 'inline'; // Exibe o ícone de play
            imgPausa.style.display = 'none'; // Oculta o ícone de pause
        };

        // Inicia a síntese de fala com o texto configurado
        speechSynthesis.speak(parteTexto);
        estaLendo = true; // Marca que há uma leitura em curso
        imgAudio.style.display = 'none'; // Oculta o ícone de play
        imgPausa.style.display = 'inline'; // Exibe o ícone de pause
    }
}

// Função auxiliar para obter o texto completo de um elemento para leitura
function obterTextoParaLeitura(elemento) {
    let texto = '';

    // Lê o título do elemento (se houver) e adiciona ao texto
    const titulo = elemento.querySelector('h1');
    if (titulo) {
        texto += titulo.textContent.trim() + '. ';
    }

    // Lê todos os parágrafos do elemento e adiciona ao texto
    const paragrafos = elemento.querySelectorAll('p');
    paragrafos.forEach(paragrafo => {
        texto += paragrafo.textContent.trim() + '. ';
    });

    return texto; // Retorna o texto completo a ser lido em voz alta
}

