# Assets

Place your media files here, organized by type:

```
src/assets/
  photos/   -> import from '@assets/photos/filename.jpg'
  music/    -> import from '@assets/music/filename.mp3'
  voice/    -> import from '@assets/voice/filename.mp3'
  videos/   -> import from '@assets/videos/filename.mp4'
```

## Usage

Import assets directly in any `.ts` or `.tsx` file:

```typescript
import myPhoto from '@assets/photos/memory-1.jpg';
import myVideo from '@assets/videos/our-video.mp4';
```

Vite will resolve the import, hash the file for caching, and return the public URL at build time.

For data files (e.g., `src/data/memories.ts`), import the asset and use the imported value:

```typescript
import memory1Image from '@assets/photos/memory-1.jpg';

export const memories = [
  {
    image: memory1Image,  // resolved URL string
  }
];
```

## Directory layout

- `photos/`  — JPEG, PNG, WebP images
- `music/`   — Background music / audio tracks (MP3, WAV, OGG)
- `voice/`   — Voice notes or spoken messages
- `videos/`  — MP4, WebM video clips
