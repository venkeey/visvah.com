import styled from 'styled-components';

export const MoodleContainer = styled.div`
  background: ${p => p.theme === 'dark' ? '#1a202c' : '#f7fafc'};
  min-height: 100vh;
  color: ${p => p.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const MoodleHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const MoodleTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
`;

export const MoodleSubtitle = styled.p`
  margin: 10px 0 0 0;
  opacity: 0.9;
  font-size: 1.1rem;
`;

export const MoodleContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

export const Sidebar = styled.div`
  background: ${p => p.theme === 'dark' ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 20px;
  height: fit-content;
  border: 1px solid ${p => p.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

export const SidebarSection = styled.div`
  margin-bottom: 25px;
  h3 {
    color: ${p => p.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    margin-bottom: 15px;
    font-size: 1.1rem;
    border-bottom: 2px solid ${p => p.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
    padding-bottom: 8px;
  }
`;

export const MenuItem = styled.div`
  padding: 12px 15px;
  margin: 8px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${p => p.active ? (p.theme === 'dark' ? '#2c5282' : '#ebf8ff') : 'transparent'};
  color: ${p => p.active ? (p.theme === 'dark' ? '#63b3ed' : '#3182ce') : 'inherit'};
  border-left: 3px solid ${p => p.active ? (p.theme === 'dark' ? '#63b3ed' : '#3182ce') : 'transparent'};
  &:hover {
    background: ${p => p.theme === 'dark' ? '#2d3748' : '#f7fafc'};
    transform: translateX(5px);
  }
`;

export const MainContent = styled.div`
  background: ${p => p.theme === 'dark' ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid ${p => p.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

export const ContentSection = styled.div`
  margin-bottom: 30px;
  h2 {
    color: ${p => p.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    margin-bottom: 20px;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const H5PContainer = styled.div`
  background: ${p => p.theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(247, 250, 252, 0.9)'};
  border: 2px solid ${p => p.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 12px;
  padding: 25px;
  margin: 20px 0;
  position: relative;
  &::before {
    content: '🎮 H5P Interactive Content';
    position: absolute;
    top: -12px;
    left: 20px;
    background: ${p => p.theme === 'dark' ? '#2d3748' : '#f7fafc'};
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${p => p.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: ${p => p.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  width: ${p => p.progress}%;
  transition: width 0.5s ease;
  border-radius: 10px;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 5px;
`;

export const DiscussionThread = styled.div`
  background: ${p => p.theme === 'dark' ? 'rgba(55, 65, 81, 0.6)' : 'rgba(247, 250, 252, 0.8)'};
  border: 1px solid ${p => p.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 10px;
  padding: 20px;
  margin: 15px 0;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
`;

export const DiscussionContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const DiscussionText = styled.div`
  flex: 1;
  .author { font-weight: 600; color: ${p => p.theme === 'dark' ? '#63b3ed' : '#3182ce'}; margin-bottom: 5px; }
  .timestamp { font-size: 0.8rem; color: ${p => p.theme === 'dark' ? '#a0aec0' : '#718096'}; margin-bottom: 10px; }
  .message { line-height: 1.6; }
`;

export const AssignmentCard = styled.div`
  background: ${p => p.theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(247, 250, 252, 0.9)'};
  border: 2px solid ${p => p.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 12px;
  padding: 25px;
  margin: 20px 0;
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3); }
`;
