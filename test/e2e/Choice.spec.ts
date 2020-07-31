import * as supertest from 'supertest';
import * as sinon from 'sinon';
import { should } from 'chai';

import app from '@src/App';

import * as ChoiceRepository from '@src/repository/Choice';
import * as util from './Choice.util';

should();

describe('Choice Test', () => {
  const request = supertest(app);

  beforeEach(() => {
    sinon.restore();
  })

  describe('GET /v1/choice', () => {
    it('should return all choices list', async () => {
      // Arrange
      const getChoicesMock = sinon.stub(ChoiceRepository, 'getChoices');
      const sample = [util.getSampleChoice()];
      getChoicesMock.returns(sample);
  
      // Act
      const response = await request.get('/v1/choice');
  
      // Assert
      response.status.should.equal(200);
      response.body.should.deep.equal(sample);
      getChoicesMock.called.should.be.true;
    });
  });
  
  describe('GET /v1/choice/:name', () => {
    it('should return choice with given name', async () => {
      // Arrange
      const getChoiceByNameMock = sinon.stub(ChoiceRepository, 'getChoiceByName');
      const sample = util.getSampleChoice();
      getChoiceByNameMock.returns(sample);
      
      // Act
      const choiceName = sample.name;
      const response =await request.get(`/v1/choice/${choiceName}`);
      
      // Assert
      response.status.should.equal(200);
      response.body.should.deep.equal(sample);
      getChoiceByNameMock.called.should.be.true;
      getChoiceByNameMock.firstCall.args.should.deep.equals([choiceName]);
    });

    it("should response 404 when there's no choice", async () => {
      // Arrange
      const getChoiceByNameMock = sinon.stub(ChoiceRepository, 'getChoiceByName');
      getChoiceByNameMock.returns(null);
      
      // Act
      const choiceName = 'sample';
      const response =await request.get(`/v1/choice/${choiceName}`);
      
      // Assert
      response.status.should.equal(404);
      getChoiceByNameMock.called.should.be.true;
      getChoiceByNameMock.firstCall.args.should.deep.equals([choiceName]);
    });
  });
});
