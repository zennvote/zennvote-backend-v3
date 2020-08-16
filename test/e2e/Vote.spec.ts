import * as supertest from 'supertest';
import * as sinon from 'sinon';
import { should } from 'chai';

import app from '@src/interface/App';

import * as VoteRepository from '@src/repository/Vote';
import * as utils from './Vote.util';

should();

describe('Vote Test', () => {
  const request = supertest(app);

  beforeEach(() => {
    sinon.restore();
  });

  describe('POST /vote', () => {
    it('should store given vote data', async () => {
      // Arrange
      const saveVoteMock = sinon.stub(VoteRepository, 'saveVote');
      const isEmailDuplicatedMock = sinon.stub(VoteRepository, 'isEmailDuplicated');
      const sample = utils.getSampleChoice();
      saveVoteMock.resolves(sample);
      isEmailDuplicatedMock.resolves(false);

      // Act
      const response = await request.post('/vote').send(sample);

      // Assert
      response.status.should.equal(200);
      response.body.should.deep.equal({ success: true, result: sample });

      saveVoteMock.called.should.be.true;
      saveVoteMock.firstCall.args.should.deep.equal([sample]);

      isEmailDuplicatedMock.called.should.be.true;
      isEmailDuplicatedMock.firstCall.args[0].should.equal(sample.email);
    });

    it('should throw 422 error if given email is already existing', async () => {
      // Arrange
      const saveVoteMock = sinon.stub(VoteRepository, 'saveVote');
      const isEmailDuplicatedMock = sinon.stub(VoteRepository, 'isEmailDuplicated');
      const sample = utils.getSampleChoice();
      saveVoteMock.resolves(sample);
      isEmailDuplicatedMock.resolves(true);

      // Act
      const response = await request.post('/vote').send(sample);

      // Assert
      response.status.should.equal(422);
      response.body.should.deep.equal({ success: false, message: 'vote email already existing' });

      saveVoteMock.called.should.be.true;
      isEmailDuplicatedMock.firstCall.args[0].should.equal(sample.email);
    });
  });
});
