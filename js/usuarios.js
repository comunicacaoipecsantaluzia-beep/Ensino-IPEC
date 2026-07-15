// ================================
// USUÁRIOS
// IPEC ENSINO
// ================================

async function carregarUsuarios(){

    const lista = document.getElementById("lista-usuarios");

    if(!lista) return;

    const { data, error } = await supabaseClient
        .from("matriculas")
        .select(`
            *,
            usuarios (
                id
            )
        `)
        .order("nome");

    if(error){

        console.error(error);

        lista.innerHTML = "Erro ao carregar usuários.";

        return;

    }

    lista.innerHTML = "";

    data.forEach(matricula => {

        const possuiAcesso = matricula.usuarios.length > 0;

        lista.innerHTML += `

        <div class="usuario-item">

            <strong>${matricula.nome}</strong>

            <p>${matricula.tipo}</p>

            <p>

                ${
                    possuiAcesso
                    ? "🟢 Possui acesso"
                    : "🔴 Sem acesso"
                }

            </p>

            ${
                possuiAcesso

                ?

                `<button class="btn-editar">
                    Editar
                </button>`

                :

                `<button
                    class="btn-primary"
                    onclick="abrirModal(
'${matricula.id}',
'${matricula.nome}',
'${matricula.email}'
)">

                    Criar acesso

                </button>`
            }

        </div>

        `;

    });

}

function abrirModal(id,nome,email){

    document.getElementById("modal-acesso").style.display="flex";

    document.getElementById("matricula-id").value=id;

    document.getElementById("usuario-nome").value=nome;

    document.getElementById("usuario-email").value=email;

    document.getElementById("usuario-senha").value="";

}

function fecharModal(){

    document.getElementById("modal-acesso").style.display="none";

}

carregarUsuarios();