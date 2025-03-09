import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetchMovies();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery.trim()]);

  useEffect(() => {
    if (movies?.length > 0 && !moviesError && movies?.[0]) {
      updateSearchCount(searchQuery.trim(), movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-dark-300">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        className="mt-2 pb-32 flex-1 px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10 mb-5" />
            </View>
            <View>
              <SearchBar
                placeholder={`Search for a movie`}
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size={'large'}
                color={`#0000ff`}
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-white text-center my-3">
                Error: {moviesError?.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white mb-3">
                  Search result for{' '}
                  <Text className="text-dark-100 font-bold">
                    {searchQuery.trim()}
                  </Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <Text className="text-white text-xl mt-64 mx-auto opacity-50">
              {searchQuery.trim() ? 'No movie found!!' : 'Search for a movie'}
            </Text>
          ) : null
        }
      />
    </View>
  );
};
export default Search;

const styles = StyleSheet.create({});
