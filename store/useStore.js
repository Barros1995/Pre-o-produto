import { create } from 'zustand';

const useStore = create((set) => ({
  // Dados do usuário
  user: {
    name: '',
    email: '',
    cpf: '',
    phone: '',
  },
  setUser: (newUserData) =>
    set((state) => ({
      user: { ...state.user, ...newUserData },
    })),

  // Produtos
  products: [], 
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  // Categorias
  categories:  [],
  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  // Gerenciamento de foto capturada
  capturedPhoto: null, 
  setCapturedPhoto: (photoUri) =>
    set({
      capturedPhoto: photoUri,
    }),
  clearCapturedPhoto: () =>
    set({
      capturedPhoto: null,
    }),

  // Autenticação
  usuarioLogado: false,
  usuario: '', //emilys
  senha: '',//emilyspass
  token: '',
  mensagemErro: '',

  login: async (usuario, senha) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usuario,
          password: senha,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        set({ mensagemErro: `Erro: ${errorData.message || 'Falha no login'}` });
        return;
      }

      const loginData = await response.json();
      console.log('Dados de login:', loginData);

      set({
        usuarioLogado: true,
        token: loginData.token,
        mensagemErro: '',
      });

      set({
        user: {
          name: loginData.username,
          email: loginData.email || '',
        },
      });
    } catch (error) {
      console.error('Erro no login:', error);
      set({ mensagemErro: 'Erro ao conectar ao servidor.' });
    }
  },

  logout: () =>
    set({
      usuarioLogado: false,
      usuario: '',
      senha: '',
      token: '',
      user: { name: '', email: '', cpf: '', phone: '' },
    }),
}));

export default useStore;
