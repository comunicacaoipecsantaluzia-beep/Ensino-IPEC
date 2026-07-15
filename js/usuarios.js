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



        </div>


        `;



    });



}





carregarUsuarios();