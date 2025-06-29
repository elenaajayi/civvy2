import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Bell, Trophy, Flame } from 'lucide-react-native';
import CivicCard from '@/components/CivicCard';
import ProgressBar from '@/components/ProgressBar';
import { mockCivicEvents, mockUserProfile } from '@/data/mockData';

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const user = mockUserProfile;
  
  const filters = ['All', 'Transportation', 'Housing', 'Education', 'Elections'];
  
  const filteredEvents = selectedFilter === 'All' 
    ? mockCivicEvents 
    : mockCivicEvents.filter(event => event.category === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#1E40AF" />
          <Text style={styles.locationText}>{user.district}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Trophy size={24} color="#D97706" />
            <Text style={styles.statValue}>{user.xp}</Text>
            <Text style={styles.statLabel}>XP Points</Text>
          </View>
          <View style={styles.statCard}>
            <Flame size={24} color="#DC2626" />
            <Text style={styles.statValue}>{user.streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.levelText}>L{user.level}</Text>
            <Text style={styles.statValue}>{user.metroPoints}</Text>
            <Text style={styles.statLabel}>Metro Points</Text>
          </View>
        </View>

        {/* Progress to Next Level */}
        <View style={styles.progressContainer}>
          <ProgressBar 
            current={user.xp % 200} 
            total={200} 
            label={`Level ${user.level} Progress`}
            color="#1E40AF"
          />
        </View>

        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Civic Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Civic Feed</Text>
          <Text style={styles.sectionSubtitle}>
            Stay engaged with what matters in your district
          </Text>
        </View>

        {filteredEvents.map((event) => (
          <CivicCard
            key={event.id}
            title={event.title}
            subtitle={event.subtitle}
            category={event.category}
            urgency={event.urgency}
            xpReward={event.xpReward}
            onPress={() => {
              // Handle navigation to event details
              console.log('Navigate to event:', event.id);
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  notificationButton: {
    padding: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1E40AF',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 4,
  },
  levelText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E40AF',
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: '#1E40AF',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
});