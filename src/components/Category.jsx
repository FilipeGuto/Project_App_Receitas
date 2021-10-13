import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import '../css/Category.css';

const CATEGORY_QUANTITY = 5;

function Category({ categories, onClick, onClickAll }) {
  const categoryList = categories.slice(0, CATEGORY_QUANTITY);
  return (
    <div className="category-body">
      <Button
        text="All"
        onClick={ onClickAll }
        dataTest="All-category-filter"
      />
      { categoryList.map((category) => (
        <Button
          dataTest={ `${category.strCategory}-category-filter` }
          text={ category.strCategory }
          onClick={ () => onClick(category.strCategory) }
          key={ category.strCategory }
        />
      ))}
    </div>
  );
}

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClick: PropTypes.func.isRequired,
  onClickAll: PropTypes.func.isRequired,
};

export default Category;
