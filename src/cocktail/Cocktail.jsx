import React from "react";
import PropTypes from "prop-types";

import { Card, Image, Tag, List, Divider } from "antd";

import "./cocktail.css";

const Cocktail = ({ cocktail }) => {
  if (!cocktail) return "Loading ...";

  const drink = cocktail.drinks[0];

  const cocktailImageUrl = `${drink.strDrinkThumb}/preview`;
  const cocktailName = drink.strDrink;
  const isAlcoholic = drink.strAlcoholic === "Alcoholic";
  const instructions = [drink.strInstructions];

  /// Ingredients
  const filteredIngredientsKeys = Object.keys(drink).filter((ingredientKey) => {
    return ingredientKey.startsWith("strIngredient") && drink[ingredientKey];
  });

  const formattedIngredientsAndMeasures = filteredIngredientsKeys.map(
    (ingredientKey) => {
      const ingredientIndice = ingredientKey.split("strIngredient")[1];
      return {
        ingredient: drink[ingredientKey],
        measure: drink[`strMeasure${ingredientIndice}`],
      };
    }
  );

  const renderIngredientsAndMeasures = formattedIngredientsAndMeasures.map(
    (element) => {
      return element.measure
        ? `${element.measure} ${element.ingredient}`
        : element.ingredient;
    }
  );

  const renderIsAlcoholic = () => {
    return isAlcoholic ? (
      <Tag color="red">With Alcohol</Tag>
    ) : (
      <Tag color="green">Without alcohol</Tag>
    );
  };

  return (
    <>
      <Card
        title={cocktailName}
        extra={renderIsAlcoholic()}
        className="cocktail-card"
      >
        <div className="cocktail-image">
          <Image width={200} src={cocktailImageUrl} alt="Cocktail" />
        </div>
        <Divider orientation="left">Ingredients</Divider>
        <List
          size="small"
          bordered
          dataSource={renderIngredientsAndMeasures}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        <Divider orientation="left">Instructions</Divider>
        <List
          size="small"
          bordered
          dataSource={instructions}
          renderItem={(instruction) => <List.Item>{instruction}</List.Item>}
        />
      </Card>
    </>
  );
};

Cocktail.propTypes = {
  cocktail: PropTypes.object.isRequired,
};

export default Cocktail;
