// ===============================
// MATRÍCULAS
// IPEC ENSINO
// ===============================


const formMatricula = document.getElementById("form-matricula");



if(formMatricula){


    formMatricula.addEventListener("submit", async (e)=>{


        e.preventDefault();

const { count } = await supabaseClient
.from("matriculas")
.select("*", { count: "exact", head: true });


const numeroMatricula = 
"2026" + String(count + 1).padStart(4, "0");


       const matricula = {

    numero_matricula: numeroMatricula,

    nome: document.getElementById("nome-matricula").value,

    email: document.getElementById("email-matricula").value,

    telefone: document.getElementById("telefone-matricula").value,

    tipo: document.getElementById("tipo-matricula").value,

    status: document.getElementById("status-matricula").value

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
        "lista-matriculas"
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

    <tr>

        <td>${matricula.numero_matricula}</td>

        <td>${matricula.nome}</td>

        <td>${matricula.tipo}</td>

        <td>${matricula.status}</td>

        <td>

            <button onclick="editarMatricula('${matricula.id}')">
                ✏️
            </button>

            <button onclick="excluirMatricula('${matricula.id}')">
                🗑️
            </button>

        </td>

    </tr>

    `;

});


}

async function excluirMatricula(id){


    if(!confirm("Deseja excluir esta matrícula?")) return;



    const { data, error } = await supabaseClient

    .from("matriculas")

    .delete()

    .eq("id", id)

    .select();



    if(error){

        console.error("Erro ao excluir:", error);

        alert("Erro ao excluir matrícula");

        return;

    }



    console.log("Excluído:", data);


    alert("Matrícula excluída com sucesso!");


    carregarMatriculas();


}
    if(!confirm("Deseja excluir esta matrícula?")) return;

    const { error } = await supabaseClient
    .from("matriculas")
    .delete()
    .eq("id", id);

    if(error){
        alert("Erro ao excluir.");
        return;
    }

    carregarMatriculas();

}

async function editarMatricula(id){

    const nome = prompt("Novo nome:");

    if(nome == null) return;

    const { error } = await supabaseClient
    .from("matriculas")
    .update({
        nome: nome
    })
    .eq("id", id);

    if(error){
        alert("Erro ao editar.");
        return;
    }

    carregarMatriculas();

}

const pesquisa = document.getElementById("pesquisa");

if(pesquisa){

    pesquisa.addEventListener("keyup", pesquisarMatriculas);

}

async function pesquisarMatriculas(){

    const texto = pesquisa.value.trim();

    const { data, error } = await supabaseClient
        .from("matriculas")
        .select("*")
        .or(`nome.ilike.%${texto}%,numero_matricula.ilike.%${texto}%`)
        .order("numero_matricula");

    if(error) return;

    renderizarMatriculas(data);

}





// Carrega ao abrir a página

formMatricula.reset();

carregarMatriculas();

if(typeof carregarUsuarios === "function"){

    carregarUsuarios();

}