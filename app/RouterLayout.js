import { Stack } from "expo-router";

const RouterLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
            <Stack.Screen name="home" />
            <Stack.Screen name="adicionar" />
            <Stack.Screen name="categoria" />
            <Stack.Screen name="local" />
            <Stack.Screen name="perfil" />
            <Stack.Screen name="editar-perfil" />
        </Stack>
    );
}

export default RouterLayout;
