import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import { Cast } from '../components/cast'
import { MovieList } from '../components/movieList'
import { Loading } from '../components/loading'
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../../api/moviedb'

var { width, height } = Dimensions.get('window')
const iOS = Platform.OS === 'ios'
const topMargin = iOS ? '' : ' mt-3'

export const MovieScreen = () => {
  const { params: item } = useRoute()
  const navigation = useNavigation()

  const [movie, setMovie] = useState({})
  const [cast, setCast] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [isFavorite, toggleFavorite] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getMovieDetails(item?.id)
    getMovieCredits(item?.id)
    getSimilarMovies(item?.id)
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails({ id })
    setLoading(false)
    if (data) setMovie(data)
  }

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits({ id })
    if (data && data.cast) setCast(data.cast)
  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies({ id })
    if (data && data.results) setSimilarMovies(data.results)
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/** back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4' +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <HeartIcon
              size="35"
              color={isFavorite ? theme.background : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {!loading && (
        <View>
          {/** movie details */}
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            {/** movie title */}
            <Text className="text-white text-center text-3xl font-bold tracking-wide">
              {movie?.title}
            </Text>

            {/** movie status, release and runtime */}
            {movie?.id ? (
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movie?.status} • {movie?.release_date?.split('-')[0]} •
                {movie?.runtime} min
              </Text>
            ) : null}

            {/** movie genres */}
            <View className="flex-row justify-center mx-4 space-x-2">
              {movie?.genres?.map((genre, index) => {
                let showDot = index + 1 !== movie?.genres?.length

                return (
                  <Text
                    key={index}
                    className="text-neutral-400 font-semibold text-base text-center"
                  >
                    {genre?.name} {showDot ? '•' : null}
                  </Text>
                )
              })}
            </View>

            {/** movie description */}

            <Text className="text-neutral-400 mx-4 tracking-wide">
              {movie?.overview}
            </Text>
          </View>

          {/** movie cast members */}
          {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

          {/* similar movies */}
          {similarMovies.length > 0 && (
            <MovieList
              title="Similar Movies"
              data={similarMovies}
              hideSeeAll={true}
            />
          )}
        </View>
      )}
    </ScrollView>
  )
}
