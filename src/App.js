import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Cocktail from "./cocktail/Cocktail";

import { Layout } from "antd";

const { Header, Content } = Layout;

const App = () => {
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    loadCocktail();
  }, []);

  const loadCocktail = () => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .then((data) => {
        setCocktail(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Layout>
        <Header>
          <div className="app-name">Random cocktail app</div>
        </Header>
        <Layout>
          <Content>
            <Cocktail cocktail={cocktail}></Cocktail>
          </Content>
        </Layout>
        {/* <Footer>footer</Footer> */}
      </Layout>
    </>
  );
};

export default App;
