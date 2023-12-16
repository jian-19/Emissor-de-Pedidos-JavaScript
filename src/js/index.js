const btn = document.querySelector("#enviar");

btn.addEventListener("click", () => {
  enviar();
});

let dateTime = document.querySelector("#dateTime");
let printDate;

function updateTime() {
  let date = new Date();
  dateTime.innerHTML = date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  printDate = date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

setInterval(updateTime, 1000);

let xlBlackCheckbox = document.querySelector("#xl_black");

xlBlackCheckbox.addEventListener("change", () => {
  if (xlBlackCheckbox.checked) {
    qtdXlBlack.style.display = "block";
    labelXlBlack.style.display ="block";
  } else {
    qtdXlBlack.style.display = "none";
    labelXlBlack.style.display ="none";
  }
});

let xlColorCheckbox = document.querySelector("#xl_color");

xlColorCheckbox.addEventListener("change", () => {
  if (xlColorCheckbox.checked) {
    qtdXlColor.style.display = "block";
    labelXlColor.style.display ="block";
  } else {
    qtdXlColor.style.display = "none";
    labelXlColor.style.display ="none"
  }
});

function enviar() {

  

  let name = document.querySelector("#nome").value;
  let endereco = document.querySelector("#endereco").value;
  let telefone = document.querySelector("#fone").value;

  let qtdBlack = document.querySelector("#preto").value;
  let qtdColor = document.querySelector("#color").value;

  let qtdXlBlack = document.querySelector("#qtdXlBlack").value;
  let qtdNormalBlack = qtdBlack - qtdXlBlack;
  let qtdXlColor = document.querySelector("#qtdXlColor").value;
  let qtdNormalColor = qtdColor - qtdXlColor;
  let textArea = document.querySelector('#area').value;

  const valorPreto = parseInt("20");
  const valorColor = parseInt("23");

  let custoTotal = qtdBlack * valorPreto + qtdColor * valorColor;

  if (qtdXlBlack == "") {
    qtdXlBlack = 0;
  }

  if (qtdXlColor == "") {
    qtdXlColor = 0;
  }

  function gerarCodigoRandomico() {

    return Math.floor(10000 + Math.random() * 90000);
  }

  function gerarPedido(nomeCliente) {

    const codigoRandomico = gerarCodigoRandomico();


    const nomeComCodigo = `${nomeCliente}_${codigoRandomico}`;


    return {
      nomeCliente: nomeCliente,
      codigoRandomico: codigoRandomico,
      pedidoCompleto: nomeComCodigo,
    };
  }

  const pedido = gerarPedido(name);
  const nomeArquivoPDF = `${name}_${pedido.codigoRandomico}.pdf`;

  console.log("Data: ", printDate);
  console.log("Nome: ", name);
  console.log("Endereço: ", endereco);
  console.log("Telefone: ", telefone);
  console.log("Quantidade XL Preto(s): ", qtdXlBlack);
  console.log("Quantidade Normal Preto(s): ", qtdNormalBlack);
  console.log("Quantidade XL Colorido(s): ", qtdXlColor);
  console.log("Quantidade Normal Colorido(s): ", qtdNormalColor);
  console.log("Custo Total: ", custoTotal);

  const pdfContent = document.createElement("div");
  pdfContent.style.fontSize = "10px";

  pdfContent.innerHTML = `
                <p style="font-size: 10px;">Data: ${printDate}</p>
                <p style="font-size: 10px;">Pedido: ${pedido.pedidoCompleto}</p>
                <hr>
                <p style="font-size: 10px;">Nome: ${name}</p>
                <p style="font-size: 10px;">Endereço: ${endereco}</p>
                <p style="font-size: 10px;">Telefone: ${telefone}</p>
                <hr>
                <p style="font-size: 10px;">Quantidade XL Preto(s): ${qtdXlBlack}</p>
                <p style="font-size: 10px;">Quantidade Normal Preto(s): ${qtdNormalBlack}</p>
                <p style="font-size: 10px;">Quantidade XL Colorido(s): ${qtdXlColor}</p>
                <p style="font-size: 10px;">Quantidade Normal Colorido(s): ${qtdNormalColor}</p>
                <p style="font-size: 10px;">Observação: ${textArea}</p>
                <p style="font-size: 10px;">Custo Total: ${custoTotal}</p>
                <hr>
                <br>
                <p style="font-size: 10px;",>Assinatura: __________________________</p>
            `;

  document.body.appendChild(pdfContent);


  const options = {
    margin: 10,
    filename: nomeArquivoPDF,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: "mm",
      format: [74, 105],
      orientation: "portrait",

      width: 100,
    },
  };

html2pdf(pdfContent, options)
  .then((pdf) => {

    pdf.save(options.filename);
  })
  .catch((error) => console.error("Erro ao gerar o PDF:", error))
  .finally(() => {

    if (document.body.contains(pdfContent)) {
      document.body.removeChild(pdfContent);
    }
  });

    document.querySelector("#nome").value = "";
    document.querySelector("#endereco").value = "";
    document.querySelector("#fone").value = "";
    document.querySelector("#preto").value = "";
    document.querySelector("#color").value = "";
    document.querySelector("#qtdXlBlack").value = "";
    document.querySelector("#qtdXlColor").value = "";
    document.querySelector('#area').value = "";

    xlBlackCheckbox.checked = false;
    xlColorCheckbox.checked = false;

}
