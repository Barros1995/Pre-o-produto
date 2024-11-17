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

  // Autenticação
  usuarioLogado: false,
  usuario: '',
  senha: '',
  token: '',
  mensagemErro: '',

  login: async (usuario, senha) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usuario, //"emilys"
          password: senha, //"emilyspass"
        }),
      });

      // Verificar status HTTP
      if (!response.ok) {
        const errorData = await response.json();
        set({ mensagemErro: `Erro: ${errorData.message, 'Falha no login'}` });
        return;
      }

      const loginData = await response.json();
      console.log('Dados de login:', loginData);

      // Atualizar estado no login bem-sucedido
      if(loginData.accessToken){
        const logarUsuario = await /* providing access token in bearer */
        fetch('https://dummyjson.com/user/me', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer' + loginData.accessToken, 
          },
          credentials: 'include' // Include cookies (e.g., accessToken) in the request
        })
        const logarUsuarioData = await logarUsuario.json();
        set({usuarioLogado:true, usuario: usuario,senha: senha, token: loginData.accessToken,})
      }

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
      
    }
  },

  logout: () => set({usuarioLogado: false, usuario:"", senha:"", token:""}),
}));

export default useStore;