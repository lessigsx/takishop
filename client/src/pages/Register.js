import React, { useState } from 'react';
import {
  Box,
  extendTheme,
  Heading,
  ChakraProvider,
  Center,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Text,
} from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
      },
    },
  },
});

function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const passwordValidation = {
    hasEightChars: data['password'].length >= 8,
    hasNumber: /\d/.test(data['password']),
  };

  console.log(data);

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Center m="10">
          <Heading>Cuenta</Heading>
        </Center>
        <Box mr="20%" ml="20%">
          <form>
            <FormControl isRequired mb="4">
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                value={data['name']}
                onChange={(event) =>
                  setData((oldData) => {
                    return { ...oldData, name: event.target.value };
                  })
                }
              />
            </FormControl>
            <FormControl isRequired mb="4">
              <FormLabel>Dirección de correo</FormLabel>
              <Input
                type="email"
                value={data['email']}
                onChange={(event) =>
                  setData((oldData) => {
                    return { ...oldData, email: event.target.value };
                  })
                }
              />
              <FormHelperText>
                Sólo utilizaremos tu e-mail para pedidos y notificaciones
                urgentes.
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={data['password']}
                onChange={(event) =>
                  setData((oldData) => {
                    return { ...oldData, password: event.target.value };
                  })
                }
              />
              <FormHelperText>
                Debe tener al menos{' '}
                <Text
                  as="span"
                  textDecoration="underline"
                  textDecorationColor={
                    passwordValidation['hasEightChars'] ? 'green' : 'red'
                  }
                  textDecorationThickness="1.25px"
                >
                  8 carácteres
                </Text>
                , y{' '}
                <Text
                  as="span"
                  textDecoration="underline"
                  textDecorationColor={
                    passwordValidation["hasNumber"] ? 'green' : 'red'
                  }
                  textDecorationThickness="1.25px"
                >
                  un número
                </Text>
                .
              </FormHelperText>
            </FormControl>
            <Center mt="4">
              <Button type="submit" colorScheme="green" size="lg">
                Registrarse
              </Button>
            </Center>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Register;
