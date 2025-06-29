import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Plus, ThumbsUp, Flag, X, Send } from 'lucide-react-native';

interface Question {
  id: string;
  author: string;
  question: string;
  category: string;
  likes: number;
  answered: boolean;
  timeAgo: string;
}

export default function CommunityScreen() {
  const [selectedTab, setSelectedTab] = useState('questions');
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  
  const tabs = [
    { id: 'questions', label: 'Q&A' },
    { id: 'discussions', label: 'Discussions' },
    { id: 'polls', label: 'Polls' }
  ];

  const categories = ['General', 'Housing', 'Transportation', 'Education', 'Environment'];

  const mockQuestions: Question[] = [
    {
      id: '1',
      author: 'Sarah M.',
      question: 'What is the city doing about the bike lane expansion on 14th Street?',
      category: 'Transportation',
      likes: 23,
      answered: true,
      timeAgo: '2h'
    },
    {
      id: '2',
      author: 'Mike R.',
      question: 'When will the new affordable housing lottery open in District 4?',
      category: 'Housing',
      likes: 18,
      answered: false,
      timeAgo: '4h'
    },
    {
      id: '3',
      author: 'Lisa K.',
      question: 'How can we get more funding for our local school\'s after-school programs?',
      category: 'Education',
      likes: 31,
      answered: true,
      timeAgo: '1d'
    }
  ];

  const handleSubmitQuestion = () => {
    if (newQuestion.trim()) {
      // Submit question logic here
      console.log('Submitting question:', newQuestion, 'Category:', selectedCategory);
      setNewQuestion('');
      setShowAskModal(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Transportation': '#1E40AF',
      'Housing': '#DC2626',
      'Education': '#059669',
      'Environment': '#7C3AED',
      'General': '#64748B'
    };
    return colors[category] || '#64748B';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
          <Text style={styles.subtitle}>
            Ask questions and engage with your representatives
          </Text>
        </View>

        {/* Ask Question CTA */}
        <TouchableOpacity 
          style={styles.askQuestionContainer}
          onPress={() => setShowAskModal(true)}
        >
          <MessageCircle size={24} color="#1E40AF" />
          <View style={styles.askQuestionContent}>
            <Text style={styles.askQuestionTitle}>Ask Your Representative</Text>
            <Text style={styles.askQuestionSubtitle}>
              Get direct answers from your elected officials
            </Text>
          </View>
          <Plus size={20} color="#1E40AF" />
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

        {/* Questions List */}
        {selectedTab === 'questions' && (
          <View>
            {mockQuestions.map((question) => (
              <View key={question.id} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <View 
                    style={[
                      styles.categoryBadge, 
                      { backgroundColor: getCategoryColor(question.category) }
                    ]}
                  >
                    <Text style={styles.categoryText}>{question.category}</Text>
                  </View>
                  <Text style={styles.timeAgo}>{question.timeAgo}</Text>
                </View>
                
                <Text style={styles.questionText}>{question.question}</Text>
                
                <View style={styles.questionFooter}>
                  <Text style={styles.author}>by {question.author}</Text>
                  
                  <View style={styles.questionActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <ThumbsUp size={16} color="#64748B" />
                      <Text style={styles.actionText}>{question.likes}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <Flag size={16} color="#64748B" />
                    </TouchableOpacity>
                    
                    {question.answered && (
                      <View style={styles.answeredBadge}>
                        <Text style={styles.answeredText}>Answered</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Coming Soon for other tabs */}
        {selectedTab !== 'questions' && (
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonTitle}>Coming Soon</Text>
            <Text style={styles.comingSoonText}>
              {selectedTab === 'discussions' ? 'Community discussions' : 'Local polls and surveys'} 
              {' '}will be available in the next update.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Ask Question Modal */}
      <Modal
        visible={showAskModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAskModal(false)}>
              <X size={24} color="#64748B" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Ask a Question</Text>
            <TouchableOpacity 
              onPress={handleSubmitQuestion}
              disabled={!newQuestion.trim()}
            >
              <Send 
                size={24} 
                color={newQuestion.trim() ? '#1E40AF' : '#CBD5E1'} 
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalLabel}>Category</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.categoryChipActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === category && styles.categoryChipTextActive
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.modalLabel}>Your Question</Text>
            <TextInput
              style={styles.questionInput}
              multiline
              numberOfLines={6}
              placeholder="What would you like to ask your representative?"
              value={newQuestion}
              onChangeText={setNewQuestion}
              textAlignVertical="top"
            />

            <Text style={styles.helpText}>
              Your question will be sent directly to your district representative. 
              Questions are public and help the entire community stay informed.
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  askQuestionContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  askQuestionContent: {
    flex: 1,
    marginLeft: 12,
  },
  askQuestionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 2,
  },
  askQuestionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
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
  questionCard: {
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    lineHeight: 24,
    marginBottom: 16,
  },
  questionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  questionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  answeredBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  answeredText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#166534',
  },
  comingSoon: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
    marginTop: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#1E40AF',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  questionInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    minHeight: 120,
    marginBottom: 16,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
});