import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [markedCountry, setMarkedCountry] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favorites')))
      setFavorites(JSON.parse(localStorage.getItem('favorites')));
  }, []);
  const handleChanged = (value, checked, label) => {
    if (checked) {
      markedCountry.push(...[label]);
      setFilter(!filter);
    } else {
      setMarkedCountry(markedCountry.filter(e => e !== label));
    }
  }

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };
  const handleMouseClicked = async (index, user) => {
    const localData = localStorage.getItem('favorites');
    if (localData) {
      if (!localData.includes(JSON.stringify(user))) {
        favorites.push(...[user]);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } else {
        setFavorites(favorites.filter(e => JSON.stringify(e) !== JSON.stringify(user)));
        localStorage.setItem('favorites', JSON.stringify(favorites.filter(e => JSON.stringify(e) !== JSON.stringify(user))));
      }
    } else {
      favorites.push(...[user]);
      if (favorites)
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleChanged} />
        <CheckBox value="AU" label="Australia" onChange={handleChanged} />
        <CheckBox value="CA" label="Canada" onChange={handleChanged} />
        <CheckBox value="GE" label="Germany" onChange={handleChanged} />
        {/* Bonus */}
        <CheckBox value="DE" label="Denmark" onChange={handleChanged} />
        {/* Bonus */}
      </S.Filters>
      <S.List>
        {!markedCountry.length ? users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              {JSON.stringify(favorites).includes(JSON.stringify(user)) ? (
                <S.IconButtonWrapper isVisible={true} >
                  <IconButton onClick={() => handleMouseClicked(index, user)} >
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>)
                :
                (<S.IconButtonWrapper isVisible={index === hoveredUserId}>
                  <IconButton onClick={() => handleMouseClicked(index, user)} >
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>)}
            </S.User>
          );
        })
          : (

            users.map((user, index) => {
              return (
                markedCountry.includes(user.location.country) &&
                <S.User
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <S.UserPicture src={user?.picture.large} alt="" />
                  <S.UserInfo>
                    <Text size="22px" bold>
                      {user?.name.title} {user?.name.first} {user?.name.last}
                    </Text>
                    <Text size="14px">{user?.email}</Text>
                    <Text size="14px">
                      {user?.location.street.number} {user?.location.street.name}
                    </Text>
                    <Text size="14px">
                      {user?.location.city} {user?.location.country}
                    </Text>
                  </S.UserInfo>
                  {JSON.stringify(favorites).includes(JSON.stringify(user)) ? (
                    <S.IconButtonWrapper isVisible={true} >
                      <IconButton onClick={() => handleMouseClicked(index, user)} >
                        <FavoriteIcon color="error" />
                      </IconButton>
                    </S.IconButtonWrapper>)
                    :
                    (<S.IconButtonWrapper isVisible={index === hoveredUserId}>
                      <IconButton onClick={() => handleMouseClicked(index, user)} >
                        <FavoriteIcon color="error" />
                      </IconButton>
                    </S.IconButtonWrapper>)}
                </S.User>
              );
            })
          )}



        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
