const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://aptdoxgiqsqnvkyfgucx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdGRveGdpcXNxbnZreWZndWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4MDc5NzQsImV4cCI6MjAzNDM4Mzk3NH0.G-S35DEwlX36OigNn7jrv5GswUZZwd6j9DHUQyz6q2Y";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
