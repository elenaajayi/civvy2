import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, MapPin, Users, Plus } from 'lucide-react-native';
import { mockElections } from '@/data/mockData';

export default function ElectionsScreen() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  
  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'micro', label: 'Micro Elections' },
    { id: 'past', label: 'Past' }
  ];

  const filteredElections = mockElections.filter(election => {
    if (selectedTab === 'upcoming') return election.status === 'upcoming';
    if (selectedTab === 'micro') return election.type === 'micro';
    if (selectedTab === 'past') return election.status === 'completed';
    return true;
  });

  const getElectionTypeColor = (type: string) => {
    switch (type) {
      case 'general': return '#1E40AF';
      case 'primary': return '#7C3AED';
      case 'micro': return '#059669';
      default: return '#64748B';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Elections</Text>
          <Text style={styles.subtitle}>
            Stay informed about all elections in your area
          </Text>
        </View>

        {/* Create Micro Election CTA */}
        <TouchableOpacity style={styles.createElectionContainer}>
          <View style={styles.createElectionContent}>
            <Plus size={24} color="#059669" />
            <View style={styles.createElectionText}>
              <Text style={styles.createElectionTitle}>Create Micro Election</Text>
              <Text style={styles.createElectionSubtitle}>
                Organize voting for your community, school, or organization
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                selectedTab === tab.id && styles.tabActive
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.tabTextActive
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Elections List */}
        {filteredElections.map((election) => (
          <View key={election.id} style={styles.electionCard}>
            <View style={styles.electionHeader}>
              <View 
                style={[
                  styles.electionTypeBadge, 
                  { backgroundColor: getElectionTypeColor(election.type) }
                ]}
              >
                <Text style={styles.electionTypeText}>
                  {election.type.toUpperCase()}
                </Text>
              </View>
              <View style={styles.electionDate}>
                <Calendar size={16} color="#64748B" />
                <Text style={styles.electionDateText}>
                  {formatDate(election.date)}
                </Text>
              </View>
            </View>
            
            <Text style={styles.electionTitle}>{election.title}</Text>
            <Text style={styles.electionDescription}>{election.description}</Text>
            
            {election.candidates && (
              <View style={styles.candidatesInfo}>
                <Users size={16} color="#64748B" />
                <Text style={styles.candidatesText}>
                  {election.candidates.length} candidates
                </Text>
              </View>
            )}
            
            <TouchableOpacity style={styles.viewElectionButton}>
              <Text style={styles.viewElectionButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Empty State */}
        {filteredElections.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No elections found</Text>
            <Text style={styles.emptySubtitle}>
              {selectedTab === 'micro' 
                ? 'Create the first micro election in your community' 
                : 'Check back later for upcoming elections'
              }
            </Text>
          </View>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  createElectionContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  createElectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createElectionText: {
    marginLeft: 12,
    flex: 1,
  },
  createElectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#059669',
    marginBottom: 2,
  },
  createElectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#065F46',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#1E40AF',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#1E40AF',
  },
  electionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  electionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  electionTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  electionTypeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  electionDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  electionDateText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginLeft: 4,
  },
  electionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  electionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  candidatesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  candidatesText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginLeft: 4,
  },
  viewElectionButton: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewElectionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
});