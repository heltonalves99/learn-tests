import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

const mockData: Hero[] = [
  { id: 1, name: 'Hulk' },
  { id: 2, name: 'Thor' },
  { id: 3, name: 'Iron Man' },
];

describe('Hero Service', () => {
  let heroService: HeroService;
  let httpTestingController: HttpTestingController;

  let heroesUrl: string;
  let mockHeroes: Hero[];
  let mockHero: Hero;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        MessageService,
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    
    heroService = TestBed.get(HeroService);
  });

  beforeEach(() => {
    heroesUrl = (heroService as any).heroesUrl;
    mockHeroes = [...mockData];
    mockHero = mockHeroes[0];

    spyOn<any>(heroService, 'handleError').and.callThrough();
    spyOn<any>(heroService, 'log').and.callThrough();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should exist', () => {
    expect(heroService).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should return mock heroes', () => {
      heroService.getHeroes().subscribe(
        (heroes: Hero[]) => {
          expect(heroes.length).toEqual(mockHeroes.length);
        },
        fail,
      );

      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockHeroes);

      // expect((heroService as any).handleError).not.toHaveBeenCalled();
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.messages[0]).toEqual('HeroService: fetched heroes');
    });

    it('should turn 404 into user-friendly error', () => {
      heroService.getHeroes().subscribe(
        (heroes: Hero[]) => expect(heroes).toEqual([]),
        fail,
      );

      const req = httpTestingController.expectOne(heroesUrl);
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect((heroService as any).handleError).toHaveBeenCalledTimes(1);
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.messages[0]).toEqual(
        `HeroService: getHeroes failed: Http failure response for ${heroesUrl}: 404 Bad Request`
      );
    });
  });

  describe('getHero', () => {
    it('should add a single Hero', () => {
      heroService.getHero(mockHero.id).subscribe(
        (hero: Hero) => expect(hero).toEqual(mockHero),
        fail,
      );
      
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      req.flush(mockHero);

      expect(req.request.method).toEqual('GET');
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.messages[0]).toEqual(
        `HeroService: fetched hero id=${mockHero.id}`
      );
    });
  });
});
