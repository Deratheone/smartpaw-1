import React from 'react';
import { Play, Wifi } from 'lucide-react';

interface LiveFeedProps {
  username?: string;
  domain?: string;
  title?: string;
}

const LiveFeed: React.FC<LiveFeedProps> = ({ 
  username = 'MohdShan105', 
  domain = 'smartpaw.vercel.app',
  title = 'Live Pet Monitoring Feed'
}) => {
  const embedUrl = `https://player.twitch.tv/?channel=${username}&parent=${domain}&muted=false`;
  
  return (
    <div className="bg-gray-100 rounded-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-2 sm:p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">{title}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs">LIVE</span>
          </div>
        </div>
      </div>
      
      <div className="relative" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={embedUrl}
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          height="100%"
          width="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          title="Live Pet Monitoring Feed"
          allow="autoplay; fullscreen"
        />
      </div>
      
      <div className="p-2 sm:p-3 bg-white border-t">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Play className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            <span className="text-gray-600 text-xs sm:text-sm">SmartPaw Live Demo</span>
          </div>
          <span className="text-xs text-gray-500">
            {username ? `@${username}` : 'Demo Stream'}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          This demonstrates how pet owners can monitor their pets in real-time during boarding services.
        </p>
      </div>
    </div>
  );
};

export default LiveFeed;
