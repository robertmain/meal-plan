import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import {
  Mock,
  IMock,
  It,
  MockBehavior,
} from 'typemoq';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { BaseEntity, BaseService } from '.';

type Entity = BaseEntity & { name: string };
const mockEntity: Entity = {
  id: 6,
  updatedAt: new Date(),
  createdAt: new Date(),
  deletedAt: null,
  name: 'Fubar',
};

const excludeDeleted = { deletedAt: null };

describe('Base Service', (): void => {
  let service: BaseService<Entity>;
  let repository: IMock<Repository<Entity>>;

  beforeEach(async (): Promise<void> => {
    repository = Mock.ofType<Repository<Entity>>(
      Repository,
      MockBehavior.Strict
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BaseService,
          useFactory: (): object => {
            class Service extends BaseService<Entity> { }
            return new Service(repository.object);
          },
        },
      ],
    }).compile();

    service = module.get<BaseService<Entity>>(BaseService);
  });
  describe('findById', (): void => {
    it('retrives a single entity by ID', async (): Promise<void> => {
      const where = {
        ...excludeDeleted,
        id: mockEntity.id,
      };

      repository.setup((mockRepo): Promise<Entity> => mockRepo
        .findOneOrFail(It.isValue({ where })))
        .returns((): Promise<Entity> => Promise.resolve(mockEntity))
        .verifiable();

      const ingredient = await service.findById(mockEntity.id);

      expect(ingredient).toBeTruthy();
    });
    it('omits deleted entities from query results', async (): Promise<void> => {
      const where = {
        ...excludeDeleted,
        id: mockEntity.id,
      };

      repository.setup((mockRepo): Promise<Entity> => mockRepo
        .findOneOrFail(It.isValue({ where })))
        .returns((): Promise<Entity> => Promise.reject(
          new EntityNotFoundError(BaseEntity, where)
        ))
        .verifiable();

      await expect(service.findById(mockEntity.id)).rejects
        .toThrowError(EntityNotFoundError);
    });
    it('can be overridden to return deleted entities', async (): Promise<void> => {
      const where = { id: mockEntity.id };

      repository.setup((mockRepo): Promise<Entity> => mockRepo
        .findOneOrFail(It.isValue({ where })))
        .returns((): Promise<Entity> => Promise.resolve(mockEntity))
        .verifiable();

      await expect(service.findById(mockEntity.id, true)).resolves.toBeTruthy();
    });
  });
  describe('findAll', (): void => {
    it('returns all  non-deleted entities', async (): Promise<void> => {
      const where = { ...excludeDeleted };

      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .find(It.isValue({ where })))
        .returns((): Promise<Entity[]> => Promise.resolve(
          new Array(10).fill(mockEntity)
        ))
        .verifiable();

      const entities = await service.findAll();

      expect(entities).toHaveLength(10);
    });
    it('omits deleted entities from query results', async (): Promise<void> => {
      const where = { ...excludeDeleted };

      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .find(It.isValue({ where })))
        .returns((): Promise<Entity[]> => Promise.resolve([]))
        .verifiable();

      await service.findAll();
    });
    it('can be overridden to return deleted entities', async (): Promise<void> => {
      const where = {};

      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .find(It.isValue({ where })))
        .returns((): Promise<Entity[]> => Promise.resolve([]))
        .verifiable();

      await service.findAll(true);
    });
  });
  describe('create', (): void => {
    it('creates a new entity in the database', async (): Promise<void> => {
      repository.setup((mockRepo): Promise<Entity> => mockRepo
        .save(It.isValue({ name: mockEntity.name })))
        .returns((): Promise<Entity> => Promise.resolve(mockEntity))
        .verifiable();

      await service.create({ name: mockEntity.name });
    });
  });
});
