const btn = document.querySelector('#enviar');

btn.addEventListener('click', enviar);


let xlBlackCheckbox = document.querySelector('#xl_black');

xlBlackCheckbox.addEventListener('change', () => {
    if (xlBlackCheckbox.checked) {
        qtdXlBlack.style.display = 'block';
    } else {
        qtdXlBlack.style.display = 'none';
    }
});

let xlColorCheckbox = document.querySelector('#xl_color');

xlColorCheckbox.addEventListener('change', () => {
    if (xlColorCheckbox.checked) {
        qtdXlColor.style.display = 'block';
    } else {
        qtdXlColor.style.display = 'none';
    }
});

function enviar() {
    let name = document.querySelector('#nome').value;
    let endereco = document.querySelector('#endereco').value;
    let telefone = document.querySelector('#fone').value;

    let qtdBlack = document.querySelector('#preto').value;
    let qtdColor = document.querySelector('#color').value;

    let qtdXlBlack = document.querySelector('#qtdXlBlack').value;
    let qtdNormalBlack = qtdBlack - qtdXlBlack;
    let qtdXlColor = document.querySelector('#qtdXlColor').value;
    let qtdNormalColor = qtdColor - qtdXlColor;

    const valorPreto = parseInt('20')
    const valorColor = parseInt('23')

    let custoTotal = qtdBlack * valorPreto + 
    qtdColor * valorColor;

    if (qtdXlBlack == "") {
        qtdXlBlack = 0;
    }
    
    if (qtdXlColor == "") {
        qtdXlColor = 0;
    }

    console.log('Nome: ', name);
    console.log('Endereço: ', endereco);
    console.log('Telefone: ', telefone);
    console.log('Quantidade XL Preto(s): ', qtdXlBlack);
    console.log('Quantidade Normal Preto(s): ', qtdNormalBlack);
    console.log('Quantidade XL Colorido(s): ', qtdXlColor);
    console.log('Quantidade Normal Colorido(s): ', qtdNormalColor);
    console.log('Custo Total: ', custoTotal);

    alert('Nome: ' + name +
    '\nEndereço: ' + endereco +
    '\nTelefone: ' + telefone +
    '\nQuantidade XL Preto(s):' + qtdXlBlack +
    '\nQuantidade Normal Preto(s): ' + qtdNormalBlack +
    '\nQuantidade XL Colorido(s): ' + qtdXlColor +
    '\nQuantidade Normal Colorido(s): ' + qtdNormalColor +
    '\nCusto Total: ' + custoTotal);
}

