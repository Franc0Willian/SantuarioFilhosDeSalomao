// --- Menu ---

const btn = document.getElementById('menubtn');
const menu = document.getElementById('menu-content');

btn.addEventListener('click', function() {
  menu.classList.toggle('show'); 
});

const btn2 = document.getElementsByClassName('linkNone');
for (let i = 0; i < btn2.length; i++) {
  btn2[i].addEventListener('click', function() {
    menu.classList.remove('show');
  });
}

// --- Janelas de imagens ---
const imagens = document.querySelectorAll('#book a'); 
const janelas = document.querySelectorAll('[id^="janela"]');

imagens.forEach((img, index) => {
  img.addEventListener('click', function (event) {
    event.preventDefault();
    fecharTodasJanelas();
    const janela = document.getElementById(`janela${index + 1}-tela`);
    if (janela) janela.style.display = 'flex';
  });
});


function fecharTodasJanelas() {
  const telas = document.querySelectorAll('.tela');
  telas.forEach(tela => tela.style.display = 'none');
}
const buttFechar = document.getElementsByClassName('fecharjanela');
for (let i = 0; i < buttFechar.length; i++) {
  buttFechar[i].addEventListener('click', function() {
    fecharTodasJanelas();
  });
}

/*
const frm = document.querySelector('form');
const botaoEnviar = document.getElementById('enviar');

botaoEnviar.addEventListener("click", () => {
    const campos = frm.querySelectorAll("input[type='text'], input[type='email'], input[type='tel']");

    let valido = true;
    let dados = {};

    campos.forEach(campo => {
        if (campo.value.trim() === "") {
            valido = false;
            campo.style.border = "2px solid red";
        } else {
            campo.style.border = "";
            dados[campo.previousElementSibling.textContent.replace(":", "").trim()] = campo.value.trim();
        }
    });

    if (!valido) {
        alert("Por favor, preencha todos os campos antes de enviar.");
        return;
    }

    localStorage.setItem("contato", JSON.stringify(dados));

    alert("Mensagem enviada com sucesso!");
    frm.reset();
});
*/

const frm = document.querySelector('form');
const botaoEnviar = document.getElementById('enviar');
const telefone = frm.querySelector("input[type='tel']");

telefone.addEventListener('input', (e) => {
  let valor = e.target.value.replace(/\D/g, '');

  if (valor.length > 11) valor = valor.slice(0, 11);

  if (valor.length > 10) {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (valor.length > 6) {
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  } else {
    valor = valor.replace(/^(\d*)$/, '($1');
  }

  e.target.value = valor;
});


botaoEnviar.addEventListener("click", (event) => {
  event.preventDefault();

  const nome = frm.querySelector("input[type='text']:nth-of-type(1)");
  const email = frm.querySelector("input[type='email']");
  const mensagem = frm.querySelector("textarea, input[type='text']:nth-of-type(2)");

  let valido = true;

  if (nome.value.trim().length < 3) {
    marcarErro(nome);
    valido = false;
  } else {
    limparErro(nome);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    marcarErro(email);
    valido = false;
  } else {
    limparErro(email);
  }

  const telRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
  if (!telRegex.test(telefone.value.trim())) {
    marcarErro(telefone);
    valido = false;
  } else {
    limparErro(telefone);
  }

  if (mensagem.value.trim().length < 5) {
    marcarErro(mensagem);
    valido = false;
  } else {
    limparErro(mensagem);
  }

  if (!valido) {
    alert("Por favor, verifique os campos destacados antes de enviar.");
    return;
  }

  
  const destinatario = "francisco.henrique@aluno.ifsp.edu.br"; 
  const assunto = encodeURIComponent(`Contato via site de ${nome.value}`);
  const corpo = encodeURIComponent(
    `Entre em Contato por:\n\nEmail: ${email.value}\nTelefone: ${telefone.value}\n\nMensagem:\n\n${mensagem.value}`
  );

  window.location.href = `mailto:${destinatario}?subject=${assunto}&body=${corpo}`;

  alert("Aguarde... Abrindo seu aplicativo de e-mail para enviar a mensagem...");
  frm.reset();
});


function marcarErro(campo) {
  campo.style.border = "2px solid red";
}
function limparErro(campo) {
  campo.style.border = "";
}
