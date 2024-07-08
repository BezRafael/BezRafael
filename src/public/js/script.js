///leitor dos textos do popups

let estaLendo1 = false;
let estaLendo2 = false;
let estaLendo3 = false;

let parteTexto1 = null;
let parteTexto2 = null;
let parteTexto3 = null;

function iniciarLeitura(dialogId, textoIndex) {
    const textoDialogo = document.getElementById(dialogId).querySelector('.paragrafo_dialog').textContent.trim();
    const botaoAudio = document.getElementById(`botao_audioDialog${textoIndex}`);
    const imgAudio = botaoAudio.querySelector('.img_audioDialog');
    const imgPausa = botaoAudio.querySelector('.icon_pausa');
    let estaLendo = false;
    let parteTexto = null;

    if (textoIndex === 1) {
        estaLendo = estaLendo1;
        parteTexto = parteTexto1;
    } else if (textoIndex === 2) {
        estaLendo = estaLendo2;
        parteTexto = parteTexto2;
    } else if (textoIndex === 3) {
        estaLendo = estaLendo3;
        parteTexto = parteTexto3;
    }

    if (estaLendo) {
        speechSynthesis.pause();
        estaLendo = false;
        imgAudio.style.display = 'inline';
        imgPausa.style.display = 'none';
    } else {
        if (parteTexto !== null) {
            speechSynthesis.resume();
            estaLendo = true;
            imgAudio.style.display = 'none';
            imgPausa.style.display = 'inline';
        } else {
            parteTexto = new SpeechSynthesisUtterance(textoDialogo);
            let voices = speechSynthesis.getVoices();
            let voice = voices.find(voice => voice.lang === 'pt-BR' && voice.name.includes('Luciana'));
            if (!voice) {
                voice = voices.find(voice => voice.lang === 'pt-BR');
            }
            parteTexto.voice = voice;
            parteTexto.onend = () => {
                estaLendo = false;
                parteTexto = null;
                imgAudio.style.display = 'inline';
                imgPausa.style.display = 'none';
            };
            parteTexto.onerror = (event) => {
                console.error('Erro na síntese de fala:', event.error);
                estaLendo = false;
                parteTexto = null;
                imgAudio.style.display = 'inline';
                imgPausa.style.display = 'none';
            };
            speechSynthesis.speak(parteTexto);
            estaLendo = true;
            imgAudio.style.display = 'none';
            imgPausa.style.display = 'inline';
        }
    }

    // Atualiza os estados
    if (textoIndex === 1) {
        estaLendo1 = estaLendo;
        parteTexto1 = parteTexto;
    } else if (textoIndex === 2) {
        estaLendo2 = estaLendo;
        parteTexto2 = parteTexto;
    } else if (textoIndex === 3) {
        estaLendo3 = estaLendo;
        parteTexto3 = parteTexto;
    }
}

function fechar_dialog(dialogId, textoIndex) {
    let dialog = document.getElementById(dialogId);
    dialog.close();
    speechSynthesis.cancel();

    if (textoIndex === 1) {
        estaLendo1 = false;
        parteTexto1 = null;
        document.getElementById(`botao_audioDialog${textoIndex}`).querySelector('.img_audioDialog').style.display = 'inline';
        document.getElementById(`botao_audioDialog${textoIndex}`).querySelector('.icon_pausa').style.display = 'none';
    } else if (textoIndex === 2) {
        estaLendo2 = false;
        parteTexto2 = null;
        document.getElementById(`botao_audioDialog${textoIndex}`).querySelector('.img_audioDialog').style.display = 'inline';
        document.getElementById(`botao_audioDialog${textoIndex}`).querySelector('.icon_pausa').style.display = 'none';
    } else if (textoIndex === 3) {
        estaLendo3 = false;
        parteTexto3 = null;
        document.getElementById(`botao_audioDialog${textoIndex}`).querySelector('.img_audioDialog').style.display = 'inline';
        document.getElementById(`botao_audioDialog${textoIndex}`).querySelector('.icon_pausa').style.display = 'none';
    }
}

function abrir_dialog(dialogId) {
    document.getElementById(dialogId).showModal();
}

// Event listeners para os botões de áudio
document.getElementById('botao_audioDialog1').addEventListener('click', () => iniciarLeitura('dialog_1', 1));
document.getElementById('botao_audioDialog2').addEventListener('click', () => iniciarLeitura('dialog_2', 2));
document.getElementById('botao_audioDialog3').addEventListener('click', () => iniciarLeitura('dialog_3', 3));

// Event listeners para os botões de fechar
document.getElementById('dialog_1').querySelector('.botao_fecharDialog').addEventListener('click', () => fechar_dialog('dialog_1', 1));
document.getElementById('dialog_2').querySelector('.botao_fecharDialog').addEventListener('click', () => fechar_dialog('dialog_2', 2));
document.getElementById('dialog_3').querySelector('.botao_fecharDialog').addEventListener('click', () => fechar_dialog('dialog_3', 3));

// Event listeners para os botões de abrir
document.getElementById('dialog_1').previousElementSibling.addEventListener('click', () => abrir_dialog('dialog_1'));
document.getElementById('dialog_2').previousElementSibling.addEventListener('click', () => abrir_dialog('dialog_2'));
document.getElementById('dialog_3').previousElementSibling.addEventListener('click', () => abrir_dialog('dialog_3'));











// document.addEventListener('DOMContentLoaded', function() {
//     const botoesAudio = document.querySelectorAll('.botao_audio');

//     botoesAudio.forEach(botao => {
//         botao.addEventListener('click', function() {
//             const textoContainer = this.parentNode.querySelector('.texto');
//             const imgAudio = this.querySelector('.img_audio');
//             const imgPausa = this.querySelector('.icon_pausa');
//             let estaLendo = false;
//             let parteTexto = null;

//             if (textoContainer) {
//                 if (!estaLendo) {
//                     parteTexto = new SpeechSynthesisUtterance(textoContainer.textContent.trim());
//                     let voices = speechSynthesis.getVoices();
//                     let voice = voices.find(voice => voice.lang === 'pt-BR' && voice.name.includes('Luciana'));
//                     if (!voice) {
//                         voice = voices.find(voice => voice.lang === 'pt-BR');
//                     }
//                     parteTexto.voice = voice;
//                     parteTexto.onstart = () => {
//                         estaLendo = true;
//                         imgAudio.style.display = 'none';
//                         imgPausa.style.display = 'inline';
//                     };
//                     parteTexto.onend = () => {
//                         estaLendo = false;
//                         parteTexto = null;
//                         imgAudio.style.display = 'inline';
//                         imgPausa.style.display = 'none';
//                     };
//                     parteTexto.onerror = (event) => {
//                         console.error('Erro na síntese de fala:', event.error);
//                         estaLendo = false;
//                         parteTexto = null;
//                         imgAudio.style.display = 'inline';
//                         imgPausa.style.display = 'none';
//                     };
//                     speechSynthesis.speak(parteTexto);
//                 } else {
//                     speechSynthesis.pause();
//                     estaLendo = false;
//                     imgAudio.style.display = 'inline';
//                     imgPausa.style.display = 'none';
//                 }
//             }
//         });
//     });
// });





