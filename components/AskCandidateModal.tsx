import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Send } from 'lucide-react-native';

interface AskCandidateModalProps {
  candidateId: number;
  candidateName: string;
  visible: boolean;
  onClose: () => void;
}

export default function AskCandidateModal({
  candidateId,
  candidateName,
  visible,
  onClose,
}: AskCandidateModalProps) {
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['General', 'Housing', 'Transportation', 'Education', 'Environment', 'Economy'];

  const handleSubmit = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiBase = process.env.EXPO_PUBLIC_API || 'http://localhost:3000';
      const response = await fetch(`${apiBase}/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateId,
          question: question.trim(),
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Alert.alert(
        'Question Submitted',
        `Your question has been sent to ${candidateName}. You'll be notified when they respond.`,
        [{ text: 'OK', onPress: onClose }]
      );

      setQuestion('');
      setSelectedCategory('General');
    } catch (error) {
      console.error('Question submission error:', error);
      Alert.alert('Error', 'Failed to submit your question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setQuestion('');
    setSelectedCategory('General');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#64748B" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Ask {candidateName}</Text>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!question.trim() || isSubmitting}
              style={styles.submitButton}
            >
              <Send
                size={24}
                color={question.trim() && !isSubmitting ? '#0A84FF' : '#CBD5E1'}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Category Selection */}
            <Text style={styles.sectionLabel}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
              contentContainerStyle={styles.categoriesContent}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.categoryChipActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === category && styles.categoryChipTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Question Input */}
            <Text style={styles.sectionLabel}>Your Question</Text>
            <TextInput
              style={styles.questionInput}
              multiline
              numberOfLines={6}
              placeholder={`What would you like to ask ${candidateName}?`}
              placeholderTextColor="#94A3B8"
              value={question}
              onChangeText={setQuestion}
              textAlignVertical="top"
              maxLength={500}
            />

            <Text style={styles.characterCount}>
              {question.length}/500 characters
            </Text>

            {/* Guidelines */}
            <View style={styles.guidelinesContainer}>
              <Text style={styles.guidelinesTitle}>Question Guidelines</Text>
              <Text style={styles.guidelinesText}>
                • Keep questions respectful and constructive{'\n'}
                • Focus on policy positions and local issues{'\n'}
                • Questions are public and help the entire community{'\n'}
                • You'll be notified when the candidate responds
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    flex: 1,
    textAlign: 'center',
  },
  submitButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
    marginTop: 16,
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoriesContent: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryChipActive: {
    backgroundColor: '#0A84FF',
    borderColor: '#0A84FF',
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
    backgroundColor: '#FAFAFA',
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 16,
  },
  guidelinesContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  guidelinesTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  guidelinesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
});