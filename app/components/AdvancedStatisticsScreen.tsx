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
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
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
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
              color: '#FFC107',
              legendFontColor: '#333',
              legendFontSize: 12,
            },
            {
              name: 'Recovered',
              population: 15000,
              color: '#4CAF50',
              legendFontColor: '#333',
              legendFontSize: 12,
            },
            {
              name: 'Deaths',
              population: 2000,
              color: '#F44336',
              legendFontColor: '#333',
              legendFontSize: 12,
            },
          ]}
          width={width - 40}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9F7',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D52',
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
    color: '#2E7D52',
  },
  chart: {
    borderRadius: 16,
  },
});

export default AdvancedStatisticsScreen;
