import { Test, TestingModule } from '@nestjs/testing';
import { EnquiryDiscussionService } from './enquiry-discussion.service';

describe('EnquiryDiscussionService', () => {
  let service: EnquiryDiscussionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnquiryDiscussionService],
    }).compile();

    service = module.get<EnquiryDiscussionService>(EnquiryDiscussionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
