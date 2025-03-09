import { images } from '@/constants/images';
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  const { movie_id, title, count, poster_url } = movie;

  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-40 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 -left-4 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-white text-6xl font-bold">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default TrendingCard;

const styles = StyleSheet.create({});
