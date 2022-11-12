import { TestBed } from '@angular/core/testing';

import { CodeAnalyticsService } from './code-analytics.service';

describe('CodeAnalyticsService', () => {
  let service: CodeAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
