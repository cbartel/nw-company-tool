import nock from 'nock';

import releases from './data/releases.json';
import releasesBeta from './data/releases-newest-is-beta.json';
import { GithubModule } from '../../src/github/github.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GithubService } from '../../src/github/github.service';

describe('GitHub Service', () => {
  let app: INestApplication;

  beforeEach(async () => {
    nock.cleanAll();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GithubModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return correct latest release version if there is no older beta release', async () => {
    nock('https://api.github.com/').get('/repos/cbartel/nw-company-tool/releases').reply(200, JSON.stringify(releases));
    const githubService = app.get(GithubService);
    const latestBetaRelease = await githubService.getLatestBetaRelease();
    expect(latestBetaRelease.name).toEqual('v1.0.0');
  });

  it('should return correct latest beta release version', async () => {
    nock('https://api.github.com/')
      .get('/repos/cbartel/nw-company-tool/releases')
      .reply(200, JSON.stringify(releasesBeta));
    const githubService = app.get(GithubService);
    const latestBetaRelease = await githubService.getLatestBetaRelease();
    expect(latestBetaRelease.name).toEqual('v1.1.0-beta.1');
  });
});
