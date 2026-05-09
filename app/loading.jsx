// app/loading.jsx
export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#ffffff'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `
      }} />
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid #f0f9ff',
        borderTop: '4px solid #1565C0',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    </div>
  );
}
