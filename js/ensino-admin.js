document.addEventListener("DOMContentLoaded", () => {

    const menuButtons = document.querySelectorAll(".menu button");

    const content = document.querySelector(".content");


    const pages = {

        "Dashboard": `
            <header class="top">
                <div>
                    <p>Painel administrativo</p>
                    <h1>Ensino IPEC</h1>
                </div>

                <div class="profile">
                    Administrador Geral
                </div>
            </header>


            <section class="cards">

                <article class="card">
                    <span>Alunos</span>
                    <strong>120</strong>
                </article>

                <article class="card">
                    <span>Professores</span>
                    <strong>15</strong>
                </article>

                <article class="card">
                    <span>Cursos Ativos</span>
                    <strong>8</strong>
                </article>

                <article class="card">
                    <span>Matrículas</span>
                    <strong>240</strong>
                </article>

            </section>
        `,


        "Usuários": `

            <header class="top">
                <div>
                    <p>Gerenciamento</p>
                    <h1>Usuários</h1>
                </div>

                <button class="primary">
                    + Novo usuário
                </button>

            </header>


            <section class="panel">

                <h2>
                    Controle de usuários
                </h2>


                <div class="empty">

                    Nenhum usuário cadastrado

                </div>

            </section>

        `,


        "Cursos": `

            <header class="top">
                <div>
                    <p>Ensino</p>
                    <h1>Cursos</h1>
                </div>

                <button class="primary">
                    + Novo curso
                </button>

            </header>


            <section class="panel">

                <h2>
                    Cursos cadastrados
                </h2>


                <div class="empty">

                    Nenhum curso cadastrado

                </div>


            </section>

        `,


        "Salas": `

            <header class="top">
                <div>
                    <p>Estrutura</p>
                    <h1>Salas</h1>
                </div>

                <button class="primary">
                    + Nova sala
                </button>

            </header>


            <section class="panel">

                <h2>
                    Salas disponíveis
                </h2>


                <div class="empty">

                    Nenhuma sala cadastrada

                </div>

            </section>

        `,


        "Trilhas": `

            <header class="top">
                <div>
                    <p>Formação</p>
                    <h1>Trilhas de Ensino</h1>
                </div>

                <button class="primary">
                    + Nova trilha
                </button>

            </header>


            <section class="panel">

                <h2>
                    Trilhas disponíveis
                </h2>


                <div class="empty">

                    Integração<br>
                    Batismo<br>
                    Escola de Líderes

                </div>

            </section>

        `,


        "Matrículas": `

            <header class="top">
                <div>
                    <p>Controle</p>
                    <h1>Matrículas</h1>
                </div>
            </header>


            <section class="panel">

                <h2>
                    Alunos matriculados
                </h2>


                <div class="empty">

                    Nenhuma matrícula registrada

                </div>

            </section>

        `,


        "Presenças": `

            <header class="top">
                <div>
                    <p>Acompanhamento</p>
                    <h1>Presenças</h1>
                </div>
            </header>


            <section class="panel">

                <h2>
                    Controle de frequência
                </h2>


                <div class="empty">

                    Nenhum registro

                </div>

            </section>

        `,


        "Notas": `

            <header class="top">
                <div>
                    <p>Avaliações</p>
                    <h1>Notas</h1>
                </div>
            </header>


            <section class="panel">

                <h2>
                    Notas dos alunos
                </h2>


                <div class="empty">

                    Nenhuma nota registrada

                </div>

            </section>

        `,


        "Certificados": `

            <header class="top">
                <div>
                    <p>Conclusão</p>
                    <h1>Certificados</h1>
                </div>
            </header>


            <section class="panel">

                <h2>
                    Certificados emitidos
                </h2>


                <div class="empty">

                    Nenhum certificado gerado

                </div>

            </section>

        `,


        "Relatórios": `

            <header class="top">
                <div>
                    <p>Dados</p>
                    <h1>Relatórios</h1>
                </div>
            </header>


            <section class="panel">

                <h2>
                    Indicadores gerais
                </h2>


                <div class="chart-placeholder">

                    Área de gráficos

                </div>

            </section>

        `

    };



    menuButtons.forEach(button => {


        button.addEventListener("click", () => {


            menuButtons.forEach(btn =>
                btn.classList.remove("active")
            );


            button.classList.add("active");


            const page = button.textContent.trim();


            content.innerHTML = pages[page];


        });


    });


});