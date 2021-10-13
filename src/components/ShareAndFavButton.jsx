import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { shareButtonFunc,
  setFavorites, checkFavorite } from '../GlobalFuncs/shareAndFavButtonFuncs';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/ShareAndFavButton.css';

function ShareAndFavButton({ recipeInfos:
  { id, tipo, area, category, alcoholic, title, image } }) {
  const history = useHistory();
  const [copiedText, setCopyText] = useState(false);
  const [favorite, setFavorite] = useState(checkFavorite(id));

  const removeCopiedText = () => {
    const TIMER_LIMIT = 2000;
    setTimeout(() => {
      setCopyText(false);
    }, TIMER_LIMIT);
  };

  const handleShare = () => {
    const itemDetailUrl = history.location.pathname.replace('/in-progress', '');
    shareButtonFunc(`http://localhost:3000${itemDetailUrl}`);
    setCopyText(true);
    removeCopiedText();
  };

  const handleFavorite = () => {
    const modifiedRecipe = {
      id,
      type: tipo,
      area,
      category,
      alcoholicOrNot: alcoholic,
      name: title,
      image,
    };
    setFavorite(!favorite);
    setFavorites(modifiedRecipe);
  };

  return (
    <div className="share-fav-main">
      <div className="share-fav-container">
        <button
          type="button"
          src={ shareIcon }
          data-testid="share-btn"
          onClick={ handleShare }
        >
          <img src={ shareIcon } alt="Share Icon" />
        </button>

        <button
          type="button"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
          onClick={ handleFavorite }
        >
          <img src={ favorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite icon" />
        </button>
      </div>

      {copiedText && <span>Link copiado!</span>}
    </div>
  );
}

ShareAndFavButton.propTypes = {
  recipeInfos: PropTypes.shape({
    id: PropTypes.string,
    tipo: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholic: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default ShareAndFavButton;
