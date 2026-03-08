import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uozewicsunkajguzgdoj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvemV3aWNzdW5rYWpndXpnZG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDA1NzAsImV4cCI6MjA4ODU3NjU3MH0.9qzxgqR6PKPKwKmCPbDR2Sos532XGuGQNrAfQnBYOwE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
    const email = 'yanrossi107@hotmail.com';
    const password = 'Yan.123123';

    console.log(`Tentando logar com ${email}...`);
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (signInData.user) {
        console.log('✅ Usuário de Admin já existe e o login foi bem sucedido!');
        return;
    }

    console.log('Criando conta de Admin...');
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: 'Admin Yan',
            }
        }
    });

    if (error) {
        console.error('❌ Erro ao criar o Administrador:', error.message);
    } else {
        console.log('✅ Administrador criado com sucesso!', data.user.id);
    }
}

createAdmin();
