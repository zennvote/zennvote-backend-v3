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
      const sample = utils.getSampleVote();
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
      const sample = utils.getSampleVote();
      saveVoteMock.resolves(sample);
      isEmailDuplicatedMock.resolves(true);

      // Act
      const response = await request.post('/vote').send(sample);

      // Assert
      response.status.should.equal(422);
      response.body.should.deep.equal({ success: false, message: 'vote email already existing' });

      saveVoteMock.called.should.be.false;
      isEmailDuplicatedMock.firstCall.args[0].should.equal(sample.email);
    });

    // TODO: express request validator의 에러 반환 형식을 확인한 후 테스트 케이스 보충 필요.
    it('should throw 400 if given vote is invalid', async () => {
      // Arrange
      const saveVoteMock = sinon.stub(VoteRepository, 'saveVote');
      const isEmailDuplicated = sinon.stub(VoteRepository, 'isEmailDuplicated');
      const sample = {};

      // Act
      const response = await request.post('/vote').send(sample);

      // Assert
      response.status.should.equal(400);
      response.body.should.have.own.property('success').which.is.equal(false);

      saveVoteMock.called.should.be.false;
      isEmailDuplicated.called.should.be.false;
    });
  });
});
