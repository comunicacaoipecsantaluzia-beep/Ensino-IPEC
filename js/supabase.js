// =====================================
// CONEXÃO SUPABASE - IPEC ENSINO
// =====================================


const supabaseUrl = "https://ivvuvmlxoiygzywsclba.supabase.co";


const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dnV2bWx4b2l5Z3p5d3NjbGJhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDA1NDkyOSwiZXhwIjoyMDk5NjMwOTI5fQ.TA-wF9S1V8XNi-xcw-tOFxjtNa24HsDjvVcfw15_NjQ";



const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);


console.log("Supabase conectado");