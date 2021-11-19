export type GithubRelease = {
  name: string;
  assets: Asset[];
  created_at: string;
  published_at: string;
  body: string;
  prerelease: boolean;
};

export type Asset = {
  name: string;
  label: string;
  browser_download_url: string;
};
