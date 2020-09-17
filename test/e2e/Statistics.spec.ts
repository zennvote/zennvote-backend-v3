import * as supertest from 'supertest';
import * as sinon from 'sinon';
import { should } from 'chai';

import app from '@src/interface/App';

import * as VoteRepository from '@src/repository/Vote';
import { EpisodeVoteField, StaticVoteField } from '@src/domain/value-object/VoteField';

import { getVoteStatisticsSample } from './Statistics.util';

should();

describe('Statistics Test', () => {
  const request = supertest(app);
  const episodeVoteFields: EpisodeVoteField[] = ['pitch', 'voice', 'funny', 'content', 'original', 'sleep'];
  const staticVoteFields: StaticVoteField[] = ['unit', 'rookie', 'grow', 'master'];

  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /vote/statistics', () => {
    it('should return full statistics', async () => {
      // Arrange
      const getEpisodeVoteStatistics = sinon.stub(VoteRepository, 'getEpisodeVoteStatistics');
      const getStaticVoteStatistics = sinon.stub(VoteRepository, 'getStaticVoteStatistics');
      episodeVoteFields.forEach((field) => {
        getEpisodeVoteStatistics.withArgs(field).resolves(getVoteStatisticsSample(field));
      });
      staticVoteFields.forEach((field) => {
        getStaticVoteStatistics.withArgs(field).resolves(getVoteStatisticsSample(field));
      });
      const sample = [...episodeVoteFields, ...staticVoteFields].reduce((acc, field) => {
        acc[field] = getVoteStatisticsSample(field);

        return acc;
      }, {});

      // Act
      const response = await request.get('/vote/statistics');

      // Assert
      response.status.should.equal(200);
      response.body.should.deep.equal(sample);

      getEpisodeVoteStatistics.args.should.have.length(6);
      getEpisodeVoteStatistics.args.map(([field]) => field)
        .should.have.members(episodeVoteFields);

      getStaticVoteStatistics.args.should.have.length(4);
      getStaticVoteStatistics.args.map(([field]) => field)
        .should.have.members(staticVoteFields);
    });
  });
});
