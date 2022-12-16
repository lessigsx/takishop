import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Spacer,
  Center,
  Card,
  CardBody,
  Image,
  IconButton,
  Button,
  ChakraProvider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { extendTheme } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import takis_fuego from '../images/takis_fuego.png';
import takis_huakamole from '../images/takis_huakamole.png';
import takis_original from '../images/takis_original.png';
import takis_volcano from '../images/takis_volcano.png';

function Home() {
  const takis = {
    fuego: (
      <CardBody>
        <Center>
          <Image
            boxSize="80%"
            src={takis_fuego}
            alt="Takis Fuego"
            borderRadius="lg"
          />
        </Center>
        <Center>
          <Heading size="sm" p="2">
            Fuego
          </Heading>
        </Center>
      </CardBody>
    ),
    original: (
      <CardBody>
        <Center>
          <Image
            boxSize="80%"
            src={takis_original}
            alt="Takis Original"
            borderRadius="lg"
          />
        </Center>
        <Center>
          <Heading size="sm" p="2">
            Original
          </Heading>
        </Center>
      </CardBody>
    ),
    volcano: (
      <CardBody>
        <Center>
          <Image
            boxSize="80%"
            src={takis_volcano}
            alt="Takis Volcano"
            borderRadius="lg"
          />
        </Center>
        <Center>
          <Heading size="sm" p="2">
            Volcano
          </Heading>
        </Center>
      </CardBody>
    ),
    huakamoles: (
      <CardBody>
        <Center>
          <Image
            boxSize="80%"
            src={takis_huakamole}
            alt="Takis Huakamoles"
            borderRadius="lg"
          />
        </Center>
        <Center>
          <Heading size="sm" p="2">
            Huakamoles
          </Heading>
        </Center>
      </CardBody>
    ),
  };
  const [selActual, setSel] = useState('original');
  const llavesTakis = Object.keys(takis);
  const colores = {
    original: 'green.200',
    volcano: 'red.200',
    fuego: 'purple.200',
    huakamoles: 'gray.200',
    originalbg: 'green.100',
    volcanobg: 'red.100',
    fuegobg: 'purple.100',
    huakamolesbg: 'gray.100',
    originalbutton: 'green',
    volcanobutton: 'red',
    fuegobutton: 'purple',
    huakamolesbutton: 'gray',
  };

  useEffect(() => {
    const handleLeftArrow = (event) => {
      if (event.keyCode === 37) {
        setSel((oldSel) =>
          oldSel !== 'fuego'
            ? llavesTakis[llavesTakis.indexOf(oldSel) - 1]
            : 'huakamoles'
        );
      }
    };

    const handleRightArrow = (event) => {
      if (event.keyCode === 39) {
        setSel((oldSel) =>
          oldSel !== 'huakamoles'
            ? llavesTakis[llavesTakis.indexOf(oldSel) + 1]
            : 'fuego'
        );
      }
    };
    window.addEventListener('keydown', handleLeftArrow);
    window.addEventListener('keydown', handleRightArrow);
    return () => {
      window.removeEventListener('keydown', handleLeftArrow);
      window.removeEventListener('keydown', handleRightArrow);
    };
  }, [llavesTakis]);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: colores[selActual + 'bg'],
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Flex p="3">
          <Box
            borderBottomRadius="sm"
            borderBottom="4px"
            borderColor="yellow.50"
          >
            <Heading color="blackAlpha.900" size="md" mt="2">
              Takishop - tienda virtual
            </Heading>
          </Box>
          <Spacer />
          <Box
            borderBottomRadius="sm"
            borderBottom="4px"
            borderColor="yellow.50"
            paddingBottom="2px"
          >
            <Breadcrumb variant="unstyled">
              <BreadcrumbItem pl="1" isCurrentPage>
                <BreadcrumbLink>
                  <Button
                    pl="2"
                    pr="2"
                    pt="0"
                    pb="0"
                    m="0"
                    backgroundColor="transparent"
                      _hover={{
                        bg: colores[selActual],
                      }}
                      _active={{
                        bg: colores[selActual],
                      }}
                  >
                    <Link to="/">Inicio</Link>
                  </Button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Menu>
                    <MenuButton
                      pl="1"
                      pr="1"
                      pt="0"
                      pb="0"
                      m="0"
                      backgroundColor="transparent"
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      _hover={{
                        bg: colores[selActual],
                      }}
                      _active={{
                        bg: colores[selActual],
                      }}
                    >
                      Cuenta
                    </MenuButton>
                    <MenuList m="0" p="1">
                      <MenuItem>
                        <Link to="/register" style={{ minWidth: '100%' }}>
                          Registrarse
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/login" style={{ minWidth: '100%' }}>
                          Iniciar sesión
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
        </Flex>
        <Center m={4}>
          <Heading size="lg">Elige tu tipo</Heading>
        </Center>
        <Center>
          <Box maxW="xs">
            <Card maxW="sm">
              {llavesTakis.indexOf(selActual) === 0
                ? takis['huakamoles']
                : null}
              {llavesTakis.indexOf(selActual) === 1 ? takis['fuego'] : null}
              {llavesTakis.indexOf(selActual) === 2 ? takis['original'] : null}
              {llavesTakis.indexOf(selActual) === 3 ? takis['volcano'] : null}
            </Card>
          </Box>
          <Box p="2" maxW="lg">
            <Card maxW="sm" backgroundColor={colores[selActual]}>
              {takis[selActual]}
              <Button
                backgroundColor={colores[selActual + 'bg']}
                color="blackAlpha.800"
                size="sm"
                onClick={() => {
                  alert('Aqui le das a /buy o algo asi no se luego inventas');
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                    fill="currentColor"
                  />
                </svg>
                <Text as="b" ml="1" fontSize="md">
                  Comprar
                </Text>
              </Button>
            </Card>
          </Box>
          <Box maxW="xs">
            <Card maxW="sm">
              {llavesTakis.indexOf(selActual) === 0 ? takis['original'] : null}
              {llavesTakis.indexOf(selActual) === 1 ? takis['volcano'] : null}
              {llavesTakis.indexOf(selActual) === 2
                ? takis['huakamoles']
                : null}
              {llavesTakis.indexOf(selActual) === 3 ? takis['fuego'] : null}
            </Card>
          </Box>
        </Center>
        <Center mt="4">
          <IconButton
            colorScheme={colores[selActual + 'button']}
            aria-label="Siguiente producto"
            mr="8"
            p="4"
            pr="8"
            pl="8"
            icon={<ArrowBackIcon boxSize={6} />}
            onClick={() => {
              setSel((oldSel) =>
                oldSel !== 'fuego'
                  ? llavesTakis[llavesTakis.indexOf(oldSel) - 1]
                  : 'huakamoles'
              );
            }}
          />
          <IconButton
            colorScheme={colores[selActual + 'button']}
            aria-label="Siguiente producto"
            p="4"
            pr="8"
            pl="8"
            icon={<ArrowForwardIcon boxSize={6} />}
            onClick={() => {
              setSel((oldSel) =>
                oldSel !== 'huakamoles'
                  ? llavesTakis[llavesTakis.indexOf(oldSel) + 1]
                  : 'fuego'
              );
            }}
          />
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default Home;
