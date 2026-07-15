// =====================================
// CADASTRO DE USUÁRIOS
// IPEC ENSINO
// =====================================


const formUsuario = document.getElementById("form-usuario");


formUsuario.addEventListener("submit", async (e) => {


    e.preventDefault();



    const nome = document.getElementById("nome-usuario").value;

    const email = document.getElementById("email-usuario").value;

    const telefone = document.getElementById("telefone-usuario").value;

    const tipo = document.getElementById("tipo-usuario").value;



    const { data, error } = await supabaseClient

        .from("usuarios")

        .insert([

            {

                nome: nome,

                email: email,

                telefone: telefone,

                tipo: tipo

            }

        ])

        .select();



    if(error){

        console.error(error);

        alert("Erro ao cadastrar usuário");

        return;

    }



    alert(
        "Usuário cadastrado!\nMatrícula: " +
        data[0].numero_matricula
    );



    formUsuario.reset();



    carregarUsuarios();


});




// =====================================
// LISTAR USUÁRIOS
// =====================================


async function carregarUsuarios(){


    const lista = document.getElementById("lista-usuarios");


    const { data, error } = await supabaseClient

        .from("usuarios")

        .select("*")

        .order("data_cadastro", {ascending:false});



    if(error){

        console.error(error);

        return;

    }



    if(data.length === 0){

        lista.innerHTML =
        "Nenhum usuário cadastrado";

        return;

    }



    lista.innerHTML = "";



    data.forEach(usuario => {


        lista.innerHTML += `

        <div class="usuario-item">

            <strong>
                ${usuario.nome}
            </strong>

            <p>
                Matrícula:
                ${usuario.numero_matricula}
            </p>

            <p>
                Tipo:
                ${usuario.tipo}
            </p>

        </div>

        `;


    });


}



carregarUsuarios();