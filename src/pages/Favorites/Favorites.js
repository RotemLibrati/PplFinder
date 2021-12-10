import React, { useState, useEffect } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {

    const [favorites, setFavorites] = useState([]);
    const { isLoading } = usePeopleFetch();
    const fetchFavorites = () => {
        const localData = localStorage.getItem('favorites');
        setFavorites(JSON.parse(localData));
    }
    useEffect(() => {
        const interval = setInterval(fetchFavorites, 100);
        return () => {
            clearInterval(interval);
        }
    }, []);
    return (
        <S.Favorites>
            <S.Content>
                <S.Header>
                    <Text size="64px" bold>
                        Favorites
                    </Text>
                </S.Header>
                <UserList users={favorites} isLoading={isLoading} />
            </S.Content>
        </S.Favorites>
    );
};

export default Favorites;