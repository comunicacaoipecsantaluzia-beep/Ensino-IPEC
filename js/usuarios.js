// ===============================
// MATRÍCULAS
// IPEC ENSINO
// ===============================



const formMatricula = document.getElementById("form-usuario");



if(formMatricula){


    formMatricula.addEventListener("submit", async (e)=>{


        e.preventDefault();



        const matricula = {


            nome: document
            .getElementById("nome-usuario")
            .value,


            email: document
            .getElementById("email-usuario")
            .value,


            telefone: document
            .getElementById("telefone-usuario")
            .value,


            tipo: document
            .getElementById("tipo-usuario")
            .value


        };





        const {data,error} = await supabaseClient


            .from("matriculas")


            .insert([matricula])


            .select();






        if(error){


            console.error(
                "Erro ao criar matrícula:",
                error
            );


            alert(
                "Erro ao criar matrícula"
            );


            return;


        }






        alert(

            "Matrícula criada com sucesso!\n\nNúmero: "

            + data[0].numero_matricula

        );





        formMatricula.reset();



        carregarMatriculas();



    });



}






// ===============================
// LISTAR MATRÍCULAS
// ===============================



async function carregarMatriculas(){



    const lista = document.getElementById(
        "lista-usuarios"
    );



    if(!lista){

        return;

    }






    const {data,error} = await supabaseClient



        .from("matriculas")



        .select("*")



        .order(
            "data_cadastro",
            {
                ascending:false
            }
        );








    if(error){


        console.error(
            "Erro ao buscar matrículas:",
            error
        );


        return;


    }






    if(data.length === 0){


        lista.innerHTML =
        "Nenhuma matrícula cadastrada";


        return;


    }







    lista.innerHTML = "";







    data.forEach(matricula => {



        lista.innerHTML += `



        <div class="usuario-item">



            <strong>

                ${matricula.nome}

            </strong>




            <p>

                Matrícula:
                ${matricula.numero_matricula}

            </p>





            <p>

                Tipo:
                ${matricula.tipo}

            </p>




            <p>

                Status:
                ${matricula.status}

            </p>



        </div>



        `;



    });




}






// Carrega ao abrir a página

carregarMatriculas();