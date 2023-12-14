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

var { width, height } = Dimensions.get('window')
const iOS = Platform.OS === 'ios'
const topMargin = iOS ? '' : ' mt-3'

export const MovieScreen = () => {
  const { params: item } = useRoute()
  const navigation = useNavigation()
  const [isFavorite, toggleFavorite] = useState(false)
  const [cast, setCast] = useState([1, 2, 3, 4, 5])
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5])

  let movieName = 'Ant-Man and the Wasp: Quantumania'

  useEffect(() => {
    // call the movie details api
  }, [item])

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

        <View>
          <Image
            source={require('../../assets/images/moviePoster2.png')}
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
      </View>

      {/** movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/** movie title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wide">
          {movieName}
        </Text>

        {/** movie status, release and runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released • 2020 • 170 min
        </Text>

        {/** movie genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>

        {/** movie description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Super-Hero partners Scott Lang and Hope van Dyne, along with with
          Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter
          Cassie Lang, find themselves exploring the Quantum Realm, interacting
          with strange new creatures and embarking on an adventure that will
          push them beyond the limits of what they thought possible.
        </Text>
      </View>

      {/** movie cast members */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies */}
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  )
}
