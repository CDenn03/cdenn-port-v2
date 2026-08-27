import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CDenn | Full-Stack Software Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// CDenn icon mark, cream (#FCF7F2), embedded as base64 so the edge function
// doesn't need a network fetch at render time.
const ICON_DATA_URI =
  'data:image/png;base64,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'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          background: '#0a0a0a',
          overflow: 'hidden',
        }}
      >
        {/* soft emerald glow, pushed mostly off-canvas top right */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -220,
            width: 780,
            height: 780,
            borderRadius: '50%',
            backgroundImage:
              'radial-gradient(circle, rgba(37,60,56,0.9) 0%, rgba(37,60,56,0) 68%)',
            display: 'flex',
          }}
        />

        {/* content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 100,
            paddingRight: 140,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ICON_DATA_URI}
              width={86}
              height={56}
              alt=""
              style={{ marginRight: 20 }}
            />
            <div
              style={{
                fontSize: 68,
                fontWeight: 700,
                color: '#FCF7F2',
                letterSpacing: -1.5,
                display: 'flex',
              }}
            >
              CDenn
            </div>
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              color: '#9CA3AF',
              marginTop: 42,
              maxWidth: 820,
              display: 'flex',
            }}
          >
            Full-stack engineer building fintech &amp; AI-powered products.
          </div>

          <div
            style={{
              fontSize: 23,
              fontWeight: 500,
              color: '#C2A46D',
              marginTop: 22,
              letterSpacing: 0.5,
              display: 'flex',
            }}
          >
            cdenn.dev
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
