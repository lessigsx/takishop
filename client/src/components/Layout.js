import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { extendTheme } from '@chakra-ui/react';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';

function Layout() {
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
  const [selActual, setSel] = useState('original');
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
    <Routes>
      <Route
        path="/"
        element={
          <Home colores={colores} selActual={selActual} setSel={setSel} />
        }
      />
      <Route
        path="/register"
        element={<Register colores={colores} selActual={selActual} theme={theme} />}
      />
      <Route
        path="/login"
        element={<Login colores={colores} selActual={selActual} theme={theme} />}
      />
    </Routes>
  );
}

export default Layout;
