import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, Star, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface CandidateCardProps {
  name: string;
  position: string;
  district: string;
  party: string;
  imageUrl: string;
  matchPercentage: number;
  hasContradictions?: boolean;
  onPress?: () => void;
}

export default function CandidateCard({ 
  name, 
  position, 
  district, 
  party, 
  imageUrl, 
  matchPercentage, 
  hasContradictions = false,
  onPress 
}: CandidateCardProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return '#059669';
    if (percentage >= 60) return '#D97706';
    return '#DC2626';
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          {hasContradictions && (
            <AlertTriangle size={16} color="#DC2626" />
          )}
        </View>
        
        <Text style={styles.position}>{position}</Text>
        
        <View style={styles.location}>
          <MapPin size={14} color="#64748B" />
          <Text style={styles.district}>{district} • {party}</Text>
        </View>
        
        <View style={styles.matchContainer}>
          <View style={styles.matchBar}>
            <View 
              style={[
                styles.matchFill, 
                { 
                  width: `${matchPercentage}%`,
                  backgroundColor: getMatchColor(matchPercentage)
                }
              ]} 
            />
          </View>
          <Text style={[styles.matchText, { color: getMatchColor(matchPercentage) }]}>
            {matchPercentage}% match
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  position: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1E40AF',
    marginBottom: 4,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  district: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginLeft: 4,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginRight: 8,
  },
  matchFill: {
    height: '100%',
    borderRadius: 3,
  },
  matchText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
});