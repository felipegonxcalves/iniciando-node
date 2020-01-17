/* 
    0 - Obter um usuário
    1 - Obter o número de telefone de um usuário a partir de sey Id
    2 - Obter o endereço do usuário pelo Id
*/

// importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    // quando der algum problema -> reject(ERRO)
    // qyabdi success -> resolv
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000);
    });    
}

function obterTelefone (idUsuario) { // POR PADRÃO O CALLBACK É SEMPRE O ÚLTIMO PARÂMETRO
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            return resolve({
                telefone: '1199002',
                ddd: 11
            })
        }, 2000);
    });
    
}

function obterEndereco(idUsuario, callback) {
    return new Promise(function resolveEndereco(resolve, reject) {
        setTimeout(() => {
            return resolve({
                rua: "Rua dos bolos",
                numero: 508
            })
        }, 2000);
    });    
}

main();

// 1º Passo: Adicionar a palavra async -> automaticamente ela retornará uma Promise
async function main() {
    try {
        console.time('medida-promise');
        const usuario = await obterUsuario();

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ]);

        const endereco = resultado[1];
        const telefone = resultado[0];

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereço: ${endereco.rua} - ${endereco.numero}
        `);
        console.timeEnd('medida-promise');
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

// const usuarioPromise = obterUsuario();
// // para manipular o sucesso usamos a função .then
// // para manipular erros, usamos o .catch
// usuarioPromise
//     .then(function (usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result) {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id);
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         });
//     })
//     .then(function (resultado) { 
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         `);
//     })
//     .catch(function (error) {
//         console.error('DEU RUIM', error);
//     });


// obterUsuario(function resolverUsuario(error, usuario) {
//     // No Javascript os valores (null, "", 0) vão ser igual a false
//     if(error) {
//         console.error("DEU RUIM em USUARIO", error);
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error) {
//             console.error("DEU RUIM em TELEFONE", error);
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error) {
//                 console.error("DEU RUIM em ENDEREÇO", error);
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereco: ${endereco.rua}, ${endereco.numero}
//                 Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `);
//         });
//     });
// });