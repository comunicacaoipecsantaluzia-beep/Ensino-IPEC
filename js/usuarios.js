alert("usuarios.js carregou");

// =====================================
// USUÁRIOS - IPEC ENSINO
// =====================================


// VERIFICA CONEXÃO

console.log("usuarios.js carregado");


if(typeof supabaseClient === "undefined"){

    console.error("Supabase não conectado!");

}



// FORMULÁRIO

const formUsuario = document.getElementById("form-usuario");



if(formUsuario){


formUsuario.addEventListener("submit", async (e) => {


    e.preventDefault();



    const nome = document
    .getElementById("nome-usuario")
    .value;



    const email = document
    .getElementById("email-usuario")
    .value;



    const telefone = document
    .getElementById("telefone-usuario")
    .value;



    const tipo = document
    .getElementById("tipo-usuario")
    .value;




    console.log("Enviando usuário:", {

        nome,
        email,
        telefone,
        tipo

    });





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


        console.error(
            "Erro Supabase:",
            error
        );


        alert(
            "Erro ao cadastrar:\n\n" +
            error.message
        );


        return;


    }





    alert(

        "Usuário cadastrado com sucesso!\n\n" +

        "Matrícula: " +

        data[0].numero_matricula

    );





    formUsuario.reset();



    carregarUsuarios();



});



}




// =====================================
// LISTAR USUÁRIOS
// =====================================


async function carregarUsuarios(){


    const lista = document.getElementById(
        "lista-usuarios"
    );



    if(!lista){

        return;

    }





    const { data, error } = await supabaseClient


        .from("usuarios")


        .select("*")


        .order(
            "data_cadastro",
            {
                ascending:false
            }
        );





    if(error){


        console.error(
            "Erro ao carregar usuários:",
            error
        );


        return;


    }






    if(!data || data.length === 0){


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


    <div class="acoes">


        <button 
        class="btn-editar"
        onclick="editarUsuario('${usuario.id}')">

            Editar

        </button>



        <button 
        class="btn-excluir"
        onclick="excluirUsuario('${usuario.id}')">

            Excluir

        </button>


    </div>


</div>

`;


        `;



    });



}


// =====================================
// EDITAR USUÁRIO
// =====================================


async function editarUsuario(id){


    const novoNome = prompt(
        "Digite o novo nome:"
    );


    if(!novoNome){

        return;

    }



    const {error} = await supabaseClient

        .from("usuarios")

        .update({

            nome: novoNome

        })

        .eq("id", id);



    if(error){

        alert(
            "Erro ao editar usuário"
        );

        console.error(error);

        return;

    }



    alert(
        "Usuário atualizado!"
    );


    carregarUsuarios();


}





// =====================================
// EXCLUIR USUÁRIO
// =====================================


async function excluirUsuario(id){


    const confirmar = confirm(
        "Deseja realmente excluir este usuário?"
    );


    if(!confirmar){

        return;

    }



    const {error} = await supabaseClient

        .from("usuarios")

        .delete()

        .eq("id", id);




    if(error){

        alert(
            "Erro ao excluir usuário"
        );

        console.error(error);

        return;

    }



    alert(
        "Usuário excluído!"
    );


    carregarUsuarios();


}


carregarUsuarios();