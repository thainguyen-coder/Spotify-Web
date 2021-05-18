import { SpotifyScope } from './../../model/ScopeSpotify';


export class ScopesBuiler{
    /**
     * static USERS:{[name: string]:SpotifyScope}={
     *   */
    public static USERS:{[name: string]:SpotifyScope}={

        READ_PRIVATE: 'user-read-private',
        READ_EMAIL: 'user-read-email',
   
    }
    public static PLAYLISTS: {[name: string]: SpotifyScope} = {
        READ_PRIVATE: "playlist-read-private",
        MODIFY_PRIVATE: "playlist-modify-private",
        MODIFY_PPUBLIC: "playlist-modify-public",
        READ_COLLABORATIVE: "playlist-read-collaborative"
      };
    
      public static HISTORY: {[name: string]: SpotifyScope} = {
        TOP_READ: "user-top-read",
        READ_RECENTLY_PLAYED: "user-read-recently-played"
      }
    
      public static LIBRARY: {[name: string]: SpotifyScope} = {
        READ: "user-library-read",
        MODIFY: "user-library-modify"    
      }
    
      public static CONNECT: {[name: string]: SpotifyScope} = {
        READ_CURRENTLY_PLAYING: "user-read-currently-playing",
        MODIFY_PLAYBACK_STATE: "user-modify-playback-state",
        READ_PLAYBACK_STATE: "user-read-playback-state"
      }
    
      public static FOLLOW: {[name: string]: SpotifyScope} = {
        READ: "user-follow-read",
        MODIFY: "user-follow-modify"
      }
    
      public static PLAYBACK: {[name: string]: SpotifyScope} = {
        STREAMING: "streaming"
      }
      private scopes: ({[name: string]: SpotifyScope} | SpotifyScope)[] = [
        ScopesBuiler.USERS,
        ScopesBuiler.PLAYLISTS,
        ScopesBuiler.HISTORY,
        ScopesBuiler.LIBRARY,
        ScopesBuiler.CONNECT,
        ScopesBuiler.FOLLOW,
        ScopesBuiler.PLAYBACK
      ];
      public withScopes(...args: ({[name: string]: SpotifyScope} | SpotifyScope)[]): ScopesBuiler{
        this.scopes = args;
        return this;
      }
      /**
       * build
 :string      */
      public build(): string {
          const buffer: string[]=[];
          this.scopes.forEach(scope=>{
              if(typeof(scope)==="string"){
                  buffer.push(scope);
              }else{
                  Object.keys(scope).forEach((propety)=>buffer.push(scope[propety]));
              }
          });
          return buffer.join(' ');
          
      }
}