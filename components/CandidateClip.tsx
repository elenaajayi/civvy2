import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Play, Pause } from 'lucide-react-native';

interface CandidateClipProps {
  id: number;
  name: string;
  videoUrl: string;
  issues: string[];
}

export default function CandidateClip({ id, name, videoUrl, issues }: CandidateClipProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAskModal, setShowAskModal] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const videoRef = useRef<Video>(null);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Video playback error:', error);
    }
  };

  const handleReaction = async (type: 'like' | 'dislike') => {
    if (isReacting) return;
    
    setIsReacting(true);
    
    try {
      const apiBase = process.env.EXPO_PUBLIC_API || 'http://localhost:3000';
      const response = await fetch(`${apiBase}/api/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateId: id,
          type: type,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Show success feedback
      Alert.alert('Reaction Recorded', `Your ${type} has been recorded!`);
    } catch (error) {
      console.error('Reaction error:', error);
      Alert.alert('Error', 'Failed to record your reaction. Please try again.');
    } finally {
      setIsReacting(false);
    }
  };

  const handleAskCandidate = () => {
    setShowAskModal(true);
  };

  return (
    <View style={styles.container}>
      {/* Video Container */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: videoUrl }}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          shouldPlay={false}
          isLooping={false}
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              setIsPlaying(status.isPlaying || false);
            }
          }}
        />
        
        {/* Play/Pause Overlay */}
        <TouchableOpacity 
          style={styles.playButton} 
          onPress={handlePlayPause}
          activeOpacity={0.8}
        >
          {isPlaying ? (
            <Pause size={32} color="#FFFFFF" />
          ) : (
            <Play size={32} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Candidate Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.candidateName}>{name}</Text>
        
        {/* Issue Tags */}
        <View style={styles.issuesContainer}>
          {issues.map((issue, index) => (
            <View key={index} style={styles.issueBadge}>
              <Text style={styles.issueText}>{issue}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Reaction Row */}
      <View style={styles.reactionRow}>
        <TouchableOpacity
          style={[styles.reactionButton, styles.likeButton]}
          onPress={() => handleReaction('like')}
          disabled={isReacting}
          activeOpacity={0.7}
        >
          <Text style={styles.reactionEmoji}>👍</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.reactionButton, styles.dislikeButton]}
          onPress={() => handleReaction('dislike')}
          disabled={isReacting}
          activeOpacity={0.7}
        >
          <Text style={styles.reactionEmoji}>👎</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.reactionButton, styles.askButton]}
          onPress={handleAskCandidate}
          activeOpacity={0.7}
        >
          <Text style={styles.askButtonText}>Ask Candidate</Text>
        </TouchableOpacity>
      </View>

      {/* Ask Candidate Modal */}
      {showAskModal && (
        <AskCandidateModal
          candidateId={id}
          candidateName={name}
          visible={showAskModal}
          onClose={() => setShowAskModal(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  videoContainer: {
    height: 200,
    position: 'relative',
    backgroundColor: '#000000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 16,
  },
  candidateName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  issuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  issueBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  issueText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  reactionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  reactionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  likeButton: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  dislikeButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  askButton: {
    backgroundColor: '#0A84FF',
    flex: 1,
  },
  reactionEmoji: {
    fontSize: 20,
  },
  askButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});