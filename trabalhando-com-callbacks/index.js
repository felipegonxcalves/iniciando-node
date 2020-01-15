/* 
    0 - Obter um usuário
    1 - Obter o número de telefone de um usuário a partir de sey Id
    2 - Obter o endereço do usuário pelo Id
*/

function obterUsuario(callback) {
    setTimeout(function() {
        return callback(null ,{
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000);
}

function obterTelefone (idUsuario, callback) { // POR PADRÃO O CALLBACK É SEMPRE O ÚLTIMO PARÂMETRO
    setTimeout(function() {
        return callback(null, {
            telefone: '1199002',
            ddd: 11
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "Rua dos bolos",
            numero: 508
        });
    }, 2000);
}

obterUsuario(function resolverUsuario(error, usuario) {
    // No Javascript os valores (null, "", 0) vão ser igual a false
    if(error) {
        console.error("DEU RUIM em USUARIO", error);
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error) {
            console.error("DEU RUIM em TELEFONE", error);
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error) {
                console.error("DEU RUIM em ENDEREÇO", error);
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `);
        });
    });
});

// obterUsuario(resolverUsuario);


// const telefone = obterTelefone(usuario.id);


// console.log('telefone', telefone);