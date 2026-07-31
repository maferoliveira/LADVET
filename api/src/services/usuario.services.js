const validaCadastroVeterinario = (dados) => {
    if(!dados.crmv) {
        throw new Error("informar crmv");
    }
}

module.exports = {
    validaCadastroVeterinario
}