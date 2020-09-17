import * as supertest from 'supertest';
import * as sinon from 'sinon';
import { should } from 'chai';

import app from '@src/interface/App';

should();

describe('Statistics Test', () => {
  const request = supertest(app);

  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /vote/statistics', () => {
    it('should return full statistics', async () => {
      // Arrange

      // Act

      // Assert
    });
  });
});
