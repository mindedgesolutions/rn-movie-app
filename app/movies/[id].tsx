import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MovieInfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-white font-normal text-sm">{label}</Text>
    <Text className="text-white font-bold text-sm mt-2">{value || `NA`}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-dark-300 flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[600px]"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <View className="flex-row items-baseline gap-x-2">
            <Text className="text-white font-bold text-2xl">
              {movie?.title}
            </Text>
            <Text className="text-white text-sm opacity-50">
              ({movie?.runtime} m)
            </Text>
          </View>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-white text-lg opacity-50">
              {movie?.release_date.split('-')[0]}
            </Text>
          </View>
          <View className="flex-row items-center bg-dark-200/40 px-2 py-1.5 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="w-5 h-5" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-white text-sm">({movie?.vote_count})</Text>
          </View>
          <MovieInfo
            label="Overview"
            value={movie?.overview as string | number | null}
          />
          <MovieInfo
            label="Language"
            value={movie?.genres?.map((g) => g.name).join(' - ') || 'NA'}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget as number) / 1000000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${
                Math.round(movie?.revenue as number) / 1000000
              } million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                .map((p) => p.name)
                .join(' - ') as string
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-dark-200 rounded-lg py-3 flex flex-row items-center justify-center z-50"
        onPress={() => router.back()}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={`#fff`}
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MovieDetails;

const styles = StyleSheet.create({});
