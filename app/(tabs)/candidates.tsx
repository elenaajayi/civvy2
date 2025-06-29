import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, RotateCcw } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import CandidateClip from '@/components/CandidateClip';

interface Candidate {
  id: number;
  name: string;
  position: string;
  district: string;
  party: string;
  videoUrl: string;
  issues: string[];
  matchPercentage?: number;
  hasContradictions?: boolean;
}

export default function CandidatesScreen() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const { issue } = useLocalSearchParams<{ issue?: string }>();
  
  const filters = ['All', 'City Council', 'State Assembly', 'Congress'];

  // Fetch candidates from API
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiBase = process.env.EXPO_PUBLIC_API || 'http://localhost:3000';
      const response = await fetch(`${apiBase}/candidates`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      console.error('Failed to fetch candidates:', err);
      setError('Failed to load candidates. Please try again.');
      
      // Fallback to mock data for demo purposes
      setCandidates([
        {
          id: 1,
          name: 'Maria Rodriguez',
          position: 'City Council District 4',
          district: 'Manhattan District 4',
          party: 'Democratic',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          issues: ['Housing', 'Education', 'Transportation'],
          matchPercentage: 87,
          hasContradictions: false,
        },
        {
          id: 2,
          name: 'James Chen',
          position: 'City Council District 4',
          district: 'Manhattan District 4',
          party: 'Democratic',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          issues: ['Public Safety', 'Small Business', 'Transportation'],
          matchPercentage: 62,
          hasContradictions: true,
        },
        {
          id: 3,
          name: 'Sarah Thompson',
          position: 'State Assembly District 75',
          district: 'Brooklyn District 75',
          party: 'Democratic',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          issues: ['Environment', 'Climate Action', 'Green Jobs'],
          matchPercentage: 91,
          hasContradictions: false,
        },
        {
          id: 4,
          name: 'Michael Park',
          position: 'Congress District 12',
          district: 'Manhattan District 12',
          party: 'Democratic',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          issues: ['Healthcare', 'Economy', 'Housing'],
          matchPercentage: 74,
          hasContradictions: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter candidates based on search, position filter, and issue query param
  const filteredCandidates = candidates.filter(candidate => {
    // Search filter
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.issues.some(candidateIssue => 
                           candidateIssue.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    // Position filter
    const matchesFilter = selectedFilter === 'All' || 
                         candidate.position.toLowerCase().includes(selectedFilter.toLowerCase());
    
    // Issue query parameter filter
    const matchesIssue = !issue || 
                        candidate.issues.some(candidateIssue => 
                          candidateIssue.toLowerCase().includes(issue.toLowerCase())
                        );
    
    return matchesSearch && matchesFilter && matchesIssue;
  });

  const handleTakeQuiz = () => {
    // Navigate to quiz screen
    console.log('Take candidate matching quiz');
  };

  const handleRetry = () => {
    fetchCandidates();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E40AF" />
          <Text style={styles.loadingText}>Loading candidates...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Find Your Candidates</Text>
          <Text style={styles.subtitle}>
            Discover and compare candidates in your district
          </Text>
          {issue && (
            <View style={styles.issueFilter}>
              <Text style={styles.issueFilterText}>
                Filtered by: {issue}
              </Text>
            </View>
          )}
        </View>

        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

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
              placeholder="Search candidates or issues..."
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
            {filteredCandidates.length} Candidate{filteredCandidates.length !== 1 ? 's' : ''} Found
          </Text>
          <TouchableOpacity style={styles.retakeQuizButton}>
            <RotateCcw size={16} color="#1E40AF" />
            <Text style={styles.retakeQuizText}>Retake Quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Candidates List - Using CandidateClip */}
        {filteredCandidates.map((candidate) => (
          <CandidateClip
            key={candidate.id}
            id={candidate.id}
            name={candidate.name}
            videoUrl={candidate.videoUrl}
            issues={candidate.issues}
          />
        ))}

        {/* Empty State */}
        {filteredCandidates.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No candidates found</Text>
            <Text style={styles.emptySubtitle}>
              {issue 
                ? `No candidates found for "${issue}". Try adjusting your search or filters.`
                : 'Try adjusting your search or filters'
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginTop: 16,
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
  issueFilter: {
    marginTop: 12,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  issueFilterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1E40AF',
  },
  errorContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#DC2626',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
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
    lineHeight: 20,
  },
});