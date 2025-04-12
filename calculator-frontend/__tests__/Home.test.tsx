import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../app/page';

jest.mock('../app/generated/calculator/calculator_grpc_web_pb', () => {
  return {
    CalculatorClient: jest.fn().mockImplementation(() => ({
      calculate: (req, metadata, callback) => {
        callback(null, {
          getResult: () => 999,
        });
      },
    })),
    CalculateRequest: jest.fn().mockImplementation(() => ({
      setOperand1: jest.fn(),
      setOperand2: jest.fn(),
      setOperator: jest.fn(),
    })),
  };
});

describe('Calculator UI', () => {
  it('displays calculation result', async () => {
    render(<Home />);
    
    // 这里要确保 placeholder 和页面代码一致
    fireEvent.change(screen.getByPlaceholderText('第一个数'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByPlaceholderText('第二个数'), {
      target: { value: '2' },
    });

    fireEvent.click(screen.getByText('计算'));

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('999'))).toBeInTheDocument();
    });
  });
});
