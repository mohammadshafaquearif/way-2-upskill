import React from 'react';
import type { DbLearningAsset } from '@/lib/lms/dbTypes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  FileText,
  PlayCircle,
  Presentation,
  Video,
  Youtube,
} from 'lucide-react';

const assetIcon: Record<string, React.ElementType> = {
  ppt: Presentation,
  pdf: FileText,
  zoom_recording: Video,
  youtube: Youtube,
  external_link: ExternalLink,
  lab: PlayCircle,
  assignment: FileText,
};

const assetLabel: Record<string, string> = {
  ppt: 'Slides (PPT)',
  pdf: 'PDF Notes',
  zoom_recording: 'Zoom Recording',
  youtube: 'YouTube (Extra)',
  external_link: 'External Link',
  lab: 'Hands-on Lab',
  assignment: 'Assignment Brief',
};

interface TopicAssetsProps {
  assets: DbLearningAsset[];
  onOpenAsset?: (asset: DbLearningAsset, url?: string | null) => void;
}

export function TopicAssets({ assets, onOpenAsset }: TopicAssetsProps) {
  if (!assets.length) {
    return <p className="text-sm text-muted-foreground">Content coming soon.</p>;
  }

  return (
    <ul className="space-y-2">
      {assets.map((asset) => {
        const Icon = assetIcon[asset.asset_type] ?? FileText;
        const label = assetLabel[asset.asset_type] ?? asset.title;

        return (
          <li
            key={asset.id}
            className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="rounded-md bg-primary/10 p-2">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{asset.title || label}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  {asset.is_supplementary && (
                    <Badge variant="outline" className="h-5 text-[10px]">
                      Extra
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={() => onOpenAsset?.(asset)}
            >
              Open
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

export async function resolveAssetUrl(
  asset: DbLearningAsset,
  getSignedUrl: (path: string) => Promise<string | null>,
): Promise<string | null> {
  if (asset.external_url) return asset.external_url;
  if (asset.embed_url) return asset.embed_url;
  if (asset.storage_path) return getSignedUrl(asset.storage_path);
  return null;
}

export function isEmbeddableYouTube(asset: DbLearningAsset): boolean {
  if (asset.asset_type !== 'youtube') return false;
  const url = asset.embed_url || asset.external_url || '';
  return url.includes('youtube.com') || url.includes('youtu.be');
}

export function youtubeEmbedSrc(url: string): string {
  try {
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    const parsed = new URL(url);
    const id = parsed.searchParams.get('v');
    if (id) return `https://www.youtube.com/embed/${id}`;
  } catch {
    /* ignore */
  }
  return url;
}
