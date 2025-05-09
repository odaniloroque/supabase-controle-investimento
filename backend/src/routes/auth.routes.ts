import { Router } from 'express';
import { supabase } from '../server';

const router = Router();

// Rota para verificar o status da conexão com o Supabase
router.get('/status', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('count');
    
    if (error) {
      return res.status(500).json({ 
        status: 'error', 
        message: 'Erro ao conectar com o Supabase',
        error: error.message 
      });
    }

    return res.json({ 
      status: 'success', 
      message: 'Conexão com Supabase estabelecida com sucesso' 
    });
  } catch (error) {
    return res.status(500).json({ 
      status: 'error', 
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router; 