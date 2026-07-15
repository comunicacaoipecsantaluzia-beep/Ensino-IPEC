console.log("usuarios.js carregado");


// ===============================
// CADASTRAR USUÁRIO
// ===============================


const formUsuario = document.getElementById("form-usuario");


if(formUsuario){


    formUsuario.addEventListener("submit", async (e)=>{


        e.preventDefault();



        const usuario = {

            nome: document.getElementById("nome-usuario").value,

            email: document.getElementById("email-usuario").value,

            telefone: document.getElementById("telefone-usuario").value,

            tipo: document.getElementById("tipo-usuario").value

        };



        const {data,error} = await supabaseClient

            .from("usuarios")

            .insert([usuario])

            .select();



        if(error){

            console.error(error);

            alert("Erro ao cadastrar usuário");

            return;

        }



        alert(
            "Usuário cadastrado!\nMatrícula: "
            + data[0].numero_matricula
        );


        formUsuario.reset();


        carregarUsuarios();


    });


}



// ===============================
// LISTAR USUÁRIOS
// ===============================


async function carregarUsuarios(){



    const lista = document.getElementById("lista-usuarios");


    if(!lista){

        return;

    }




    const {data,error} = await supabaseClient

        .from("usuarios")

        .select("*")

        .order("data_cadastro",{ascending:false});




    if(error){

        console.error(error);

        return;

    }




    lista.innerHTML = "";




    data.forEach(usuario=>{


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