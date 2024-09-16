const fSoma = (num1Par, num2Par) => num1Par + num2Par; 

const fSubtracao = (num1Par, num2Par) => num1Par - num2Par;

const fMultiplicacao = (num1Par, num2Par) => num1Par * num2Par;

const fDivisao = (num1Par, num2Par) => num2Par !== 0 ? num1Par / num2Par : "Divisão por zero não é permitida";

const fCalculo = (request, res) => {
    const { num1Par, num2Par, operacao } = request.body;

    let resultado;

    if(operacao == '+'){
        resultado = fSoma(num1Par, num2Par);
        res.json({ status: "ok", "Resultado": resultado });
    }
    else if(operacao == '-'){
        resultado = fSubtracao(num1Par, num2Par);
        res.json({ status: "ok", "Resultado": resultado });
    }
    else if(operacao == '*'){
        resultado = fMultiplicacao(num1Par, num2Par);
        res.json({ status: "ok", "Resultado": resultado });
    }
    else if(operacao == '/'){
        resultado = fDivisao(num1Par, num2Par);
        res.json({ status: "ok", "Resultado": resultado });
    }
    else{
        res.json({ status: "error", "Mensagem:": "Operação não é válida!" });
    }
};

module.exports = {
    fCalculo
}