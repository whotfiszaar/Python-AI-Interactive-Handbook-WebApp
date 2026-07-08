"use client";

import { useState, useEffect } from "react";
import { Play, X, ExternalLink, Clock, ListVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  type YouTubeVideo,
  getEmbedUrl,
  getThumbnailUrl,
} from "@/data/youtube";

interface YouTubeEmbedProps {
  video: YouTubeVideo;
  className?: string;
}

/**
 * A YouTube video card that plays the video embedded inside the site (using
 * youtube-nocookie.com for privacy). Clicking the thumbnail opens a modal
 * player so the learner never leaves the handbook.
 */
export function YouTubeEmbed({ video, className }: YouTubeEmbedProps) {
  const [open, setOpen] = useState(false);
  const thumb = getThumbnailUrl(video);
  const isPlaylist = Boolean(video.playlistId);

  return (
    <>
      <div
        className={cn(
          "group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        {/* Thumbnail with play button overlay */}
        <div className="relative aspect-video bg-muted overflow-hidden">
          {thumb ? (
            <img
              src={thumb}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
              <ListVideo className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg group-hover:scale-110 transition-transform">
              {isPlaylist ? (
                <ListVideo className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 fill-current ml-0.5" />
              )}
            </div>
          </div>
          <div className="absolute bottom-2 right-2 flex gap-1">
            {video.durationLabel && (
              <Badge className="bg-black/80 text-white text-[10px] gap-1">
                <Clock className="h-2.5 w-2.5" />
                {video.durationLabel}
              </Badge>
            )}
            {isPlaylist && (
              <Badge className="bg-red-600 text-white text-[10px] gap-1">
                <ListVideo className="h-2.5 w-2.5" />
                Playlist
              </Badge>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="p-3">
          <p className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>
          <p className="text-[11px] text-muted-foreground mt-2 font-medium">
            {video.dayRange} &middot; {video.topicRange}
          </p>
        </div>
      </div>

      {/* Modal player */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{video.title}</DialogTitle>
            <DialogDescription>{video.topicRange}</DialogDescription>
          </DialogHeader>
          <YouTubePlayer video={video} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function YouTubePlayer({
  video,
  onClose,
}: {
  video: YouTubeVideo;
  onClose: () => void;
}) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    return () => setStarted(false);
  }, []);

  const embedUrl = getEmbedUrl(video, true);
  const thumb = getThumbnailUrl(video);
  const watchUrl = video.playlistId
    ? `https://www.youtube.com/playlist?list=${video.playlistId}`
    : `https://www.youtube.com/watch?v=${video.videoId}`;

  return (
    <div>
      {/* Video frame */}
      <div className="relative aspect-video bg-black">
        {started ? (
          <iframe
            src={embedUrl}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            onClick={() => setStarted(true)}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label={`Play ${video.title}`}
          >
            {thumb ? (
              <img
                src={thumb.replace("hqdefault", "maxresdefault")}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.src = thumb;
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-muted" />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="h-7 w-7 fill-current ml-1" />
            </div>
          </button>
        )}
      </div>

      {/* Info bar below the player */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-snug">{video.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {video.channel}
              {video.durationLabel && (
                <span className="ml-2 flex items-center gap-1 inline-flex">
                  <Clock className="h-3 w-3" />
                  {video.durationLabel}
                </span>
              )}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 shrink-0"
            onClick={() => window.open(watchUrl, "_blank", "noopener,noreferrer")}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            YouTube
          </Button>
        </div>

        <div className="rounded-md bg-muted/50 p-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Covers
          </p>
          <p className="text-sm font-medium">{video.topicRange}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{video.dayRange}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Why this video
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">{video.why}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {video.topics.map((t) => (
            <Badge key={t} variant="outline" className="text-[10px]">
              {t}
            </Badge>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full" onClick={onClose}>
          <X className="h-3.5 w-3.5 mr-1" />
          Close
        </Button>
      </div>
    </div>
  );
}
