import React, { useEffect, useState } from 'react';
import {
  Button,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Navbar({ colores, selActual }) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userCookie = cookies.get('user');

  useEffect(() => {
    if (userCookie) {
      setUser({
        name: userCookie.name,
        email: userCookie.email,
      });
    } else {
      setUser(null);
    }
  }, [userCookie]);

  return (
    <>
      <Flex p="3" flexDirection={{ base: 'column', sm: 'row' }}>
        <Box
          borderBottomRadius="sm"
          borderBottom={{ base: '0px', sm: '4px' }}
          borderColor="yellow.50"
        >
          <Heading color="blackAlpha.900" size="md" mt="2">
            Takishop - tienda virtual
          </Heading>
        </Box>
        <Spacer />
        <Box
          borderBottomRadius="sm"
          borderBottom={{ base: '0px', sm: '4px' }}
          borderColor="yellow.50"
          paddingBottom="2px"
        >
          <Breadcrumb variant="unstyled">
            <BreadcrumbItem pl="1">
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
                onClick={() => {
                  navigate('/', { replace: true });
                }}
              >
                <Link to="/">Inicio</Link>
              </Button>
            </BreadcrumbItem>
            <BreadcrumbItem>
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
                  {user ? <p>Cuenta ({user['name']})</p> : <p>Cuenta</p>}
                </MenuButton>
                {user ? (
                  <MenuList m="0" p="1">
                    <MenuItem
                      onClick={() => {
                        navigate('/log', { replace: true });
                      }}
                    >
                      Historial de compras
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        cookies.remove('user');
                      }}
                    >
                      Cerrar sesión
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList m="0" p="1">
                    <MenuItem
                      onClick={() => {
                        navigate('/login', { replace: true });
                      }}
                    >
                      Iniciar sesión
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate('/register', { replace: true });
                      }}
                    >
                      Registrarse
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
      </Flex>
    </>
  );
}

export default Navbar;
