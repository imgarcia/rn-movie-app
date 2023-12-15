import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { styles, theme } from '../theme'
import { MovieList } from '../components/movieList'

var { width, height } = Dimensions.get('window')
const iOS = Platform.OS === 'ios'
const topMargin = iOS ? '' : ' mt-3'

export const PersonScreen = ({ person }) => {
  const navigation = useNavigation()
  const [isFavorite, toggleFavorite] = useState(false)
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4])

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button and person image */}
      <View className="w-full">
        <SafeAreaView
          className={
            'z-20 w-full flex-row justify-between items-center px-4' + topMargin
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

        {/** person details */}
        {/* person image */}
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: 'gray',
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
            <Image
              source={require('../../assets/images/castImage2.png')}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>

        {/* name & birthplace */}
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            Keanu Reeves
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            Austin, Texas, USA
          </Text>
        </View>

        {/* more details */}
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">1967 - 11 - 22</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known For</Text>
            <Text className="text-neutral-300 text-sm">Acting</Text>
          </View>
          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">18.30%</Text>
          </View>
        </View>

        {/* biography */}
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Keanu Charles Reeves is a Canadian actor. Reeves is known for his
            roles in Bill & Ted's Excellent Adventure, Speed, Point Break, and
            The Matrix franchise as Neo. He has collaborated with major
            directors such as Stephen Frears (in the 1988 period drama Dangerous
            Liaisons); Gus Van Sant (in the 1991 independent film My Own Private
            Idaho); and Bernardo Bertolucci (in the 1993 film Little Buddha).
            Referring to his 1991 film releases, The New York Times' critic,
            Janet Maslin, praised Reeves' versatility, saying that he \"displays
            considerable discipline and range. He moves easily between the
            buttoned-down demeanor that suits a police procedural story and the
            loose-jointed manner of his comic roles.\" A repeated theme in roles
            he has portrayed is that of saving the world, including the
            characters of Ted Logan, Buddha, Neo, Johnny Mnemonic, John
            Constantine and Klaatu.
          </Text>
        </View>

        {/* movies */}
        <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
      </View>
    </ScrollView>
  )
}
