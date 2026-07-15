import "@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


Deno.serve(async (req) => {

  try {

    const {
      email,
      password,
      matricula_id,
      nome,
      nome_exibicao,
      nivel_acesso
    } = await req.json();


    const supabaseAdmin = createClient(

      Deno.env.get("SUPABASE_URL") ?? "",

      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""

    );



    // Criar usuário no Auth

    const { data: usuarioAuth, error: erroAuth } = await supabaseAdmin
      .auth.admin.createUser({

        email,

        password,

        email_confirm: true

      });



    if(erroAuth){

      return Response.json(
        {
          erro: erroAuth.message
        },
        {
          status:400
        }
      );

    }



    // Criar usuário na tabela usuarios

    const { error: erroBanco } = await supabaseAdmin

      .from("usuarios")

      .insert({

        matricula_id,

        auth_id: usuarioAuth.user.id,

        nome,

        nome_exibicao,

        email,

        nivel_acesso,

        ativo:true

      });



    if(erroBanco){

      return Response.json(

        {
          erro: erroBanco.message
        },

        {
          status:400
        }

      );

    }



    return Response.json({

      sucesso:true,

      mensagem:"Usuário criado com sucesso"

    });



  } catch(error){


    return Response.json(

      {
        erro:error.message
      },

      {
        status:500
      }

    );


  }

});