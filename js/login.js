// =================================
// LOGIN IPEC ENSINO
// =================================


let tipoSelecionado = "aluno";



const btnAluno = document.getElementById("btn-aluno");
const btnProfessor = document.getElementById("btn-professor");




// Selecionar aluno

btnAluno.addEventListener("click", ()=>{

    tipoSelecionado = "aluno";

    btnAluno.classList.add("active");

    btnProfessor.classList.remove("active");

});




// Selecionar professor

btnProfessor.addEventListener("click", ()=>{

    tipoSelecionado = "professor";

    btnProfessor.classList.add("active");

    btnAluno.classList.remove("active");

});






const formLogin = document.getElementById("login-form");



formLogin.addEventListener("submit", async(e)=>{


    e.preventDefault();



    const email = document
    .getElementById("email")
    .value
    .trim();



    const senha = document
    .getElementById("senha")
    .value;



    const mensagem = document
    .getElementById("mensagem");



    mensagem.innerHTML = "Entrando...";





    // LOGIN AUTH

    const {data,error} = await supabaseClient.auth.signInWithPassword({

        email: email,

        password: senha

    });





    if(error){

        console.error(error);

        mensagem.innerHTML =
        "Email ou senha incorretos";

        return;

    }






    const usuarioAuth = data.user;




    console.log(
        "USUÁRIO AUTH:",
        usuarioAuth.id
    );






    // BUSCAR PERFIL

    const {data: perfil,error: erroPerfil} = await supabaseClient

    .from("usuarios")

    .select("*")

    .eq("auth_id", usuarioAuth.id)

    .single();







    console.log(
        "PERFIL:",
        perfil
    );






    if(erroPerfil || !perfil){


        console.error(
            erroPerfil
        );


        mensagem.innerHTML =
        "Usuário sem permissão cadastrada";


        return;

    }







    // COMPARAÇÃO DE PERMISSÃO

    const nivelBanco =
    perfil.nivel_acesso
    .toLowerCase()
    .trim();



    const nivelEscolhido =
    tipoSelecionado
    .toLowerCase()
    .trim();





    console.log(
        "NÍVEL BANCO:",
        nivelBanco
    );


    console.log(
        "NÍVEL ESCOLHIDO:",
        nivelEscolhido
    );






    if(nivelBanco !== nivelEscolhido){


        mensagem.innerHTML =
        "Esse acesso não pertence ao perfil selecionado";


        await supabaseClient.auth.signOut();


        return;

    }







    // LOGIN OK

    localStorage.setItem(
        "nivel_acesso",
        nivelBanco
    );


    localStorage.setItem(
        "usuario_id",
        usuarioAuth.id
    );





    window.location.href =
    "portal.html";



});