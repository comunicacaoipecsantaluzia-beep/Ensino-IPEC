const btnMatriculas =
document.getElementById("btn-matriculas");

const btnUsuarios =
document.getElementById("btn-usuarios");

const matriculas =
document.getElementById("matriculas-section");

const usuarios =
document.getElementById("usuarios-section");



btnMatriculas.onclick = ()=>{

    matriculas.style.display="block";

    usuarios.style.display="none";

    btnMatriculas.classList.add("active");

    btnUsuarios.classList.remove("active");

};



btnUsuarios.onclick = ()=>{

    matriculas.style.display="none";

    usuarios.style.display="block";

    btnUsuarios.classList.add("active");

    btnMatriculas.classList.remove("active");

};