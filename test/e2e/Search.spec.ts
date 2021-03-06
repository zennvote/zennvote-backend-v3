import * as supertest from 'supertest';
import * as sinon from 'sinon';
import { should } from 'chai';

import app from '@src/interface/App';

import * as SongRepository from '@src/repository/Song';
import Episode from '@src/domain/value-object/Episode';

import * as util from './Search.util';

should();

describe('Search Test', () => {
  const request = supertest(app);

  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /search/song/episode', () => {
    it('should return song with given episode', async () => {
      // Arrange
      const getSongMock = sinon.stub(SongRepository, 'GetSong');
      const sample = util.getSampleQuiz();
      getSongMock.resolves(sample);

      // Act
      const { episode } = sample;
      const response = await request.get('/search/song/episode').query(episode);

      // Assert
      response.status.should.equal(200);
      response.body.result.should.deep.equal(sample);
      getSongMock.called.should.be.true;
      getSongMock.firstCall.args.should.deep.equal([episode]);
    });

    it("should response 400 when there's no episode info", async () => {
      // Arrange
      const getSongMock = sinon.stub(SongRepository, 'GetSong');
      getSongMock.resolves(null);

      // Act
      const response = await request.get('/search/song/episode');

      // Assert
      response.status.should.equal(400);
      getSongMock.called.should.be.false;
    });

    it("should response 404 when there's no song", async () => {
      // Arrange
      const getSongMock = sinon.stub(SongRepository, 'GetSong');
      getSongMock.resolves(null);

      // Act
      const episode: Episode = { episode: 0, index: 0 };
      const response = await request.get('/search/song/episode').query(episode);

      // Assert
      response.status.should.equal(404);
      getSongMock.called.should.be.true;
      getSongMock.firstCall.args.should.deep.equal([episode]);
    });
  });
});
