import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Input,
  Select,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import takis_fuego from '../images/takis_fuego.png';
import takis_huakamole from '../images/takis_huakamole.png';
import takis_original from '../images/takis_original.png';
import takis_volcano from '../images/takis_volcano.png';
import axios from 'axios';
import '@fontsource/akshar/';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function Buy({ colores, selActual, theme }) {
  const navigate = useNavigate();
  const [bought, setBought] = useState(false);
  const takisImg = {
    fuego: takis_fuego,
    huakamoles: takis_huakamole,
    original: takis_original,
    volcano: takis_volcano,
  };
  const [takisData, setData] = useState(null);

  const cookies = new Cookies();
  const [formData, setFormData] = useState({
    userId: cookies.get('user') ? cookies.get('user')['id'] : 'offline',
    product: selActual,
    quantity: 1,
    address: '',
    city: '',
    region: '',
    postalCode: '',
  });

  const formNotComplete =
    formData['product'].length > 0 &&
    formData['quantity'] >= 1 &&
    formData['address'].length > 0 &&
    formData['city'].length > 0 &&
    formData['region'].length > 0 &&
    formData['postalCode'].length > 0 &&
    !bought;

  useEffect(() => {
    const getData = async () => {
      const products = await axios.get('http://localhost:9000/products');
      const data = products.data;
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (data[i]['name'].slice(6).toLowerCase() === selActual) {
          setData(data[i]);
          break;
        }
      }
    };
    if (formData.userId === 'offline') {
      navigate('/', { replace: true });
    } else {
      getData();
    }
  }, [selActual, formData.userId, navigate]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar colores={colores} selActual={selActual} />
      {bought ? (
        <Box
          pos="fixed"
          zIndex={2}
          boxShadow="lg"
          rounded="lg"
          left="50%"
          top="50%"
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            h={[250, 200]}
            w={[280, 400]}
          >
            <AlertIcon boxSize="40px" mr="0" />
            <AlertTitle mt="4" mb="1" mr="0">
              Compra realizada!
            </AlertTitle>
            <AlertDescription maxWidth="sm" mt="2">
              Se te redirigirá a la página de inicio en 2 segundos.
            </AlertDescription>
          </Alert>
        </Box>
      ) : null}
      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem
            w="100%"
            h="80%"
            borderRight="2px solid white"
            borderRightRadius="2px"
            borderLeft="2px solid white"
            borderLeftRadius="2px"
          >
            <Image
              boxSize="90%"
              objectFit="contain"
              src={takisImg[selActual]}
            />
          </GridItem>
          <GridItem w="100%">
            <Box
              style={{
                fontFamily: 'Akshar, sans-serif',
                fontSize: '2.40em',
              }}
            >
              {takisData ? (
                <>
                  <p>{takisData['name']}</p>
                  <p>{takisData['price'] * formData['quantity']} CLP</p>
                  <Grid mb="4" templateColumns="repeat(2, 60px)">
                    <span>{formData['quantity']}</span>
                    <Grid templateColumns="repeat(2, 60px)">
                      <GridItem h="10">
                        <IconButton
                          colorScheme={
                            selActual === 'huakamoles' ? 'blackAlpha' : null
                          }
                          aria-label="Comprar una unidad más"
                          icon={<ChevronUpIcon />}
                          onClick={() => {
                            setFormData((previousData) => {
                              return {
                                ...previousData,
                                quantity: previousData['quantity'] + 1,
                              };
                            });
                          }}
                        />
                      </GridItem>
                      <GridItem h="10">
                        <IconButton
                          colorScheme={
                            selActual === 'huakamoles' ? 'blackAlpha' : null
                          }
                          aria-label="Comprar una unidad menos"
                          icon={<ChevronDownIcon />}
                          onClick={() => {
                            setFormData((previousData) => {
                              return {
                                ...previousData,
                                quantity: previousData['quantity'] - 1,
                              };
                            });
                          }}
                          isDisabled={formData['quantity'] <= 1}
                        />
                      </GridItem>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <p>Cargando...</p>
              )}
            </Box>
            <Box
              p="4"
              backgroundColor="whiteAlpha.600"
              w="80%"
              borderRadius="lg"
            >
              <Heading mb="4">Datos</Heading>
              <form>
                <FormControl isRequired mb="2">
                  <FormLabel>Dirección</FormLabel>
                  <Input
                    type="text"
                    value={formData['address']}
                    onChange={(i) => {
                      setFormData((prevData) => {
                        return { ...prevData, address: i.target.value };
                      });
                    }}
                    variant="flushed"
                    placeholder="Santa María"
                  />
                </FormControl>
                <FormControl isRequired mb="2">
                  <FormLabel>Ciudad</FormLabel>
                  <Input
                    type="text"
                    value={formData['city']}
                    onChange={(i) => {
                      setFormData((prevData) => {
                        return { ...prevData, city: i.target.value };
                      });
                    }}
                    variant="flushed"
                    placeholder="Calama"
                  />
                </FormControl>
                <FormControl isRequired mb="2">
                  <FormLabel>Región</FormLabel>
                  <Select
                    placeholder="Selecciona una región"
                    onChange={(i) => {
                      setFormData((prevData) => {
                        return { ...prevData, region: i.target.value };
                      });
                    }}
                    variant="flushed"
                  >
                    <option value="Arica">Arica</option>
                    <option value="Taparaca">Tarapacá</option>
                    <option value="Antofagasta">Antofagasta</option>
                    <option value="Atacama">Atacama</option>
                    <option value="Coquimbo">Coquimbo</option>
                    <option value="Valparaiso">Valparaíso</option>
                    <option value="Metropolitana">Metropolitana</option>
                    <option value="OHiggins">O'Higgins</option>
                    <option value="Maule">Maule</option>
                    <option value="Ñuble">Ñuble</option>
                    <option value="Biobio">Bío Bío</option>
                    <option value="Araucania">Araucanía</option>
                    <option value="Los Rios">Los Ríos</option>
                    <option value="Los Lagos">Los Lagos</option>
                    <option value="Aysen">Aysén</option>
                    <option value="Magallanes">Magallanes</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Código postal</FormLabel>
                  <Input
                    type="text"
                    onChange={(i) => {
                      setFormData((prevData) => {
                        return { ...prevData, postalCode: i.target.value };
                      });
                    }}
                    variant="flushed"
                    placeholder="2670"
                  />
                  <FormHelperText>
                    De haber un detalle en su pedido, se le notificará a su
                    email.
                  </FormHelperText>
                  <FormHelperText color="gray.800">
                    Sitio de demostración, no hay una forma de pago real.
                  </FormHelperText>
                </FormControl>
                <Button
                  mt="2"
                  colorScheme="teal"
                  onClick={() => {
                    axios.post('http://localhost:9000/purchase', {
                      formData,
                    });
                    setBought(true);
                    setTimeout(() => {
                      navigate("/", { replace: true })
                    }, 2000)
                  }}
                  isDisabled={!formNotComplete}
                >
                  Comprar
                </Button>
              </form>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default Buy;
