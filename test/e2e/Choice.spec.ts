import * as supertest from 'supertest';
import * as sinon from 'sinon';
import { should } from 'chai';

import app from '@src/interface/App';

import * as ChoiceRepository from '@src/repository/Choice';
import * as util from './Choice.util';

should();

describe('Choice Test', () => {
  const request = supertest(app);

  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /choice', () => {
    it('should return all choices list', async () => {
      // Arrange
      const getChoicesMock = sinon.stub(ChoiceRepository, 'getChoices');
      const sample = [util.getSampleChoice()];
      getChoicesMock.resolves(sample);

      // Act
      const response = await request.get('/choice');

      // Assert
      response.status.should.equal(200);
      response.body.should.deep.equal(sample);
      getChoicesMock.called.should.be.true;
    });
  });

  describe('GET /choice/:name', () => {
    it('should return choice with given name', async () => {
      // Arrange
      const getChoiceByNameMock = sinon.stub(ChoiceRepository, 'getChoiceByName');
      const sample = util.getSampleChoice();
      getChoiceByNameMock.resolves(sample);

      // Act
      const choiceName = sample.name;
      const response = await request.get(`/choice/${choiceName}`);

      // Assert
      response.status.should.equal(200);
      response.body.should.deep.equal(sample);
      getChoiceByNameMock.called.should.be.true;
      getChoiceByNameMock.firstCall.args.should.deep.equals([choiceName]);
    });

    it("should response 404 when there's no choice", async () => {
      // Arrange
      const getChoiceByNameMock = sinon.stub(ChoiceRepository, 'getChoiceByName');
      getChoiceByNameMock.resolves(null);

      // Act
      const choiceName = 'sample';
      const response = await request.get(`/choice/${choiceName}`);

      // Assert
      response.status.should.equal(404);
      getChoiceByNameMock.called.should.be.true;
      getChoiceByNameMock.firstCall.args.should.deep.equals([choiceName]);
    });
  });
});
