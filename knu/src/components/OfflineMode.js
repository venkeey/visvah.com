import React, { useState, useEffect } from 'react';
import { useUserProgress } from '../contexts/UserProgressContext';
import { getChapterById } from '../data/bookData';
import styled from 'styled-components';

const OfflineContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  z-index: 1000;
  min-width: 400px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    min-width: 90vw;
    max-width: 90vw;
    padding: 16px;
  }
`;

const OfflineHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const OfflineTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 18px;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  }
`;

const OfflineDescription = styled.p`
  margin: 0 0 20px 0;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 14px;
  line-height: 1.5;
`;

const ChapterList = styled.div`
  margin-bottom: 20px;
`;

const ChapterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 8px;
  background: ${props => props.theme === 'dark' ? 'rgba(74, 85, 104, 0.3)' : 'rgba(226, 232, 240, 0.3)'};
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const ChapterInfo = styled.div`
  flex: 1;
`;

const ChapterTitle = styled.h4`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
`;

const ChapterDescription = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  line-height: 1.4;
`;

const ChapterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DownloadButton = styled.button`
  background: ${props => props.isDownloaded ? '#38a169' : '#3182ce'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.isDownloaded ? '#2f855a' : '#2c5282'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
    transform: none;
  }
`;

const DeleteButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #c53030;
    transform: translateY(-1px);
  }
`;

const StorageInfo = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(74, 85, 104, 0.3)' : 'rgba(226, 232, 240, 0.3)'};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
`;

const StorageTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
`;

const StorageDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
`;

const StorageBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${props => props.theme === 'dark' ? '#2d3748' : '#e2e8f0'};
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`;

const StorageFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const BulkActions = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const BulkButton = styled.button`
  background: ${props => props.variant === 'download' ? '#3182ce' : '#e53e3e'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.variant === 'download' ? '#2c5282' : '#c53030'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  margin-bottom: 12px;
  background: ${props => props.type === 'success' ? '#c6f6d5' : props.type === 'error' ? '#fed7d7' : '#bee3f8'};
  color: ${props => props.type === 'success' ? '#22543d' : props.type === 'error' ? '#c53030' : '#2a4365'};
  border: 1px solid ${props => props.type === 'success' ? '#9ae6b4' : props.type === 'error' ? '#feb2b2' : '#90cdf4'};
`;

