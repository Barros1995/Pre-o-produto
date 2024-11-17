import { create } from 'zustand';

const useStore = create((set) => ({
  user: {
    name: '',
    email: '',
    cpf: '',
    phone: '',
  },
  setUser: (newUserData) => set((state) => ({
    user: { ...state.user, ...newUserData },
  })),

  products: [],
  addProduct: (product) => set((state) => ({
    products: [...state.products, product],
  })),

  usuarioLogado: false,
  usuario: "",
  senha: "",
  token: "",
  mensagemErro: "",

  login: async (usuario, senha) => {
    try {
      const loginResponse = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usuario, //"emilys"
          password: senha, //"emilyspass"
          
        }),
        credentials: 'include'
      });
        const loginData = await loginResponse.json()

        if(loginData.message != ''){
          console.log('erro',loginData.message);
          set({mensagemErro: `Ocorreu um erro: ${loginData.message}`});
        }
       
        console.log('loginData', loginData);
      
    } catch (error) {
      
    }
  },
}));

export default useStore;
