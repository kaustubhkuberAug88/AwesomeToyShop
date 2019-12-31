import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Toy } from './toy';

export class ToyData implements InMemoryDbService {

  createDb() {
    const toys: Toy[] = [
      {
        id: 1,
        toyName: 'Robo',
        toyCode: 'GDN-0011',
        releaseDate: 'March 19, 2018',
        description: 'Christmus Special Robo Toy with weapons',
        price: 450,
        starRating: 3.2,
        imageUrl: 'assets/images/Robo.jpg',
        category: 'Superhero',
        tags: ['super', 'hero', 'war']
      },
      {
        id: 2,
        toyName: 'Construction Cars',
        toyCode: 'GDN-0023',
        releaseDate: 'March 18, 2018',
        description: 'Unbreakable Bob the builder cars',
        price: 399,
        starRating: 4.2,
        imageUrl: 'assets/images/Const_cars.jpg',
        category: 'Cars'
      },
      {
        id: 5,
        toyName: 'Teddy Bear',
        toyCode: 'TBX-0048',
        releaseDate: 'May 21, 2018',
        description: 'Cute little toy for little one\'s',
        price: 299,
        starRating: 4.8,
        imageUrl: 'assets/images/Teddy_bear.jpg',
        category: 'SoftToys',
        tags: ['Teddy', 'Soft']
      },
      {
        id: 8,
        toyName: 'Yamaha R15 Bike',
        toyCode: 'TBX-0022',
        releaseDate: 'May 15, 2018',
        description: 'Electric Bike with Music and Light',
        price: 5500,
        starRating: 3.7,
        imageUrl: 'assets/images/Bike.jpg',
        category: 'Bike'
      },
      {
        id: 10,
        toyName: 'Video Game Controller',
        toyCode: 'GMG-0042',
        releaseDate: 'October 15, 2018',
        description: 'Standard two-button video game controller',
        price: 899,
        starRating: 4.6,
        imageUrl: 'assets/images/xbox-controller.png',
        category: 'Gaming'
      }
    ];
    return { toys };
  }
}
