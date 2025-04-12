'use client';
import { useState } from 'react';
import { CalculatorClient } from './generated/calculator/calculator_grpc_web_pb';
import { CalculateRequest } from './generated/calculator/calculator_pb';

// 创建 gRPC-Web 客户端，指定后端地址
const client = new CalculatorClient('http://localhost:8080', null, null);

export default function Home() {
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setResult(null);
    setError(null);

    const req = new CalculateRequest();
    req.setOperand1(parseFloat(operand1));
    req.setOperand2(parseFloat(operand2));
    req.setOperator(operator);

    client.calculate(req, {}, (err, response) => {
      setLoading(false);
      if (err) {
        console.error('请求失败:', err.message);
        setError('请求失败: ' + err.message);
        return;
      }
      const res = response.getResult();
      setResult(res);
    });
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1> gRPC-Web 简易计算器</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          step="any"
          value={operand1}
          onChange={(e) => setOperand1(e.target.value)}
          placeholder="第一个数"
          style={{ marginRight: '0.5rem' }}
        />
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        >
          <option value="+">+</option>
          <option value="-">−</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <input
          type="number"
          step="any"
          value={operand2}
          onChange={(e) => setOperand2(e.target.value)}
          placeholder="第二个数"
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleCalculate} disabled={loading}>
          {loading ? '计算中...' : '计算'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}> {error}</p>}
      {result !== null && <h2> 结果：{result}</h2>}
    </main>
  );
}
