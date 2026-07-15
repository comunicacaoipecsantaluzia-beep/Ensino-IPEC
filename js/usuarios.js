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
                    onclick="criarAcesso('${matricula.id}')">

                    Criar acesso

                </button>`
            }

        </div>

        `;

    });

}

carregarUsuarios();