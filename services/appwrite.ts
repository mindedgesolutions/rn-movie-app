import { Client, Databases, ID, Query } from 'react-native-appwrite';
// track searches made by users

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(`https://cloud.appwrite.io/v1`)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query),
    ]);

    console.log(response);

    if (response.documents.length > 0) {
      const existing = response.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, existing.$id, {
        count: existing.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update search count');
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);

    return response.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
