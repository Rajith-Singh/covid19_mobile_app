import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useCount } from '../context/CountContext';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';





interface Item {
  id: number;
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  flag: string;
  active: number;
  todayCases: number;
  todayDeaths: number;
}

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [globalStats, setGlobalStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { count, incrementCount } = useCount();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const fetchData = async () => {
    try {
      const [countriesResponse, globalResponse] = await Promise.all([
        axios.get('https://disease.sh/v3/covid-19/countries'),
        axios.get('https://disease.sh/v3/covid-19/all')
      ]);

      const data = countriesResponse.data.map((item: any, index: number) => ({
        id: index,
        country: item.country,
        cases: item.cases,
        deaths: item.deaths,
        recovered: item.recovered,
        flag: item.countryInfo.flag,
        active: item.active,
        todayCases: item.todayCases,
        todayDeaths: item.todayDeaths,
      }));

      setItems(data);
      setFilteredItems(data);
      setGlobalStats(globalResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUsername(parsedData.username || 'User');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
        setUsername('User');
      }
    };

    fetchUsername();
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <Text style={styles.statValue}>{value.toLocaleString()}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const renderTop5Countries = () => {
    const top5 = [...items].sort((a, b) => b.cases - a.cases).slice(0, 5);

    return (
      <View style={styles.top5Container}>
        <Text style={styles.sectionTitle}>Top 5 Countries</Text>
        {top5.map((item, index) => (
          <View key={item.id} style={styles.top5Item}>
            <Text style={styles.top5Rank}>{index + 1}</Text>
            <Image source={{ uri: item.flag }} style={styles.flag} />
            <Text style={styles.top5Country}>{item.country}</Text>
            <Text style={styles.top5Cases}>{item.cases.toLocaleString()} Cases</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={incrementCount}
      activeOpacity={0.9}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.flagContainer}>
            <Image source={{ uri: item.flag }} style={styles.flag} />
          </View>
          <Text style={styles.country}>{item.country}</Text>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Cases</Text>
            <Text style={styles.statNumber}>{item.cases.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Active</Text>
            <Text style={styles.statNumber}>{item.active.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Recovered</Text>
            <Text style={[styles.statNumber, styles.recoveredText]}>
              {item.recovered.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Deaths</Text>
            <Text style={[styles.statNumber, styles.deathsText]}>
              {item.deaths.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.todayStats}>
          <Text style={styles.todayText}>
            Today: +{item.todayCases.toLocaleString()} cases, +{item.todayDeaths.toLocaleString()} deaths
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View style={styles.header}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Hi {username} 👋</Text>
        <Text style={styles.subGreeting}>Stay informed about COVID-19</Text>
      </View>

      {globalStats && (
        <>
          <View style={styles.globalStats}>
            <StatCard title="Total Cases" value={globalStats.cases} color="#1E1E1E" />
            <StatCard title="Recovered" value={globalStats.recovered} color="#1E1E1E" />
            <StatCard title="Deaths" value={globalStats.deaths} color="#1E1E1E" />
          </View>
          <View style={styles.pieChartContainer}>
            <PieChart
              data={[
                {
                  name: 'Active',
                  population: globalStats.active,
                  color: '#FFC107', // Yellow for active cases
                  legendFontColor: '#FFFFFF', // Updated to white
                  legendFontSize: 12,
                },
                {
                  name: 'Recovered',
                  population: globalStats.recovered,
                  color: '#4CAF50', // Green for recovered
                  legendFontColor: '#FFFFFF', // Updated to white
                  legendFontSize: 12,
                },
                {
                  name: 'Deaths',
                  population: globalStats.deaths,
                  color: '#D50000', // Red for deaths
                  legendFontColor: '#FFFFFF', // Updated to white
                  legendFontSize: 12,
                },
              ]}
              width={width - 40} // Adjust chart width
              height={220}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        </>
      )}

      {renderTop5Countries()}

      <TouchableOpacity
        style={styles.advancedStatsButton}
        onPress={() => navigation.navigate('AdvancedStatistics')}
      >
        <Text style={styles.advancedStatsButtonText}>View Advanced Statistics</Text>
      </TouchableOpacity>


      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search by country name..."
          placeholderTextColor="#88A398"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.listTitle}>Statistics by Country</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F9F7" />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D52" />
          <Text style={styles.loadingText}>Loading latest data...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <>
              <ListHeader />
              
            </>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{count}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Updated to black
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  greetingContainer: {
    backgroundColor: '#1E1E1E', // Darker background for cards
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#FF6F00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
  subGreeting: {
    fontSize: 16,
    color: '#FF6F00', // Accent color
    marginTop: 4,
  },
  globalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    backgroundColor: '#1E1E1E', // Darker background for cards
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#FF6F00', // Accent color
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF', // White text
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#FF6F00', // Accent color
    fontSize: 16,
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#1E1E1E', // Darker background for cards
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  flagContainer: {
    backgroundColor: '#000000', // Black for the flag container
    borderRadius: 8,
    padding: 4,
    marginRight: 12,
  },
  flag: {
    width: 32,
    height: 24,
    borderRadius: 4,
  },
  country: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // White text
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statItem: {
    width: '50%',
    padding: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#FF6F00', // Accent color
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // White text
  },
  recoveredText: {
    color: '#FF6F00', // Accent color
  },
  deathsText: {
    color: '#D50000', // Red for deaths
  },
  todayStats: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 111, 0, 0.1)', // Subtle border in orange
  },
  todayText: {
    fontSize: 12,
    color: '#FFFFFF', // White text
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF6F00', // Accent color
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#FF6F00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  floatingButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  top5Container: {
    padding: 16,
  },
  top5Item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  top5Rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    width: 20,
  },
  top5Country: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF', // White text
  },
  top5Cases: {
    fontSize: 14,
    color: '#FF6F00', // Accent color
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF', // White text
  },
  pieChartContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  searchBarContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#1E1E1E', // Darker background for the search bar
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF', // White text
    paddingLeft: 8,
  },
  advancedStatsButton: {
    backgroundColor: '#FF6F00', // Accent color
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  advancedStatsButtonText: {
    fontSize: 16,
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
});


export default HomeScreen;