const OfflineMode = ({ 
  theme = 'light', 
  isVisible = false, 
  onClose 
}) => {
  const { updateOfflineChapters, getOfflineChapters } = useUserProgress();
  const [downloadedChapters, setDownloadedChapters] = useState(new Set());
  const [downloading, setDownloading] = useState(new Set());
  const [statusMessage, setStatusMessage] = useState('');
  const [storageInfo, setStorageInfo] = useState({ used: 0, total: 0 });

  useEffect(() => {
    if (isVisible) {
      loadDownloadedChapters();
      calculateStorageUsage();
    }
  }, [isVisible]);

  const loadDownloadedChapters = () => {
    const offline = getOfflineChapters();
    setDownloadedChapters(new Set(offline));
  };

  const calculateStorageUsage = () => {
    try {
      // Calculate approximate storage usage
      const offline = getOfflineChapters();
      let totalSize = 0;
      
      offline.forEach(chapterId => {
        const chapter = getChapterById(chapterId);
        if (chapter) {
          // Rough estimate: 1 character = 1 byte
          totalSize += JSON.stringify(chapter).length;
        }
      });
      
      // Get available storage (rough estimate)
      const availableStorage = 50 * 1024 * 1024; // 50MB estimate
      const usedPercentage = (totalSize / availableStorage) * 100;
      
      setStorageInfo({
        used: totalSize,
        total: availableStorage,
        percentage: Math.min(usedPercentage, 100)
      });
    } catch (error) {
      console.error('Error calculating storage:', error);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadChapter = async (chapterId) => {
    setDownloading(prev => new Set(prev).add(chapterId));
    
    try {
      const chapter = getChapterById(chapterId);
      if (!chapter) {
        throw new Error('Chapter not found');
      }

      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store chapter data locally
      const chapterData = {
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        content: chapter.content,
        downloadedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`offline_chapter_${chapterId}`, JSON.stringify(chapterData));
      
      // Update context
      updateOfflineChapters(chapterId, 'add');
      
      // Update local state
      setDownloadedChapters(prev => new Set(prev).add(chapterId));
      setStatusMessage(`Chapter ${chapterId} downloaded successfully!`);
      
      // Clear message after 3 seconds
      setTimeout(() => setStatusMessage(''), 3000);
      
    } catch (error) {
      setStatusMessage(`Error downloading chapter ${chapterId}: ${error.message}`);
      setTimeout(() => setStatusMessage(''), 5000);
    } finally {
      setDownloading(prev => {
        const newSet = new Set(prev);
        newSet.delete(chapterId);
        return newSet;
      });
      calculateStorageUsage();
    }
  };

  const deleteChapter = (chapterId) => {
    try {
      // Remove from localStorage
      localStorage.removeItem(`offline_chapter_${chapterId}`);
      
      // Update context
      updateOfflineChapters(chapterId, 'remove');
      
      // Update local state
      setDownloadedChapters(prev => {
        const newSet = new Set(prev);
        newSet.delete(chapterId);
        return newSet;
      });
      
      setStatusMessage(`Chapter ${chapterId} deleted successfully!`);
      setTimeout(() => setStatusMessage(''), 3000);
      
    } catch (error) {
      setStatusMessage(`Error deleting chapter ${chapterId}: ${error.message}`);
      setTimeout(() => setStatusMessage(''), 5000);
    } finally {
      calculateStorageUsage();
    }
  };

  const downloadAllChapters = async () => {
    const chaptersToDownload = [];
    for (let i = 1; i <= 12; i++) {
      if (!downloadedChapters.has(i)) {
        chaptersToDownload.push(i);
      }
    }
    
    for (const chapterId of chaptersToDownload) {
      await downloadChapter(chapterId);
    }
  };

  const deleteAllChapters = () => {
    const confirmed = window.confirm('Are you sure you want to delete all downloaded chapters?');
    if (confirmed) {
      downloadedChapters.forEach(chapterId => {
        deleteChapter(chapterId);
      });
    }
  };

  if (!isVisible) return null;

  return (
    <OfflineContainer theme={theme}>
      <OfflineHeader>
        <OfflineTitle theme={theme}>Offline Mode</OfflineTitle>
        <CloseButton theme={theme} onClick={onClose}>
          ✕
        </CloseButton>
      </OfflineHeader>

      <OfflineDescription theme={theme}>
        Download chapters to read offline. Downloaded content will be available even without an internet connection.
      </OfflineDescription>

      {statusMessage && (
        <StatusMessage type={statusMessage.includes('Error') ? 'error' : 'success'}>
          {statusMessage}
        </StatusMessage>
      )}

      <StorageInfo theme={theme}>
        <StorageTitle theme={theme}>Storage Usage</StorageTitle>
        <StorageDetails theme={theme}>
          <span>{formatBytes(storageInfo.used)} used</span>
          <span>{formatBytes(storageInfo.total)} available</span>
        </StorageDetails>
        <StorageBar theme={theme}>
          <StorageFill percentage={storageInfo.percentage} />
        </StorageBar>
      </StorageInfo>

      <BulkActions>
        <BulkButton 
          variant="download"
          onClick={downloadAllChapters}
          disabled={downloading.size > 0}
        >
          📥 Download All Chapters
        </BulkButton>
        <BulkButton 
          variant="delete"
          onClick={deleteAllChapters}
          disabled={downloadedChapters.size === 0}
        >
          🗑️ Delete All
        </BulkButton>
      </BulkActions>

      <ChapterList>
        {Array.from({ length: 12 }, (_, i) => i + 1).map(chapterId => {
          const chapter = getChapterById(chapterId);
          const isDownloaded = downloadedChapters.has(chapterId);
          const isDownloading = downloading.has(chapterId);
          
          if (!chapter) return null;
          
          return (
            <ChapterItem key={chapterId} theme={theme}>
              <ChapterInfo>
                <ChapterTitle theme={theme}>
                  Chapter {chapterId}: {chapter.title}
                </ChapterTitle>
                <ChapterDescription theme={theme}>
                  {chapter.description}
                </ChapterDescription>
              </ChapterInfo>
              <ChapterActions>
                {isDownloaded ? (
                  <DeleteButton onClick={() => deleteChapter(chapterId)}>
                    🗑️ Delete
                  </DeleteButton>
                ) : (
                  <DownloadButton 
                    isDownloaded={isDownloaded}
                    onClick={() => downloadChapter(chapterId)}
                    disabled={isDownloading}
                  >
                    {isDownloading ? '⏳ Downloading...' : '📥 Download'}
                  </DownloadButton>
                )}
              </ChapterActions>
            </ChapterItem>
          );
        })}
      </ChapterList>
    </OfflineContainer>
  );
};

export default OfflineMode;
