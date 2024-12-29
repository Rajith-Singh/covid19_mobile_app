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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useCount } from '../context/CountContext';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [globalStats, setGlobalStats] = useState<any>(null);
  const { count, incrementCount } = useCount();

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
        <View style={styles.globalStats}>
          <StatCard
            title="Total Cases"
            value={globalStats.cases}
            color="#FFF9EB"
          />
          <StatCard
            title="Recovered"
            value={globalStats.recovered}
            color="#F0F9F4"
          />
          <StatCard
            title="Deaths"
            value={globalStats.deaths}
            color="#FFF1F0"
          />
        </View>
      )}
      
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
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListHeaderComponent={ListHeader}
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
    backgroundColor: '#F5F9F7',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  greetingContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#2E7D52',
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
    color: '#2E7D52',
  },
  subGreeting: {
    fontSize: 16,
    color: '#88A398',
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
    color: '#2E7D52',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#88A398',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D52',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#88A398',
    fontSize: 16,
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#F5F9F7',
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
    color: '#2E7D52',
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
    color: '#88A398',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D52',
  },
  recoveredText: {
    color: '#2E7D52',
  },
  deathsText: {
    color: '#FF4545',
  },
  todayStats: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(46, 125, 82, 0.1)',
  },
  todayText: {
    fontSize: 12,
    color: '#88A398',
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2E7D52',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#2E7D52',
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;