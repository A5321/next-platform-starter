// components/TestQuiz.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { quizQuestions, testRecommendations, testMeta } from './quizData';

export default function TestQuiz() {
  const [step, setStep] = useState('start'); // 'start', 'q1', 'q2-*', 'results'
  const [q1Answer, setQ1Answer] = useState(null);
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setStep('q1');
  };

  const handleQ1Answer = (option) => {
    setQ1Answer(option.id);
    setStep(option.next);
  };

  const handleQ2Answer = (option) => {
    const recommendation = testRecommendations[option.result];
    setResult({
      ...recommendation,
      resultId: option.result,
    });
    setStep('results');
  };

  const handleReset = () => {
    setStep('start');
    setQ1Answer(null);
    setResult(null);
  };

  // Styles
  const containerStyle = {
    background: '#ffffff',
    border: '1px solid rgba(21,101,192,0.12)',
    borderRadius: '24px',
    padding: '32px',
    maxWidth: '640px',
    margin: '0 auto',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.2,
    margin: '0 0 12px',
    color: '#10131a',
  };

  const subtitleStyle = {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#465065',
    margin: '0 0 28px',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '16px 20px',
    margin: '0 0 12px',
    background: '#ffffff',
    border: '2px solid rgba(21,101,192,0.2)',
    borderRadius: '12px',
    color: '#10131a',
    fontSize: '16px',
    lineHeight: 1.5,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const primaryButtonStyle = {
    display: 'inline-block',
    padding: '14px 28px',
    background: '#1565C0',
    color: '#ffffff',
    border: 'none',
    borderRadius: '999px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const questionStyle = {
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: 1.3,
    margin: '0 0 24px',
    color: '#10131a',
  };

  const resultCardStyle = {
    background: '#f0f9ff',
    border: '1px solid rgba(21,101,192,0.2)',
    borderRadius: '16px',
    padding: '20px',
    margin: '0 0 16px',
  };

  const resultTitleStyle = {
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#1565C0',
    margin: '0 0 8px',
  };

  const resultTestStyle = {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: 1.3,
    margin: '0 0 8px',
    color: '#10131a',
  };

  const resultDescStyle = {
    fontSize: '15px',
    lineHeight: 1.6,
    color: '#334155',
    margin: '0 0 16px',
  };

  const secondaryCardStyle = {
    background: '#ffffff',
    border: '1px solid rgba(16,19,26,0.08)',
    borderRadius: '12px',
    padding: '16px',
    margin: '0 0 12px',
  };

  const secondaryTitleStyle = {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: 1.4,
    margin: '0 0 4px',
    color: '#10131a',
  };

  const secondaryDescStyle = {
    fontSize: '14px',
    lineHeight: 1.5,
    color: '#465065',
    margin: 0,
  };

  const linkButtonStyle = {
    display: 'inline-block',
    padding: '10px 18px',
    background: '#10131a',
    color: '#ffffff',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 700,
    textDecoration: 'none',
    marginTop: '12px',
  };

  const resetButtonStyle = {
    background: 'transparent',
    border: '1px solid rgba(16,19,26,0.2)',
    color: '#10131a',
    padding: '10px 18px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '24px',
  };

  // START SCREEN
  if (step === 'start') {
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>Find your test in 2 questions</h2>
        <p style={subtitleStyle}>
          Not sure where to start? Answer two quick questions and we'll recommend the most relevant tests for your situation.
        </p>
        <button style={primaryButtonStyle} onClick={handleStart}>
          Start quiz
        </button>
      </div>
    );
  }

  // QUESTION 1
  if (step === 'q1') {
    const question = quizQuestions.q1;
    return (
      <div style={containerStyle}>
        <h3 style={questionStyle}>{question.question}</h3>
        {question.options.map((option) => (
          <button
            key={option.id}
            style={buttonStyle}
            onClick={() => handleQ1Answer(option)}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#1565C0';
              e.target.style.background = '#f0f9ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(21,101,192,0.2)';
              e.target.style.background = '#ffffff';
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
    );
  }

  // QUESTION 2
  if (step.startsWith('q2-')) {
    const question = quizQuestions[step];
    return (
      <div style={containerStyle}>
        <h3 style={questionStyle}>{question.question}</h3>
        {question.options.map((option) => (
          <button
            key={option.id}
            style={buttonStyle}
            onClick={() => handleQ2Answer(option)}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#1565C0';
              e.target.style.background = '#f0f9ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(21,101,192,0.2)';
              e.target.style.background = '#ffffff';
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
    );
  }

  // RESULTS
  if (step === 'results' && result) {
    const primaryTest = testMeta[result.primary];
    const secondaryTests = result.secondary.map((slug) => ({
      slug,
      ...testMeta[slug],
    }));

    return (
      <div style={containerStyle}>
        <h3 style={titleStyle}>Based on your answers</h3>
        <p style={subtitleStyle}>{result.message}</p>

        <div style={resultCardStyle}>
          <div style={resultTitleStyle}>Recommended test</div>
          <h4 style={resultTestStyle}>{primaryTest.title}</h4>
          <p style={resultDescStyle}>{primaryTest.description}</p>
          <Link href={`/test/${result.primary}`} style={linkButtonStyle}>
            Take this test
          </Link>
        </div>

        <div style={{ margin: '24px 0 0' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#667085', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Also relevant
          </div>
          {secondaryTests.map((test) => (
            <div key={test.slug} style={secondaryCardStyle}>
              <h5 style={secondaryTitleStyle}>{test.title}</h5>
              <p style={secondaryDescStyle}>{test.description}</p>
              <Link href={`/test/${test.slug}`} style={{...linkButtonStyle, background: 'transparent', color: '#1565C0', border: '1px solid #1565C0'}}>
                View test
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button style={resetButtonStyle} onClick={handleReset}>
            Start over
          </button>
        </div>
      </div>
    );
  }

  return null;
}
