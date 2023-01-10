import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../components/Navbar';
import takis_fuego from '../images/takis_fuego.png';
import takis_huakamole from '../images/takis_huakamole.png';
import takis_original from '../images/takis_original.png';
import takis_volcano from '../images/takis_volcano.png';

function Log({ colores, selActual, theme }) {
  const cookies = new Cookies();
  const userId = cookies.get('user').id ? cookies.get('user').id : null;
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const takisImg = {
    fuego: takis_fuego,
    huakamoles: takis_huakamole,
    original: takis_original,
    volcano: takis_volcano,
  };

  useEffect(() => {
    if (userId) {
      axios
        .post('http://localhost:9000/log', {
          id: userId,
        })
        .then((res) => {
          setOrders(res.data);
        });
    } else {
      navigate('/', { replace: true });
    }
  }, [userId, navigate]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar colores={colores} selActual={selActual} />
      <Box>
        <Center>
          <Heading mb="12">Compras recientes</Heading>
        </Center>
        {orders ? (
          <Flex justifyContent="center" alignItems="center">
            {orders.map((item) => (
              <Box>
                <Image boxSize="sm" src={takisImg[item['product']]} />
                <Box>
                  <Center>
                    <Heading display="inline-block">{item['quantity']}</Heading>
                    <Text display="inline" fontSize="xl" ml="2">
                      comprados
                    </Text>
                  </Center>
                  <Center>
                    <Text>{item['address']}</Text>
                  </Center>
                </Box>
              </Box>
            ))}
          </Flex>
        ) : null}
      </Box>
    </ChakraProvider>
  );
}

export default Log;
