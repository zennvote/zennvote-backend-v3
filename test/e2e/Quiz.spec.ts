import * as supertest from 'supertest';
import * as sinon from 'sinon';
import { should } from 'chai';

import app from '@src/interface/App';

import * as QuizRepository from '@src/repository/Quiz';
import * as util from './Quiz.util';

should();

describe('Quiz Test', () => {
  const request = supertest(app);

  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /quiz', () => {
    it('should return all quizzes list', async () => {
      // Arrange
      const getQuizzesMock = sinon.stub(QuizRepository, 'getQuizzes');
      const sample = [util.getSampleQuiz()];
      getQuizzesMock.resolves(sample);

      // Act
      const response = await request.get('/quiz');

      // Assert
      response.status.should.equal(200);
      response.body.should.deep.equal(sample);
      getQuizzesMock.called.should.be.true;
    });
  });

  describe('GET /quiz/:index', () => {
    it('should return quiz with given index', async () => {
      // Arrange
      const getQuizzesByIndexMock = sinon.stub(QuizRepository, 'getQuizByIndex');
      const sample = util.getSampleQuiz();
      getQuizzesByIndexMock.resolves(sample);

      // Act
      const quizIndex = sample.index;
      const response = await request.get(`/quiz/${quizIndex}`);

      // Assert
      response.status.should.equal(200);
      response.body.should.deep.equal(sample);
      getQuizzesByIndexMock.called.should.be.true;
      getQuizzesByIndexMock.firstCall.args.should.deep.equals([quizIndex]);
    });

    it("should response 404 when there's no quiz", async () => {
      // Arrange
      const getQuizzesByIndexMock = sinon.stub(QuizRepository, 'getQuizByIndex');
      getQuizzesByIndexMock.resolves(null);

      // Act
      const quizIndex = 3;
      const response = await request.get(`/quiz/${quizIndex}`);

      // Assert
      response.status.should.equal(404);
      getQuizzesByIndexMock.called.should.be.true;
      getQuizzesByIndexMock.firstCall.args.should.deep.equals([quizIndex]);
    });
  });
});
