import "@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const corsHeaders = {

  "Access-Control-Allow-Origin": "*",

  "Access-Control-Allow-Headers":
  "authorization, x-client-info, apikey, content-type",

};



Deno.serve(async (req) => {


  if(req.method === "OPTIONS"){

    return new Response(
      "ok",
      {
        headers:corsHeaders
      }
    );

  }



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




    const {data:user, error:errorAuth} = await supabaseAdmin
    .auth.admin.createUser({

      email,

      password,

      email_confirm:true

    });




    if(errorAuth){

      return Response.json(

        {
          erro:errorAuth.message
        },

        {
          status:400,
          headers:corsHeaders
        }

      );

    }





    const {error:errorDB}=await supabaseAdmin
    .from("usuarios")
    .insert({

      matricula_id,

      auth_id:user.user.id,

      nome,

      nome_exibicao,

      email,

      nivel_acesso,

      ativo:true

    });




    if(errorDB){

      return Response.json(

        {
          erro:errorDB.message
        },

        {
          status:400,
          headers:corsHeaders
        }

      );

    }





    return Response.json(

      {

        sucesso:true

      },

      {

        headers:corsHeaders

      }

    );





  }catch(error){


    return Response.json(

      {

        erro:error.message

      },

      {

        status:500,

        headers:corsHeaders

      }

    );


  }


});