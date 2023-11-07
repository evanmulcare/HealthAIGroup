import { render } from '@testing-library/react';
import ChatbotView from './ChatbotView';

test('renders ChatbotView component', () => {
  render(<ChatbotView messages={[]} thinking={false} handleSend={() => {}} currentUserData={{ profileimg: 'image.jpg' }} />);
});


