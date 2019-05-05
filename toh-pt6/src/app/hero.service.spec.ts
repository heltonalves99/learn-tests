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
      expect((heroService as any).messageService.getMessage()).toEqual('HeroService: fetched heroes');
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
      expect((heroService as any).messageService.getMessage()).toEqual(
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
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: fetched hero id=${mockHero.id}`
      );
    });

    it('should fail gracefully on error', () => {
      heroService.getHero(mockHero.id).subscribe(
        (hero: Hero) => expect(hero).toBeUndefined(),
        fail,
      );
  
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('GET');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' })
  
      expect((heroService as any).handleError).toHaveBeenCalledTimes(1);
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: getHero id=${mockHero.id} failed: Http failure response for ${heroesUrl}/${mockHero.id}: 404 Bad Request`
      )
    })
  });

  describe('getHeroNo404', () => {
    it('should return a single mock hero', () => {
      heroService.getHeroNo404(mockHero.id).subscribe(
        (hero: Hero) => expect(hero).toEqual(mockHero),
        fail,
      );
      
      const req = httpTestingController.expectOne(`${heroesUrl}/?id=${mockHero.id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockHeroes);

      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: fetched hero id=${mockHero.id}`
      );
    });

    it('should fail gracefully with undefined when id not found', () => {
      heroService.getHeroNo404(123).subscribe(
        (hero: Hero) => expect(hero).toBeUndefined(),
        fail,
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/?id=123`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockHero);

      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: did not find hero id=123`
      );
    });

    it('should fail gracefully on error', () => {
      heroService.getHeroNo404(123).subscribe(
        (hero: Hero) => expect(hero).toBeUndefined(),
        fail,
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/?id=123`);
      expect(req.request.method).toEqual('GET');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect((heroService as any).handleError).toHaveBeenCalledTimes(1);
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: getHero id=123 failed: Http failure response for ${heroesUrl}/?id=123: 404 Bad Request`
      );
    });
  });

  describe('AddHero', () => {
    it('should add a single Hero', () => {
      heroService.addHero(mockHero).subscribe(
        (hero: Hero) => expect(hero).toEqual(mockHero),
        fail,
      );

      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(mockHero);

      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: added hero w/ id=${mockHero.id}`
      );
    });

    it('should fail gracefully on error', () => {
      heroService.addHero(mockHero).subscribe(
        (hero: Hero) => expect(hero).toBeUndefined(),
        fail,
      );

      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('POST');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect((heroService as any).handleError).toHaveBeenCalledTimes(1);
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        'HeroService: addHero failed: Http failure response for api/heroes: 404 Bad Request'
      );
    });
  });

  describe('UpdateHero', () => {
    it('should update hero', () => {
      heroService.updateHero(mockHero).subscribe(
        (hero: Hero) => expect(mockHero).toEqual(mockHero),
        fail,
      );

      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockHero);

      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: updated hero id=${mockHero.id}`
      );
    });

    it('should fail gracefully on error', () => {
      heroService.updateHero(mockHero).subscribe(
        (hero: Hero) => expect(hero).toBeUndefined(),
        fail,
      );
      
      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect((heroService as any).handleError).toHaveBeenCalledTimes(1);
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: updateHero failed: Http failure response for ${heroesUrl}: 404 Bad Request`
      );
    });
  });

  describe('DeleteHero', () => {
    it('should delete hero using id', () => {
      heroService.deleteHero(mockHero.id).subscribe(
        (response: Hero | number) => expect(response).toEqual(mockHero.id),
        fail,
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockHero.id);

      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: deleted hero id=${mockHero.id}`
      );
    });

    it('should delete hero using hero object', () => {
      heroService.deleteHero(mockHero).subscribe(
        (response: Hero | number) => expect(response).toEqual(mockHero.id),
        fail,
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockHero.id);

      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: deleted hero id=${mockHero.id}`
      ); 
    });

    it('should fail gracefully if not find hero', () => {
      heroService.deleteHero(123).subscribe(
        (hero: Hero) => expect(hero).toBeUndefined(),
        fail,
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/123`);
      expect(req.request.method).toEqual('DELETE');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect((heroService as any).handleError).toHaveBeenCalledTimes(1);
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        'HeroService: deleteHero failed: Http failure response for api/heroes/123: 404 Bad Request'
      );
    })
  });

  describe('SearchHero', () => {
    it('should find heroes mathing the search criteria', () => {
      const searchTerm: string = 'r';

      heroService.searchHeroes(searchTerm).subscribe(
        (response: Hero[]) => expect(response).toEqual(mockHeroes.slice(1)),
        fail,
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockHeroes.slice(1));

      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: found heroes matching "${searchTerm}"`
      );
    });

    it('should not find heroes matching the search criteria', () => {
      const searchTerm: string = 'helton';

      heroService.searchHeroes(searchTerm).subscribe(
        (response: Hero[]) => expect(response).toEqual([]),
        fail,
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush([]);

      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: found heroes matching "${searchTerm}"`
      )
    });

    it('should fail gracefully on error', () => {
      const searchTerm: string = 'helton';

      heroService.searchHeroes(searchTerm).subscribe(
        (response: Hero[]) => expect(response).toEqual([]),
        fail,
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect((heroService as any).handleError).toHaveBeenCalledTimes(1);
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
      expect((heroService as any).messageService.getMessage()).toEqual(
        `HeroService: searchHeroes failed: Http failure response for api/heroes/?name=${searchTerm}: 404 Bad Request`
      );
    });
  });

  describe('HandleError', () => {
    it('should handle error gracefully', () => {
      spyOn(console, 'error');

      heroService.getHero(mockHero.id).subscribe(
        (hero: Hero) => expect(hero).toBeUndefined(),
        fail,
      );

      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('GET');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect((heroService as any).handleError).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect((heroService as any).log).toHaveBeenCalledTimes(1);
    });
  });
});
