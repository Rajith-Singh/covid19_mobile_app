import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const AdvancedStatisticsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Advanced Statistics</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Cases Over Time</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data: [500, 1000, 3000, 7000, 10000, 15000] }],
          }}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#000000', // Black background
            backgroundGradientFrom: '#1E1E1E', // Dark gradient
            backgroundGradientTo: '#1E1E1E', // Dark gradient
            color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`, // Orange lines
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White labels
          }}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Recovery vs Deaths Progress</Text>
        <ProgressChart
          data={{
            labels: ['Recovered', 'Deaths'], // Labels
            data: [0.8, 0.2], // Normalized values between 0 and 1
          }}
          width={width - 40}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundColor: '#000000', // Black background
            backgroundGradientFrom: '#1E1E1E', // Dark gradient
            backgroundGradientTo: '#1E1E1E', // Dark gradient
            color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`, // Orange for progress
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White labels
          }}
          hideLegend={false}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Prediction: Next Month's Cases</Text>
        <PieChart
          data={[
            {
              name: 'Active',
              population: 5000,
              color: '#FF6F00', // Orange for active
              legendFontColor: '#FFFFFF', // White for legend text
              legendFontSize: 12,
            },
            {
              name: 'Recovered',
              population: 15000,
              color: '#4CAF50', // Green for recovered
              legendFontColor: '#FFFFFF', // White for legend text
              legendFontSize: 12,
            },
            {
              name: 'Deaths',
              population: 2000,
              color: '#D50000', // Red for deaths
              legendFontColor: '#FFFFFF', // White for legend text
              legendFontSize: 12,
            },
          ]}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#000000', // Black background
            backgroundGradientFrom: '#1E1E1E', // Dark gradient
            backgroundGradientTo: '#1E1E1E', // Dark gradient
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White lines
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF', // White text
  },
  chart: {
    borderRadius: 16,
  },
});

export default AdvancedStatisticsScreen;
