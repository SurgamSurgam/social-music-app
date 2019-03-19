import React from "react";

const FavoriteButtonDisplay = ({
  allFavoritesForUser,
  song_id,
  deleteFavorite,
  addFavorite
}) => {
  //For favs below----
  let answer = [];
  if (allFavoritesForUser) {
    answer = Object.values(allFavoritesForUser).filter(fav => {
      return song_id === fav.song_id;
    });
  }
  let favId;
  if (answer.length) {
    favId = answer[0].id;
  }
  //For Favs above

  return (
    <div>
      {favId ? (
        <button onClick={() => deleteFavorite(favId)}>Unfavorite</button>
      ) : (
        <button onClick={() => addFavorite(song_id)}>Favorite</button>
      )}
    </div>
  );
};

export default FavoriteButtonDisplay;
