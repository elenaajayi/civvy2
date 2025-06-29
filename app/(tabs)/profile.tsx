import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, Trophy, Star, Calendar, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';
import { mockUserProfile } from '@/data/mockData';

export default function ProfileScreen() {
  const user = mockUserProfile;
  
  const achievements = [
    { id: '1', name: 'First Vote', icon: '🗳️', description: 'Cast your first vote', earned: true },
    { id: '2', name: 'Quiz Master', icon: '🧠', description: 'Complete 5 candidate quizzes', earned: true },
    { id: '3', name: 'Community Champion', icon: '🏆', description: 'Ask 10 questions', earned: true },
    { id: '4', name: 'Civic Streak', icon: '🔥', description: '7-day engagement streak', earned: true },
    { id: '5', name: 'Democracy Defender', icon: '🛡️', description: 'Report misinformation', earned: false },
    { id: '6', name: 'Local Leader', icon: '⭐', description: 'Create a micro election', earned: false },
  ];

  const menuItems = [
    { icon: Settings, label: 'Account Settings', onPress: () => {} },
    { icon: Bell, label: 'Notifications', onPress: () => {} },
    { icon: Shield, label: 'Privacy & Security', onPress: () => {} },
    { icon: HelpCircle, label: 'Help & Support', onPress: () => {} },
    { icon: LogOut, label: 'Sign Out', onPress: () => {}, danger: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <User size={32} color="#1E40AF" />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#64748B" />
            <Text style={styles.locationText}>{user.district}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Trophy size={24} color="#D97706" />
            <Text style={styles.statValue}>{user.xp}</Text>
            <Text style={styles.statLabel}>XP Points</Text>
          </View>
          <View style={styles.statCard}>
            <Star size={24} color="#1E40AF" />
            <Text style={styles.statValue}>L{user.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={24} color="#DC2626" />
            <Text style={styles.statValue}>{user.streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.progressContainer}>
          <ProgressBar 
            current={user.xp % 200} 
            total={200} 
            label={`Level ${user.level} Progress`}
            color="#1E40AF"
          />
          <Text style={styles.progressText}>
            {200 - (user.xp % 200)} XP until Level {user.level + 1}
          </Text>
        </View>

        {/* MetroPoints */}
        <View style={styles.metroPointsContainer}>
          <View style={styles.metroPointsHeader}>
            <Text style={styles.metroPointsTitle}>MetroPoints</Text>
            <Text style={styles.metroPointsValue}>{user.metroPoints}</Text>
          </View>
          <Text style={styles.metroPointsDescription}>
            Earn MetroPoints by engaging with civic activities. Use them for exclusive 
            content and early access to new features.
          </Text>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  !achievement.earned && styles.achievementCardLocked
                ]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[
                  styles.achievementName,
                  !achievement.earned && styles.achievementNameLocked
                ]}>
                  {achievement.name}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.earned && styles.achievementDescriptionLocked
                ]}>
                  {achievement.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <item.icon 
                size={20} 
                color={item.danger ? '#DC2626' : '#64748B'} 
              />
              <Text style={[
                styles.menuItemText,
                item.danger && styles.menuItemTextDanger
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
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
  progressContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
  },
  metroPointsContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#059669',
    borderRadius: 12,
    padding: 20,
  },
  metroPointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metroPointsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  metroPointsValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  metroPointsDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1FAE5',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '48%',
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
  achievementCardLocked: {
    backgroundColor: '#F8FAFC',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementNameLocked: {
    color: '#94A3B8',
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  achievementDescriptionLocked: {
    color: '#CBD5E1',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    marginLeft: 12,
  },
  menuItemTextDanger: {
    color: '#DC2626',
  },
});