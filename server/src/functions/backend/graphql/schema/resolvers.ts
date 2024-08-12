import { readMusic } from '@/functions/backend/graphql/utils/music/read';
import { searchQuery } from '@/functions/backend/graphql/utils/music';
import { addMusic } from '@/functions/backend/graphql/utils/music/add';
import { updateMusic } from '@/functions/backend/graphql/utils/music/update';
import { enhanceWithSpotifyInfo } from '@/functions/backend/graphql/utils/music/spotify';
import type { MusicCollection, Song } from '@/@types/Music';
import type { SearchQuery } from '@/@types/SearchQuery';

export const resolvers = {
  Query: {
    getAllMusic: async (_, { user }) => {
      const allMusic = await readMusic(user) as MusicCollection;
      console.log(`Got all music for user=${user} with a total of ${allMusic.songs.length} songs`);
      // await enhanceAllWithSpotify(allMusic, user);
      return allMusic;
    },

    // Not currently being used since it introduces latency, currently getting song from State
    getSong: async (_, { user, song }) => {
      const currentMusic = await readMusic(user);
      if (!currentMusic) {
        console.error('No music retrieved');
        return null;
      }
      return currentMusic.songs.find((s: Song) => s.song === song);
    },

    searchMusic: (_, args: SearchQuery & { user: string }) => {
      const {
        songQuery,
        artistQuery,
        albumQuery,
        genreQuery,
        tagsQuery,
        quotesQuery,
        user
      } = args;
      return searchQuery(user, {
        songQuery,
        artistQuery,
        albumQuery,
        genreQuery,
        tagsQuery,
        quotesQuery
      });
    }
  },

  Mutation: {
    addMusic: (_, { user, song }) => {
      return addMusic(user, song);
    },

    updateMusic: (_, { user, oldSongId, song }) => {
      return updateMusic(user, oldSongId, song);
    },

    enhanceWithSpotifyInfo: (_, { user, songId, song }) => {
      return enhanceWithSpotifyInfo(user, songId, song);
    }
  }
};