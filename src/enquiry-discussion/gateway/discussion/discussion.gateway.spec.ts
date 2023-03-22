import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionGateway } from './discussion.gateway';

describe('DiscussionGateway', () => {
  let gateway: DiscussionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscussionGateway],
    }).compile();

    gateway = module.get<DiscussionGateway>(DiscussionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
