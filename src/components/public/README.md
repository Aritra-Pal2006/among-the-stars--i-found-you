# Public Assets Folder (Legacy)

This folder is for static files served as-is at the root path `/`.

**New location for assets:** Use `src/assets/` instead with the `@assets` alias.
Place your photos, music, voice notes, and videos in the appropriate subdirectory:

```
src/assets/
  photos/   -> referenced as import from '@assets/photos/filename.jpg'
  music/    -> referenced as import from '@assets/music/filename.mp3'
  voice/    -> referenced as import from '@assets/voice/filename.mp3'
  videos/   -> referenced as import from '@assets/videos/filename.mp4'
```

Example usage in any .ts/.tsx file:

```typescript
import myPhoto from '@assets/photos/us.jpg';
import myVideo from '@assets/videos/memory.mp4';
```

If you must use a public-path reference: files placed here are still accessible at `/filename.ext`.
- A file at `public/my-video.mp4` can be referenced as `"/my-video.mp4"`
- A file at `public/us.jpg` can be referenced as `"/us.jpg"`
