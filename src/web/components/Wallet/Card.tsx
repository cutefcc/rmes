import React from 'react';

const styles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '20rem',
  padding: '1rem',
  margin: '1rem',
  overflow: 'auto',
  border: '1px solid',
  borderRadius: '1rem',
};

export function Card({ children }: { children: React.ReactNode }) {
  return <div style={styles}>{children}</div>;
}
