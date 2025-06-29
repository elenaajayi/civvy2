import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, RotateCcw } from 'lucide-react-native';
import CandidateCard from '@/components/CandidateCard';
import { mockCandidates } from '@/data/mockData';

export default function CandidatesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const filters = ['All', 'City Council', 'State Assembly', 'Congress'];
  
  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'All' || 
                         candidate.position.toLowerCase().includes(selectedFilter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  const handleTakeQuiz = () => {
    // Navigate to quiz screen
    console.log('Take candidate matching quiz');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Find Your Candidates</Text>
          <Text style={styles.subtitle}>
            Discover and compare candidates in your district
          </Text>
        </View>

        {/* Quiz CTA */}
        <View style={styles.quizContainer}>
          <View style={styles.quizContent}>
            <Text style={styles.quizTitle}>Take the Candidate Quiz</Text>
            <Text style={styles.quizSubtitle}>
              Answer 5 questions to find your perfect match
            </Text>
          </View>
          <TouchableOpacity style={styles.quizButton} onPress={handleTakeQuiz}>
            <Text style={styles.quizButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search candidates..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#94A3B8"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Position Filters */}
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

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {filteredCandidates.length} Candidates Found
          </Text>
          <TouchableOpacity style={styles.retakeQuizButton}>
            <RotateCcw size={16} color="#1E40AF" />
            <Text style={styles.retakeQuizText}>Retake Quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Candidates List */}
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            name={candidate.name}
            position={candidate.position}
            district={candidate.district}
            party={candidate.party}
            imageUrl={candidate.imageUrl}
            matchPercentage={candidate.matchPercentage}
            hasContradictions={candidate.hasContradictions}
            onPress={() => {
              // Navigate to candidate details
              console.log('Navigate to candidate:', candidate.id);
            }}
          />
        ))}

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No candidates found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
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
  quizContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizContent: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quizSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CBD5E1',
  },
  quizButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  quizButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  retakeQuizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  retakeQuizText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
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