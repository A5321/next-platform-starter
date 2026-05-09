// app/loading.jsx
// This automatically shows while page loads in Next.js

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#ffffff'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid #f0f9ff',
        borderTop: '4px solid #1565C0',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
