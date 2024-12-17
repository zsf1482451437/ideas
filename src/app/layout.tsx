import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <header>1234</header> */}
      <body>{children}</body>
    </html>
  );
}
