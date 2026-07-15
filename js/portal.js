// =====================================
// PORTAL IPEC ENSINO
// =====================================


const nivel = localStorage.getItem("nivel_acesso");

const usuario = localStorage.getItem("usuario_id");



console.log("Nível:", nivel);

console.log("Usuário:", usuario);





if(!nivel){

    window.location.href = "index.html";

}




const alunoArea =
document.getElementById("aluno-area");


const professorArea =
document.getElementById("professor-area");





if(nivel === "aluno"){


    alunoArea.style.display="block";


}




if(nivel === "professor"){


    professorArea.style.display="block";


}






document
.getElementById("sair")
.addEventListener("click", async()=>{


    await supabaseClient.auth.signOut();


    localStorage.clear();


    window.location.href="index.html";


});