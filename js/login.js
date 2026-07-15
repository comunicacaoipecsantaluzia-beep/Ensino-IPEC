// =================================
// LOGIN IPEC ENSINO
// =================================


let tipoSelecionado = "aluno";



const btnAluno = document.getElementById("btn-aluno");

const btnProfessor = document.getElementById("btn-professor");





btnAluno.addEventListener("click", ()=>{


    tipoSelecionado = "aluno";


    btnAluno.classList.add("active");

    btnProfessor.classList.remove("active");


});





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
    .value;



    const senha = document
    .getElementById("senha")
    .value;





    const mensagem = document
    .getElementById("mensagem");






    const {data,error} = await supabaseClient.auth.signInWithPassword({


        email: email,


        password: senha


    });







    if(error){


        mensagem.innerHTML =
        "Email ou senha incorretos";


        console.error(error);


        return;


    }








    const usuarioAuth = data.user;







    const {data: perfil,error: erroPerfil} = await supabaseClient

.from("usuarios")

.select("*")

.eq("auth_id", usuarioAuth.id);








    if(erroPerfil){


        mensagem.innerHTML =
        "Usuário sem permissão cadastrada";


        return;


    }









    if(perfil.nivel_acesso !== tipoSelecionado){


        mensagem.innerHTML =

        "Esse acesso não pertence ao perfil selecionado";


        await supabaseClient.auth.signOut();


        return;


    }







    window.location.href="portal.html";



});