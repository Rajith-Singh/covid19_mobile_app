import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type GetStartedScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GetStarted'>;
};

const GetStartedScreen: React.FC<GetStartedScreenProps> = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../assets/covid-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Stay Updated with{'\n'}COVID-19 Stats</Text>
          <Text style={styles.subtitle}>
            Get real-time updates and statistics about COVID-19 cases worldwide.
            Stay informed and stay safe.
          </Text>
        </Animated.View>
      </View>

      <View style={styles.featuresContainer}>
        <FeatureItem
          icon="📊"
          title="Real-time Statistics"
          description="Access up-to-date COVID-19 statistics from reliable sources"
        />
        <FeatureItem
          icon="🌍"
          title="Global Coverage"
          description="Track cases, recoveries, and vaccinations worldwide"
        />
        <FeatureItem
          icon="🔔"
          title="Important Updates"
          description="Receive notifications about significant changes in your area"
        />
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type FeatureItemProps = {
  icon: string;
  title: string;
  description: string;
};

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9F7',
  },
  topSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D52',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#88A398',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  featuresContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D52',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#88A398',
    lineHeight: 20,
  },
  bottomSection: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  button: {
    backgroundColor: '#2E7D52',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default GetStartedScreen;

